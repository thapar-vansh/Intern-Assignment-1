import favouritesDb from '../database/favourites.db.js'

const addFavPlayerService = async (userId, id) => {
  try {
    await favouritesDb.addFavPlayerToDb(userId, id)
  } catch (e) {
    console.log(e)
    throw new Error('Error adding as favourite player')
  }
}

const getFavPlayerService = async (userId) => {
  try {
    const favPlayers = await favouritesDb.getFavPlayersFromDb(userId)
    return favPlayers
  } catch (e) {
    console.log(e)
    throw new Error('Error retrieving favourite players')
  }
}

const deleteFavPlayerService = async (id, userId) => {
  try {
    await favouritesDb.deleteFavPlayerFromDb(id, userId)
  } catch (e) {
    console.log(e)
    throw new Error('Error deleting favourite player')
  }
}

export default {
  addFavPlayerService: addFavPlayerService,
  getFavPlayerService: getFavPlayerService,
  deleteFavPlayerService: deleteFavPlayerService,
}
