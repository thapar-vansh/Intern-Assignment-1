import { getPlayerById } from '../services/adminService.js'
import {
  addFavPlayer,
  getFavPlayer,
  deleteFavPlayer,
  checkDuplicateFav,
} from '../services/userService.js'

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
    const duplicatePlayer = await checkDuplicateFav(id, userId)
    if (duplicatePlayer === true) {
      return res.status(409).send('Player already in favourites !!')
    }
    await addFavPlayer(userId, id)
    return res.status(200).send('Added as favourite')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getFavPlayers = async (req, res) => {
  const userId = req.user.userId
  try {
    const favPlayer = await getFavPlayer(userId)
    if (favPlayer?.length === 0) {
      return res.status(404).send('No favourites found')
    }
    return res.status(200).send(favPlayer)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deleteFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  }
  try {
    const favPlayer = await getFavPlayer(userId)
    if (favPlayer?.length === 0) {
      return res.status(404).send('No favourites found')
    }
    await deleteFavPlayer(id, userId)
    return res.status(200).send('Favourite player deleted successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
