import { PrismaClient } from '@prisma/client'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import createToken from '@/api/utils/createToken'

const prisma = new PrismaClient()
export default async function loginHandler(req, res) {
  const { email, password } = req.body
  const cookies = new Cookies(req, res)
  const days = new Date()
  // Notes: Set expiry for token to 1 month
  days.setDate(days.getDate() + 30)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  if (!email || !password) {
    return res.status(400).json({
      error: 'Fields are required',
    })
  }
  try {
    // Notes : Response dari method .findMany adalah array
    const isUserEmailExist = await prisma.user.findMany({
      where: {
        email: String(email),
      },
    })
    const isUserPasswordValid = await bcrypt.compare(password, isUserEmailExist[0].password)
    if (!Number(isUserEmailExist.length) || !isUserPasswordValid) {
      throw new Error('User not found!')
    }
    const token = createToken(isUserEmailExist[0].id)
    cookies.set('auth-token', token, {
      expires: days,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    return res.status(200).json({
      status: 'Login is success!',
      token,
      user: isUserEmailExist[0],
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Email or Password is wrong!',
        detailsError: error.message,
      },
    })
  }
}
