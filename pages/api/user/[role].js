import { PrismaClient } from '@prisma/client'
import verificationToken from '@/api/utils/verificationToken'

const prisma = new PrismaClient()
export default async function userDataHandler(req, res) {
  const { authToken } = req.body
  const { role } = req.query
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  // Auth Token
  const { data, status } = verificationToken(authToken)
  if (!status) {
    return res.status(400).json({
      message: data,
    })
  }
  // Check roles
  if (!['student', 'organization'].includes(role.toLowerCase())) {
    return res.status(400).json({
      message: 'Role not allowed,',
    })
  }
  try {
    const user = await prisma[role.toLowerCase()].findFirst({
      where: {
        id: data.user.id,
      },
    })
    return res.status(200).json({
      status: 'Get user data is success',
      user,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Can not fetch user data',
        detailsError: error.message,
      },
    })
  }
}
