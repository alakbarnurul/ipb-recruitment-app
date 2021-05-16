import jwt from 'jsonwebtoken'

const createToken = (userId = null) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRED,
    })
    return token
  } catch (error) {
    return error.message
  }
}

export default createToken
