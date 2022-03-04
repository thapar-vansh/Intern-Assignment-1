import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getAllPlayers } from '../database/players.db.js'
import {
  getUserbyUsername,
  addUserToDb,
  loginUser,
  checkUser,
} from '../database/users.db.js'

export const getPlayersService = async () => {
  const players = await getAllPlayers()
  return players
}

export const registerService = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await getUserbyUsername(username)
  if (user && user.length > 0) {
    return true
  }
  await addUserToDb(username, hashedPassword)
}

export const loginService = async (req, res) => {
  const user = await checkUser(req.user.userId)
  const loginResult = await loginUser(req.body.username)
  if (loginResult && loginResult.length > 0 && user != null) {
    if (await bcrypt.compare(req.body.password, loginResult[0].password)) {
      const userId = loginResult[0].id
      const token = generateToken(userId)
      return res.status(200).send(token)
    } else {
      return res.status(403).send('Invalid credentials')
    }
  } else {
    return res.status(404).send('User does not exists')
  }
}

function generateToken(userId) {
  const privateKey = process.env.JWT_PRIVATEKEY
  const token = jwt.sign(
    { userId: userId, iat: Math.round(new Date().getTime() / 1000) },
    privateKey,
    { expiresIn: '365d' }
  )
  return token
}
