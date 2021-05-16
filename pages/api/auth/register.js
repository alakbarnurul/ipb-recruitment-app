import { PrismaClient } from '@prisma/client'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import createToken from '@/api/utils/createToken'

const prisma = new PrismaClient()
export default async function registerHandler(req, res) {
  const cookies = new Cookies(req, res)
  const days = new Date()
  // Notes: Set expiry for token to 1 month
  days.setDate(days.getDate() + 30)
  const { fullName, email, password } = req.body
  // Notes : Hashing user password with bcrypt
  const salt = await bcrypt.genSalt()
  const encryptedPassword = await bcrypt.hash(password, salt)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  if (!fullName || !email || !encryptedPassword) {
    return res.status(400).json({
      error: 'Fields are required',
    })
  }
  try {
    const createdUserData = await prisma.user.create({
      data: { fullName, email, password: encryptedPassword },
    })
    const token = createToken(createdUserData.id)
    cookies.set('auth-token', token, {
      expires: days,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    return res.status(200).json({
      status: 'Successfully registered!',
      token,
      createdUserData,
    })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: 'Failed to create account',
        detailsError: error.message,
      },
    })
  }
}
