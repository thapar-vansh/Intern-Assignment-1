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
  try {
    const players = await getAllPlayers()
    return players
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

export const registerService = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await getUserbyUsername(username)
    if (user && user.length > 0) {
      return true
    }
    await addUserToDb(username, hashedPassword)
    throw new Error('Error registering')
  } catch (e) {
    console.log(e)
  }
}

export const loginService = async (username, password, req, res) => {
  const userId = req.user.userId
  const loginResult = await loginUser(username, password)
  const user = await checkUser(userId)
  try {
    if (loginResult && loginResult.length > 0 && user && user.length) {
      if (await bcrypt.compare(password, loginResult[0].password)) {
        const userId = loginResult[0].id
        const token = generateToken(userId)
        return res.send(token)
      } else {
        return res.status(403).send('Invalid credentials')
      }
    } else {
      return res.status(404).send('User does not exists')
    }
  } catch (e) {
    console.log(e)
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


