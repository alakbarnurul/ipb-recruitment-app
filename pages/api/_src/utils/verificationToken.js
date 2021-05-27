import jwt from 'jsonwebtoken'

const verificationToken = (clientToken = null) => {
  try {
    const result = jwt.verify(clientToken, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        throw new Error('Do not forget your token, authorization has failed')
      }
      return decodedToken
    })
    return {
      status: true,
      data: result,
    }
  } catch (error) {
    return {
      status: false,
      data: error.message,
    }
  }
}

export default verificationToken
