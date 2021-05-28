import prisma from '@/api/_src/libs/prisma'
import verificationToken from '@/api/_src/utils/verificationToken'

export default async function updateApplicantStatus(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { status } = req.body
  const { id } = req.query
  const authToken = req.headers['authorization']
  // Auth Token
  const { data: organization, status: isValidToken } = verificationToken(authToken)
  if (!isValidToken) {
    return res.status(400).json({
      message: organization,
    })
  }
  try {
    const applicantManager = await prisma.applicant.findFirst({
      where: {
        id: id,
      },
      include: {
        history: true,
        CampaignManager: {
          include: {
            Campaign: true,
          },
        },
      },
    })
    const {
      history,
      historyId,
      CampaignManager: { Campaign },
    } = applicantManager
    // Fix/Bugs : Jangan lupa untuk meng-handle jika organization mengirim lagi pengumuman (client dan server)
    if (Number(Campaign.timeline.length) - 1 < status.step) {
      throw new Error('Tidak bisa memberikan pengumuman penerimaan, karena sudah melebihi batas')
    }
    const newHistory = [...history.status.history, status]
    const historyActive = await prisma.history.update({
      where: {
        id: historyId,
      },
      data: {
        status: {
          ...status,
          history: newHistory,
        },
      },
    })
    return res.status(200).json({
      message: 'Success',
      historyActive,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Failed to update applicant status',
        detailsError: error.message,
      },
    })
  }
}
