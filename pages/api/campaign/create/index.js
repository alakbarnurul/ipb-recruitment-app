import verificationToken from '@/api/_src/utils/verificationToken'
import prisma from '@/api/_src/libs/prisma'

export default async function createCampaigHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { title, imageUrl, positions, description, timeline, generalRequirement, dateClosed, campaignForm } = req.body
  const { title: formTitle, description: formDescription, fields: formFields } = campaignForm
  const authToken = req.headers['authorization']
  // Auth Token
  const { data: organization, status } = verificationToken(authToken)
  if (!status) {
    return res.status(400).json({
      message: organization,
    })
  }
  try {
    // Check Role
    const isOrganizationRole = await prisma.organization.findMany({
      where: {
        id: organization.user.id,
      },
    })
    if (!isOrganizationRole.length) {
      throw new Error('Role not allowed, you are not Organization role!')
    }
    // Create Campaign and Form
    const createdCampaign = await prisma.campaign.create({
      data: {
        title,
        status: true,
        imageUrl,
        positions,
        description,
        // Notes : To set field data type in JSON use extendedProfile (Prisma Docs)
        timeline,
        generalRequirement,
        dateClosed: new Date(dateClosed),
        campaignForm: {
          create: {
            title: formTitle,
            description: formDescription,
            fields: formFields,
          },
        },
        campaignManager: {
          create: {
            campaignName: title,
            Organization: {
              connect: {
                id: String(isOrganizationRole[0].id),
              },
            },
          },
        },
        Organization: {
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
      organizationId: organization.user.id,
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
