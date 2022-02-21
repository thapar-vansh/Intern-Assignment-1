import adminServices from '../services/adminServices.js'
import userServices from '../services/userServices.js'

const addFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  try {
    const player = await adminServices.getPlayerByIdService(id)
    if (player === null) {
      res.send('Player not found')
    } else {
      await userServices.addFavPlayerService(userId, id)
      res.send('Added as favourite')
    }
  } catch {
    throw new Error('Error adding as favourite player')
  }
}

const getFavPlayers = async (req, res) => {
  const userId = req.user.userId
  try {
    const favPlayer = await userServices.getFavPlayerService(userId)
    if (favPlayer === null) {
      res.send('No favourites found')
    } else {
      res.send(favPlayer)
    }
  } catch {
    throw new Error('Error retrieving favourite players')
  }
}

const deleteFavPlayers = async (req, res) => {
  const userId = req.user.userId
  const { id } = req.body
  try {
    const favPlayer = await userServices.getAllFavPlayerService(userId)
    if (favPlayer === null) {
      res.send('No favourites found')
    } else {
      await userServices.deleteFavPlayerService(id, userId)
      res.send('Favourite player deleted successfully')
    }
  } catch {
    throw new Error('Error deleting favourite player')
  }
}

export default {
  addFavPlayers: addFavPlayers,
  getFavPlayers: getFavPlayers,
  deleteFavPlayers: deleteFavPlayers,
}
