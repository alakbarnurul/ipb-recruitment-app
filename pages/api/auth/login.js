import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function loginHandler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body
    try {
      const matchedUser = await prisma.user.findMany({
        where: {
          email: String(email),
        },
      })
      if (matchedUser.length === 0) {
        throw new Error('User not found!')
      }
      return res.status(200).json(matchedUser)
    } catch (error) {
      return res.status(400).json({
        error: {
          message: 'Email or Password is wrong!',
          detailsError: error.message,
        },
      })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
