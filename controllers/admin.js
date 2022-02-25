import {
  addPlayerService,
  getPlayerByNameService,
  updatePlayerService,
  getPlayerByIdService,
  deletePlayerService,
} from '../services/adminServices.js'

export const addPlayers = async (req, res) => {
  const { name, country } = req.body
  try {
    const player = await getPlayerByNameService(name)
    if (player && player.length === 0) {
      await addPlayerService(name, country)
      return res.send('Player added')
    }
    res.status(409).send('Player already exists')
    throw new Error('Error adding new player')
  } catch (e) {
    console.log(e)
  }
}

export const updatePlayers = async (req, res) => {
  const { id, name, country } = req.body
  try {
    const player = await getPlayerByIdService(id)
    if (player && player.length === 0) {
      return res.status(404).send('Player not found')
    }
    await updatePlayerService(id, name, country)
    res.send('Updated player successfully')
    throw new Error('Error updating player')
  } catch (e) {
    console.log(e)
  }
}

export const deletePlayers = async (req, res) => {
  const { id } = req.body
  try {
    const player = await getPlayerByIdService(id)
    if (player && player.length === 0) {
      return res.status(404).send('No player found to delete')
    }
    await deletePlayerService(id)
    res.send('Player deleted successfully')
    throw new Error('Error deleting player')
  } catch (e) {
    console.log(e)
  }
}
