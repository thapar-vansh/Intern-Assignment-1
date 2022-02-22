import dotenv from 'dotenv'
import indexServices from '../services/indexServices.js'

dotenv.config()

const getPlayers = async (req, res) => {
  try {
    const result = await indexServices.getPlayersService()
    res.send(result)
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

const register = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await indexServices.registerService(username, password)
    if (result === true) {
      res.send('User already exists.Please login')
    } else {
      res.send('Registered successfully')
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error getting players')
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await indexServices.loginService(username, password)
    if (result === false) {
      res.send('User does not exists')
    } else if (result === 0) {
      res.send('Invalid credentials')
    } else {
      res.send(result)
    }
  } catch (e) {
    console.log(e)
    throw new Error('Error logging for user')
  }
}

export default {
  register: register,
  login: login,
  getPlayers: getPlayers,
}
