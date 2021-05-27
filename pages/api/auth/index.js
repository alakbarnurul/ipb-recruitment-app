import verificationToken from '@/api/_src/utils/verificationToken'

export default async function authorizationHandler(req, res) {
  const { clientToken } = req.body
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { status, data } = verificationToken(clientToken)
  if (!status) {
    return res.status(400).json({
      message: data,
    })
  }
  return res.status(200).json({
    ...data,
    status: 'Authorization is success!',
  })
}
