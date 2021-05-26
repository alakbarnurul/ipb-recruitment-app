import { PrismaClient } from '@prisma/client'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import createToken from '@/api/utils/createToken'

const prisma = new PrismaClient()
export default async function organizationRegisterHandler(req, res) {
  const cookies = new Cookies(req, res)
  const days = new Date()
  // Notes: Set expiry for token to 1 month
  days.setDate(days.getDate() + 30)
  const { name, email, password, startPeriod, endPeriod, cabinet } = req.body
  // Notes : Hashing user password with bcrypt
  const salt = await bcrypt.genSalt()
  const encryptedPassword = await bcrypt.hash(password, salt)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  if (!email || !encryptedPassword) {
    return res.status(400).json({
      message: 'Fields are required',
    })
  }
  try {
    const createdOrganization = await prisma.organization.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        startPeriod: new Date(startPeriod),
        endPeriod: new Date(endPeriod),
        cabinet,
      },
    })
    const authToken = createToken(createdOrganization.id)
    cookies.set('auth-token', authToken, {
      expires: days,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    return res.status(200).json({
      status: 'Successfully registered!',
      authToken,
      createdOrganization,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to create account',
      detailsError: error.message,
    })
  }
}
