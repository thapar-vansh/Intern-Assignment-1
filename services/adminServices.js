import {
  addPlayerToDb,
  updatePlayerToDb,
  deletePlayerFromDb,
  getPlayerByNameFromDb,
  getPlayerByIdFromDb,
} from '../database/players.db.js'

export const addPlayerService = async (name, country) => {
  try {
    await addPlayerToDb(name, country)
    throw new Error('Error adding new player')
  } catch (e) {
    console.log(e)
  }
}

export const updatePlayerService = async (id, name, country) => {
  try {
    await updatePlayerToDb(id, name, country)
    throw new Error('Error updating player')
  } catch (e) {
    console.log(e)
  }
}

export const deletePlayerService = async (id) => {
  try {
    await deletePlayerFromDb(id)
  } catch (e) {
    console.log(e)
    throw new Error('Error deleting player')
  }
}

export const getPlayerByNameService = async (name) => {
  try {
    const playerByName = await getPlayerByNameFromDb(name)
    return playerByName
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

export const getPlayerByIdService = async (id) => {
  try {
    const playerById = await getPlayerByIdFromDb(id)
    return playerById
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}


