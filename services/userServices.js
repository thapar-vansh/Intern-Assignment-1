import db from '../util/database.js'

const addFavPlayerService = async (userId, id) => {
  try {
    await db.query(
      `INSERT INTO favourites 
      (user_id, player_id)
      VALUES ($1,$2)`,
      [userId, id]
    )
  } catch {
    throw new Error('Error adding as favourite player')
  }
}

const getFavPlayerService = async (userId) => {
  try {
    const favPlayers = await db.query(
      `SELECT player_id,name,country
        FROM favourites fv JOIN players pl
        ON pl.id = fv.player_id 
        WHERE user_id = $1`,
      [userId]
    )
    return favPlayers.rowCount > 0 ? favPlayers.rows : null
  } catch {
    throw new Error('Error retrieving favourite players')
  }
}

const getAllFavPlayerService = async (userId) => {
  try {
    const allFav = await db.query(
      `SELECT *
      FROM favourites  
      WHERE user_id = $1`,
      [userId]
    )
    return allFav.rowCount > 0 ? allFav.rows : null
  } catch {
    throw new Error('Error retrieving favourite players')
  }
}

const deleteFavPlayerService = async (id, userId) => {
  try {
    await db.query(
      `DELETE FROM favourites
      WHERE player_id  = $1 
      AND user_id = $2`,
      [id, userId]
    )
  } catch {
    throw new Error('Error deleting favourite player')
  }
}

export default {
  addFavPlayerService: addFavPlayerService,
  getFavPlayerService: getFavPlayerService,
  deleteFavPlayerService: deleteFavPlayerService,
  getAllFavPlayerService: getAllFavPlayerService,
}
