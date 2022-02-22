import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import playersDb from '../database/players.db.js'
import usersDb from '../database/users.db.js'

dotenv.config()

const getPlayersService = async () => {
  try {
    const players = await playersDb.getAllPlayers()
    return players
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

const registerService = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await usersDb.getUserbyUsername(username)
    if (user && user.length > 0) {
      return true
    } else {
      await usersDb.addUserToDb(username, hashedPassword)
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error registering')
  }
}

const loginService = async (username, password) => {
  try {
    const loginResult = await usersDb.loginUser(username, password)
    if (loginResult.length > 0) {
      if (await bcrypt.compare(password, loginResult[0].password)) {
        const userId = loginResult[0].id
        const token = generateToken(userId)
        return token
      } else {
        return 0
      }
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error logging in')
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

export default {
  getPlayersService: getPlayersService,
  registerService: registerService,
  loginService: loginService,
}
