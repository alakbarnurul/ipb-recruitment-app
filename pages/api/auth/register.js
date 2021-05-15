import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function registerHandler(req, res) {
  if (req.method === 'POST') {
    const newUserData = req.body
    try {
      const userData = await prisma.user.create({
        data: newUserData,
      })
      return res.status(200).json(userData)
    } catch (error) {
      return res.status(400).json({
        error: {
          message: 'Create account is failed',
          detailsError: error.message,
        },
      })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
