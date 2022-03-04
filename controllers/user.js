import { getPlayerById } from '../services/adminServices.js'
import {
  addFavPlayerService,
  getFavPlayerService,
  deleteFavPlayerService,
} from '../services/userServices.js'

export const addFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  }
  try {
    const player = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('Player not found')
    }
    await addFavPlayerService(userId, id)
    return res.status(200).send('Added as favourite')
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
    return res.status(200).send(favPlayer)
  } catch (e) {
    console.log(e)
  }
}

export const deleteFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  }
  try {
    const favPlayer = await getFavPlayerService(userId)
    if (favPlayer && favPlayer.length === 0) {
      return res.status(404).send('No favourites found')
    }
    await deleteFavPlayerService(id, userId)
    return res.status(200).send('Favourite player deleted successfully')
  } catch (e) {
    console.log(e)
  }
}
