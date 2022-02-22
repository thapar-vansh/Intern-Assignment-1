import db from '../util/database.js'

const addFavPlayerToDb = async (userId, id) => {
  await db.query(
    `INSERT INTO favourites 
        (user_id, player_id)
        VALUES ($1,$2)`,
    [userId, id]
  )
}

const getFavPlayersFromDb = async (userId) => {
  const favPlayers = await db.query(
    `SELECT player_id,name,country
          FROM favourites fv JOIN players pl
          ON pl.id = fv.player_id 
          WHERE user_id = $1`,
    [userId]
  )
  return favPlayers.rowCount > 0 ? favPlayers.rows : []
}

const deleteFavPlayerFromDb = async (id, userId) => {
  await db.query(
    `DELETE FROM favourites
        WHERE player_id  = $1 
        AND user_id = $2`,
    [id, userId]
  )
}

export default {
  addFavPlayerToDb: addFavPlayerToDb,
  getFavPlayersFromDb: getFavPlayersFromDb,
  deleteFavPlayerFromDb: deleteFavPlayerFromDb,
}
