import jwt from 'jsonwebtoken'

const config = process.env

export const verifyUser = async (req, res, next) => {
  const token = req.headers['admintoken']
  if (!token) {
    return res.status(403).send('Token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.JWT_PRIVATEKEY)
    req.user = decoded
  } catch (err) {
    console.log(err)
    return res.status(401).send('Invalid token')
  }
  next()
}
export const verifyAdmin = (req, res, next) => {
  const headers = req.headers
  try {
    if (
      headers.username === config.USERNAME &&
      headers.password === config.PASSWORD
    ) {
      next()
    } else {
      return res.status(400).send('You are not authenticated')
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send('Invalid credentials')
  }
}
