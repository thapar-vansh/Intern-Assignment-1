import {
  getPlayersService,
  registerService,
  loginService,
} from '../services/indexServices.js'

export const getPlayers = async (req, res) => {
  try {
    const result = await getPlayersService()
    res.send(result)
    throw new Error('Error getting players')
  } catch (e) {
    console.log(e)
  }
}

export const register = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await registerService(username, password)
    if (result === true) {
      return res.status(409).send('User already exists.Please login')
    }
    res.send('Registered successfully')
    throw new Error('Error getting players')
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    await loginService(username, password, req, res)
  } catch (e) {
    console.log(e)
  }
}
