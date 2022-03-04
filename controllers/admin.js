import {
  addPlayerService,
  getPlayerByName,
  updatePlayerService,
  getPlayerById,
  deletePlayerService,
} from '../services/adminServices.js'

export const addPlayers = async (req, res) => {
  const { name, country } = req.body
  if (!name || !country) {
    return res.status(422).send('Input required')
  }
  try {
    const player = await getPlayerByName(name)
    if (player === null) {
      await addPlayerService(name, country)
      return res.status(200).send('Player added')
    }
    return res.status(409).send('Player already exists')
  } catch (e) {
    console.log(e)
  }
}

export const updatePlayers = async (req, res) => {
  const { id, name, country } = req.body
  if (!id || !name || !country) {
    return res.status(422).send('Input required')
  }
  try {
    const player = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('Player not found')
    }
    await updatePlayerService(id, name, country)
    return res.status(200).send('Updated player successfully')
  } catch (e) {
    console.log(e)
  }
}

export const deletePlayers = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  }
  try {
    const player = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('No player found to delete')
    }
    await deletePlayerService(id)
    return res.status(200).send('Player deleted successfully')
  } catch (e) {
    console.log(e)
  }
}
