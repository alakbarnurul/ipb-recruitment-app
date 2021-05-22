import { PrismaClient } from '@prisma/client'
import verificationToken from '@/api/utils/verificationToken'

const prisma = new PrismaClient()
export default async function createCampaigHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { campaignId } = req.query
  const { clientToken, title, description, fields, formUrl } = req.body
  //   Auth Token
  const { data: organization, status } = verificationToken(clientToken)
  if (!status) {
    return res.status(400).json({
      message: organization,
    })
  }
  try {
    //   Check Role
    const isOrganizationRole = await prisma.organization.findMany({
      where: {
        id: organization.user.id,
      },
    })
    if (!isOrganizationRole.length) {
      throw new Error('Role not allowed, you are not Organization role!')
    }
    // Create Campaign
    const createdForm = await prisma.form.create({
      data: {
        title,
        description,
        // Notes : fields isinya harus {label, type}
        fields,
        formUrl,
        Campaign: {
          connect: {
            id: String(campaignId),
          },
        },
      },
    })
    return res.status(200).json({
      status: 'Campaign was successfully created',
      createdForm,
      isOrganizationRole,
      organizationId: campaignId,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Failed to create form',
        detailsError: error.message,
      },
    })
  }
}
