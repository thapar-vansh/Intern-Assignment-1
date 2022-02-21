import jwt from 'jsonwebtoken'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const config = process.env

const verifyUser = async (req, res, next) => {
  const token = req.headers['admintoken']
  if (!token) {
    return res.status(403).send('Token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.JWT_PRIVATEKEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid token')
  }
  next()
}
const verifyAdmin = (req, res,next) => {
  const headers = req.headers
  try {
    if (
      headers.username === config.USERNAME &&
      headers.password === config.PASSWORD
    ) {
      res.status(200)
    } else {
      res.status(400).send('You are not authenticated')
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send('Invalid credentials')
  }
  next()
}

export default {
  verifyUser: verifyUser,
  verifyAdmin: verifyAdmin,
}
