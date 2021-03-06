import { PrismaClient } from '@prisma/client'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import createToken from '@/api/_src/utils/createToken'

const prisma = new PrismaClient()
export default async function loginHandler(req, res) {
  const { email, password } = req.body
  const cookies = new Cookies(req, res)
  const days = new Date()
  const { role } = req.query
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
  // Check roles
  if (!['student', 'organization'].includes(role.toLowerCase())) {
    return res.status(400).json({
      message: 'Role not allowed,',
    })
  }
  try {
    // Notes : Response dari method .findMany adalah array
    const isUserEmailExist = await prisma[role.toLowerCase()].findMany({
      where: {
        email: String(email),
      },
    })
    const isUserPasswordValid = await bcrypt.compare(password, isUserEmailExist[0].password)
    if (!Number(isUserEmailExist.length) || !isUserPasswordValid) {
      throw new Error('User not found!')
    }
    const authToken = createToken(isUserEmailExist[0].id)
    // Notes : Bisa juga nge-set cookies tanpa library memakai setHeader https://www.youtube.com/watch?v=w8n7Soz7khw (menit ke-5)
    cookies.set('auth-token', authToken, {
      expires: days,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    return res.status(200).json({
      status: 'Login is success!',
      authToken,
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
