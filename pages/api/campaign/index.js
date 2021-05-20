import { PrismaClient } from '@prisma/client'
import verificationToken from '@/api/utils/verificationToken'

const prisma = new PrismaClient()
export default async function createCampaigHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { clientToken, title, imageUrl, positions, description, timeline, generalRequirement, dateClosed } = req.body
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
    const createdCampaign = await prisma.campaign.create({
      data: {
        title,
        status: true,
        imageUrl,
        positions,
        description,
        // Fix/Bugs : To set field data type in JSON use extendedProfile (Prisma Docs)
        timeline,
        generalRequirement,
        dateClosed: new Date(dateClosed),
        // Fix/Bugs : Jgn lupa masukin id dari entitas Form dan ApplicantManagaer
        organization: {
          connect: {
            id: String(isOrganizationRole[0].id),
          },
        },
      },
    })
    return res.status(200).json({
      status: 'Campaign was successfully created',
      createdCampaign,
      isOrganizationRole,
      organization: organization.user.id,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Failed to create campaign',
        detailsError: error.message,
      },
    })
  }
}
