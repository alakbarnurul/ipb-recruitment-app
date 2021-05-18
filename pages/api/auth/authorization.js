import jwt from 'jsonwebtoken'

export default async function authorization(req, res) {
  const { clientToken } = req.body
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  try {
    jwt.verify(clientToken, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        throw new Error('Authorization has failed')
      }
      return res.status(200).json({
        status: 'Authorization is success!',
        token: decodedToken,
      })
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}
