import {
  getPlayersService,
  registerService,
  loginService,
} from '../services/indexServices.js'

export const getPlayers = async (req, res) => {
  try {
    const result = await getPlayersService()
    return res.status(200).send(result)
  } catch (e) {
    console.log(e)
  }
}

export const register = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result = await registerService(username, password)
    if (result === true) {
      return res.status(409).send('User already exists.Please login')
    }
    return res.status(200).send('Registered successfully')
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    await loginService(req, res)
  } catch (e) {
    console.log(e)
  }
}
