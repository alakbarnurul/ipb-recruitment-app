import jwt from 'jsonwebtoken'

const verificationToken = (token = null) => {
  // Notes : Check auth token from headers or req.body
  let authToken
  if (token.split(' ')[0] === 'Bearer') {
    authToken = token.split(' ')[1]
  } else {
    authToken = token
  }
  try {
    const result = jwt.verify(authToken, process.env.JWT_SECRET, (error, decodedToken) => {
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
