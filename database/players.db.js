import { query } from '../util/database.js'

export const addPlayerToDb = async (name, country) => {
  await query(
    `INSERT INTO players 
    (name,country)
        VALUES ($1,$2)`,
    [name, country]
  )
}

export const updatePlayerToDb = async (id, name, country) => {
  await query(
    `UPDATE players
        SET name = $2, country = $3 
        WHERE id = $1`,
    [id, name, country]
  )
}

export const deletePlayerFromDb = async (id) => {
  await query(
    `DELETE FROM players
        WHERE id = $1`,
    [id]
  )
}

export const getPlayerByNameFromDb = async (name) => {
  const result = await query(
    `SELECT * FROM players
        WHERE name = $1`,
    [name]
  )
  return result.rowCount > 0 ? result.rows[0] : []
}

export const getPlayerByIdFromDb = async (id) => {
  const result = await query(
    `SELECT * FROM players
        WHERE id = $1`,
    [id]
  )
  return result.rowCount > 0 ? result.rows[0] : []
}

export const getAllPlayers = async () => {
  const result = await query(`SELECT * FROM players`, [])
  return result.rowCount > 0 ? result.rows : []
}
