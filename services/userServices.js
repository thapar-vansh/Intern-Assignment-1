import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
} from '../database/favourites.db.js'

export const addFavPlayerService = async (userId, id) => {
  await addFavPlayerToDb(userId, id)
}

export const getFavPlayerService = async (userId) => {
  const favPlayers = await getFavPlayersFromDb(userId)
  return favPlayers
}

export const deleteFavPlayerService = async (id, userId) => {
  await deleteFavPlayerFromDb(id, userId)
}


