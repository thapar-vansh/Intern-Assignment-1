import db from '../util/database.js'

const getUserbyUsername = async (username) => {
  const user = await db.query(
    `SELECT * FROM users
        WHERE username = $1`,
    [username]
  )
  return user.rowCount > 0 ? user.rows : []
}

const addUserToDb = async (username, hashedPassword) => {
  await db.query(
    `INSERT INTO users
        (username, password) VALUES ($1,$2)`,
    [username, hashedPassword]
  )
}

const loginUser = async (username) => {
  const loginDetails = await db.query(
    `SELECT id,password FROM users
        WHERE username = $1`,
    [username]
  )
  return loginDetails.rowCount > 0 ? loginDetails.rows : []
}

export default {
  getUserbyUsername: getUserbyUsername,
  addUserToDb: addUserToDb,
  loginUser: loginUser,
}
