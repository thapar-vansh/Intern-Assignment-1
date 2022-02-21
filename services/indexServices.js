import db from '../util/database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const getPlayersService = async () => {
  try {
    const players = await db.query(`SELECT * FROM players`, [])
    return players.rowCount > 0 ? players.rows : []
  } catch {
    throw new Error('Error getting players')
  }
}

const registerService = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const player = await db.query(
      `SELECT * FROM users
      WHERE username = $1`,
      [username]
    )
    if (player.rowCount > 0) {
      return true
    } else {
      await db.query(
        `INSERT INTO users
        (username, password) VALUES ($1,$2)`,
        [username, hashedPassword]
      )
    }
  } catch {
    throw new Error('Error registering')
  }
}

const loginService = async (username, password) => {
  try {
    const loginResult = await db.query(
      `SELECT id,password FROM users
      WHERE username = $1`,
      [username]
    )
    if (loginResult.rowCount > 0) {
      if (await bcrypt.compare(password, loginResult.rows[0].password)) {
        const userId = loginResult.rows[0].id
        const token = generateToken(userId)
        return token
      } else {
        return 0
      }
    } else {
      return false
    }
  } catch {
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
