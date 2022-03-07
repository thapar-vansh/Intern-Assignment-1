import {
  getAllPlayers,
  registerUser,
  loginUser,
} from '../services/indexService.js'

export const getPlayers = async (req, res) => {
  try {
    const result = await getAllPlayers()
    return res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const register = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result = await registerUser(username, password)
    if (result === true) {
      return res.status(409).send('User already exists.Please login')
    }
    return res.status(200).send('Registered successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result = await loginUser(username,password)
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
