import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getPlayersFromDb } from '../database/players.db.js'
import {
  getUserbyUsername,
  addUserToDb,
  getUserByUsername,
  getUserByUserId,
} from '../database/users.db.js'

export const getAllPlayers = async () => {
  const players = await getPlayersFromDb()
  return players
}

export const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await getUserbyUsername(username)
  if (user?.length > 0) {
    return true
  }
  await addUserToDb(username, hashedPassword)
}

export const loginUser = async (username, password) => {
  const loginResult = await getUserByUsername(username)
  if (loginResult?.length > 0) {
    if (await bcrypt.compare(password, loginResult[0].password)) {
      const userId = loginResult[0].id
      const token = generateToken(userId)
      return token
    } else {
      throw new Error('Invalid credentials')
    }
  } else {
    throw new Error('User does not exists')
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
