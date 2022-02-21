import db from '../util/database.js'

const addPlayerService = async (name, country) => {
  try {
    await db.query(
      `INSERT INTO players (name,country)
      VALUES ($1,$2)`,
      [name, country]
    )
  } catch {
    throw new Error('Error adding new player')
  }
}

const updatePlayerService = async (id, name, country) => {
  try {
    await db.query(
      `UPDATE players
      SET name = $2, country = $3 
      WHERE id = $1`,
      [id, name, country]
    )
  } catch {
    throw new Error('Error updating player')
  }
}

const deletePlayerService = async (id) => {
  try {
    await db.query(
      `DELETE FROM players
      WHERE id = $1`,
      [id]
    )
  } catch {
    throw new Error('Error deleting player')
  }
}

const getPlayerByNameService = async (name) => {
  try {
    const player = await db.query(
      `SELECT * FROM players
      WHERE name = $1`,
      [name]
    )
    return player.rowCount > 0 ? player.rows[0] : null
  } catch {
    throw new Error('Error getting players')
  }
}

const getPlayerByIdService = async (id) => {
  try {
    const player = await db.query(
      `SELECT * FROM players
      WHERE id = $1`,
      [id]
    )
    return player.rowCount > 0 ? player.rows[0] : null
  } catch {
    throw new Error('Error getting players')
  }
}

export default {
  addPlayerService: addPlayerService,
  getPlayerByNameService: getPlayerByNameService,
  updatePlayerService: updatePlayerService,
  getPlayerByIdService: getPlayerByIdService,
  deletePlayerService: deletePlayerService,
}
