import { getPlayerByIdService } from '../services/adminServices.js'
import {
  addFavPlayerService,
  getFavPlayerService,
  deleteFavPlayerService,
} from '../services/userServices.js'

export const addFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  try {
    const player = await getPlayerByIdService(id)
    if (player && player.length === 0) {
      return res.status(404).send('Player not found')
    }
    await addFavPlayerService(userId, id)
    res.send('Added as favourite')

    throw new Error('Error adding as favourite player')
  } catch (e) {
    console.log(e)
  }
}

export const getFavPlayers = async (req, res) => {
  const userId = req.user.userId
  try {
    const favPlayer = await getFavPlayerService(userId)
    if (favPlayer && favPlayer.length === 0) {
      return res.status(404).send('No favourites found')
    }
    res.send(favPlayer)
    throw new Error('Error retrieving favourite players')
  } catch (e) {
    console.log(e)
  }
}

export const deleteFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  try {
    const favPlayer = await getFavPlayerService(userId)
    if (favPlayer && favPlayer.length === 0) {
      res.status(404).send('No favourites found')
    }
    await deleteFavPlayerService(id, userId)
    res.send('Favourite player deleted successfully')
    throw new Error('Error deleting favourite player')
  } catch (e) {
    console.log(e)
  }
}
