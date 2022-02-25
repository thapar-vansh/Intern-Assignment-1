import { query } from '../util/database.js'

export const getUserbyUsername = async (username) => {
  const user = await query(
    `SELECT * FROM users
    WHERE username = $1`,
    [username]
  )
  return user.rowCount > 0 ? user.rows : []
}

export const addUserToDb = async (username, hashedPassword) => {
  await query(
    `INSERT INTO users
    (username, password) VALUES ($1,$2)`,
    [username, hashedPassword]
  )
}

export const loginUser = async (username) => {
  const loginDetails = await query(
    `SELECT id,password FROM users
    WHERE username = $1`,
    [username]
  )
  return loginDetails.rowCount > 0 ? loginDetails.rows : []
}

export const checkUser = async (userId) => {
  const userDetails = await query(
    `SELECT * FROM users
    WHERE id = $1`,
    [userId]
  )
  return userDetails.rowCount > 0 ? userDetails.rows : []
}
