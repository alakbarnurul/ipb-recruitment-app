import { PrismaClient } from '@prisma/client'
import verificationToken from '@/api/utils/verificationToken'

const prisma = new PrismaClient()
export default async function applyCampaign(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { authToken, formData } = req.body
  const { formId } = req.query
  // Auth Token
  const { data: applicant, status } = verificationToken(authToken)
  if (!status) {
    return res.status(400).json({
      message: applicant,
    })
  }
  try {
    // Get Campaign Manager from Form entity
    const campaign = await prisma.campaign.findFirst({
      where: {
        campaignForm: {
          id: formId,
        },
      },
      include: {
        campaignManager: {
          select: {
            id: true,
          },
        },
        students: true,
      },
    })
    const { campaignManager } = campaign
    const isStudentApply = campaign.students.find(student => student.id === applicant.user.id)
    if (isStudentApply !== undefined) {
      throw new Error('Maaf user sudah mendaftar')
    }
    // Store formData to Campaign Manager (Create Applicant)
    await prisma.applicant.create({
      data: {
        applicantData: formData,
        CampaignManager: {
          connect: {
            id: campaignManager.id,
          },
        },
      },
    })
    // Store formData to Applicant History (Create History)
    await prisma.history.create({
      data: {
        status: {
          // Notes : Untuk state ada tiga, waiting, rejected, dan accepted (harus di-set sebagai enum)
          result: 'Waiting',
          // Notes : Untuk message nantinya sebuat pesan dari organisasi (non-fixed)
          message: 'Menunggu konfirmasi',
        },
        formData: formData,
        Campaign: {
          connect: {
            id: campaign.id,
          },
        },
        Student: {
          connect: {
            id: applicant.user.id,
          },
        },
      },
    })
    // Create relation between Student and Campaign (Relation Student and Campaign)
    await prisma.student.update({
      where: {
        id: applicant.user.id,
      },
      data: {
        campaigns: {
          set: [{ id: campaign.id }],
        },
      },
    })
    return res.status(200).json({
      message: 'Success',
      applicantData: formData,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Failed to apply campaign',
        detailsError: error.message,
      },
    })
  }
}
