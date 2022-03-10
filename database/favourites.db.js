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
    `SELECT name,country
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

export const checkDuplicateFavFromDb = async (id,userId) => {
  const duplicateFav = await query(
    `SELECT player_id
        FROM favourites
        WHERE player_id = $1 AND user_id = $2`,
    [id,userId]
  )
  return duplicateFav.rowCount > 0 ? duplicateFav.rows : null
}
