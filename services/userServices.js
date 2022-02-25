import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
} from '../database/favourites.db.js'
import { checkUser } from '../database/users.db.js'

export const addFavPlayerService = async (userId, id) => {
  try {
    await addFavPlayerToDb(userId, id)
    throw new Error('Error adding as favourite player')
  } catch (e) {
    console.log(e)
  }
}

export const getFavPlayerService = async (userId) => {
  try {
    const favPlayers = await getFavPlayersFromDb(userId)
    return favPlayers
  } catch (e) {
    console.log(e)
    throw new Error('Error retrieving favourite players')
  }
}

export const deleteFavPlayerService = async (id, userId) => {
  try {
    await deleteFavPlayerFromDb(id, userId)
    throw new Error('Error deleting favourite player')
  } catch (e) {
    console.log(e)
  }
}

export const getUsersService = async (userId) => {
  const user = await checkUser(userId)
  if (user && user.length > 0) {
    return res.send('User exists in database')
  }
  return res.status(400).send('Unknown user')
}


