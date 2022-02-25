import { query } from '../util/database.js'

export const addFavPlayerToDb = async (userId, id) => {
  await query(
    `INSERT INTO favourites 
        (user_id, player_id)
        VALUES ($1,$2)`,
    [userId, id]
  )
}

export const getFavPlayersFromDb = async (userId) => {
  const favPlayers = await query(
    `SELECT player_id,name,country
          FROM favourites fv JOIN players pl
          ON pl.id = fv.player_id 
          WHERE user_id = $1`,
    [userId]
  )
  return favPlayers.rowCount > 0 ? favPlayers.rows : []
}

export const deleteFavPlayerFromDb = async (id, userId) => {
  await query(
    `DELETE FROM favourites
        WHERE player_id  = $1 
        AND user_id = $2`,
    [id, userId]
  )
}
