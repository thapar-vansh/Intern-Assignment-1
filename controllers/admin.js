import adminServices from '../services/adminServices.js'

const addPlayers = async (req, res) => {
  const { name, country } = req.body
  try {
    const player = await adminServices.getPlayerByNameService(name)
    if (player && player.length === 0) {
      await adminServices.addPlayerService(name, country)
      res.send('Player added')
    } else {
      res.send('Player already exists')
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error adding new player')
  }
}

const updatePlayers = async (req, res) => {
  const { id, name, country } = req.body
  try {
    const player = await adminServices.getPlayerByIdService(id)
    if (player && player.length === 0) {
      res.send('Player not found')
    } else {
      await adminServices.updatePlayerService(id, name, country)
      res.send('Updated player successfully')
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error updating player')
  }
}

const deletePlayers = async (req, res) => {
  const { id } = req.body
  try {
    const player = await adminServices.getPlayerByIdService(id)
    if (player && player.length === 0) {
      res.send('No player found to delete')
    } else {
      await adminServices.deletePlayerService(id)
      res.send('Player deleted successfully')
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error deleting player')
  }
}

export default {
  addPlayers: addPlayers,
  updatePlayers: updatePlayers,
  deletePlayers: deletePlayers,
}
