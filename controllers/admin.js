import {
  addPlayer,
  getPlayerByName,
  updatePlayer,
  getPlayerById,
  deletePlayer,
} from '../services/adminService.js'

export const addPlayers = async (req, res) => {
  const { name, country } = req.body
  if (!name || !country) {
    return res.status(422).send('Input required')
  }
  try {
    const player = await getPlayerByName(name)
    if (player === null) {
      await addPlayer(name, country)
      return res.status(200).send('Player added')
    }
    return res.status(409).send('Player already exists')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
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
    await updatePlayer(id, name, country)
    return res.status(200).send('Updated player successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
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
    await deletePlayer(id)
    return res.status(200).send('Player deleted successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
