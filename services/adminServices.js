import playersDb from '../database/players.db.js'

const addPlayerService = async (name, country) => {
  try {
    await playersDb.addPlayerToDb(name, country)
  } catch (e) {
    console.log(e)
    throw new Error('Error adding new player')
  }
}

const updatePlayerService = async (id, name, country) => {
  try {
    await playersDb.updatePlayerToDb(id, name, country)
  } catch (e) {
    console.log(e)
    throw new Error('Error updating player')
  }
}

const deletePlayerService = async (id) => {
  try {
    await playersDb.deletePlayerFromDb(id)
  } catch (e) {
    console.log(e)
    throw new Error('Error deleting player')
  }
}

const getPlayerByNameService = async (name) => {
  try {
    const playerByName = await playersDb.getPlayerByNameFromDb(name)
    return playerByName
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

const getPlayerByIdService = async (id) => {
  try {
    const playerById = await playersDb.getPlayerByIdFromDb(id)
    return playerById
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

export default {
  addPlayerService: addPlayerService,
  getPlayerByNameService: getPlayerByNameService,
  updatePlayerService: updatePlayerService,
  getPlayerByIdService: getPlayerByIdService,
  deletePlayerService: deletePlayerService,
}
