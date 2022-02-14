import db from '../util/database.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

async function register(req, res, next) {
  try {
    const { username, password } = req.body
    if (!username && !password) {
      return res.status(400).send('Input is required')
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      let user = {
        username: req.body.username,
        password: hashedPassword,
      }
      db.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            if (result.rowCount > 0) {
              res.status(409).send('User already exists.Please login')
            } else {
              db.query(
                'INSERT INTO users (username, password) VALUES ($1,$2)',
                [user.username, user.password],
                (err, result) => {
                  if (err) {
                    res.status(400).send('FAILED')
                    console.log(err)
                  } else {
                    res.status(200).send('REGISTERED SUCCESSFULLY')
                  }
                }
              )
            }
          }
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
}

async function login(req, res, next) {
  const { username, password } = req.body
  if (!username && !password) {
    return res.status(400).send('Input is required')
  } else {
    db.query(
      'SELECT id,password FROM users WHERE username = $1',
      [username],
      (err, result) => {
        try {
          if (bcrypt.compare(password, result.rows[0].password)) {
            const userId = result.rows[0].id
            const token = generateToken(userId)
            console.log('Logged is successfully')
            res.status(200).send(token)
          } else {
            res.status(400).send('Invalid credentials')
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  }
}

async function getPlayers(req, res, next) {
  db.query('SELECT * FROM players', [], (err, result) => {
    try {
      if (result.rowCount > 0) {
        res.status(200).send(result.rows)
      } else {
        res.status(400).send('No players found')
      }
    } catch (err) {
      res.status(400).send()
      console.log(err)
    }
  })
}

function generateToken(userId) {
  const privateKey = process.env.JWT_PRIVATEKEY
  const token = jwt.sign(
    { userId: userId, iat: Math.round(new Date().getTime() / 1000) },
    privateKey,
    { expiresIn: '365d' }
  )
  return token
}

export default {
  register: register,
  login: login,
  getPlayers: getPlayers,
}
