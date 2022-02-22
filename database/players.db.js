import db from '../util/database.js'

const addPlayerToDb = async (name, country) => {
  await db.query(
    `INSERT INTO players 
    (name,country)
        VALUES ($1,$2)`,
    [name, country]
  )
}

const updatePlayerToDb = async (id, name, country) => {
  await db.query(
    `UPDATE players
        SET name = $2, country = $3 
        WHERE id = $1`,
    [id, name, country]
  )
}

const deletePlayerFromDb = async (id) => {
  await db.query(
    `DELETE FROM players
        WHERE id = $1`,
    [id]
  )
}

const getPlayerByNameFromDb = async (name) => {
  const result = await db.query(
    `SELECT * FROM players
        WHERE name = $1`,
    [name]
  )
  return result.rowCount > 0 ? result.rows[0] : []
}

const getPlayerByIdFromDb = async (id) => {
  const result = await db.query(
    `SELECT * FROM players
        WHERE id = $1`,
    [id]
  )
  return result.rowCount > 0 ? result.rows[0] : []
}

const getAllPlayers = async () => {
  const result = await db.query(`SELECT * FROM players`, [])
  return result.rowCount > 0 ? result.rows : []
}
export default {
  addPlayerToDb: addPlayerToDb,
  updatePlayerToDb: updatePlayerToDb,
  deletePlayerFromDb: deletePlayerFromDb,
  getPlayerByNameFromDb: getPlayerByNameFromDb,
  getPlayerByIdFromDb: getPlayerByIdFromDb,
  getAllPlayers: getAllPlayers,
}
