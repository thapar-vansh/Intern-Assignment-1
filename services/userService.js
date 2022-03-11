import { getPlayerById } from './adminService.js'
import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
  checkDuplicateFavFromDb,
} from '../database/favourites.db.js'

export const addFavPlayer = async (userId, id) => {
  await addFavPlayerToDb(userId, id)
}

export const getFavPlayer = async (userId) => {
  const favPlayers = await getFavPlayersFromDb(userId)
  return favPlayers
}

export const deleteFavPlayer = async (id, userId) => {
  await deleteFavPlayerFromDb(id, userId)
}

export const checkDuplicateFav = async (id, userId) => {
  const player = await getPlayerById(id)
  const duplicatePlayer = await checkDuplicateFavFromDb(id, userId)
  if (duplicatePlayer === null) {
    return false
  } else if (player.id === duplicatePlayer[0].player_id) {
    return true
  } else {
    throw new Error('Something went wrong')
  }
}
