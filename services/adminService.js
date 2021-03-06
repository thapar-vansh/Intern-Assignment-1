import {
  addPlayerToDb,
  updatePlayerToDb,
  deletePlayerFromDb,
  getPlayerByNameFromDb,
  getPlayerByIdFromDb,
} from '../database/players.db.js'

export const addPlayer = async (name, country) => {
  await addPlayerToDb(name, country)
}

export const updatePlayer = async (id, name, country) => {
  await updatePlayerToDb(id, name, country)
}

export const deletePlayer = async (id) => {
  await deletePlayerFromDb(id)
}

export const getPlayerByName = async (name) => {
  const playerByName = await getPlayerByNameFromDb(name)
  return playerByName
}

export const getPlayerById = async (id) => {
  const playerById = await getPlayerByIdFromDb(id)
  return playerById
}
