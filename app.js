import express from 'express'
import db from './util/database.js'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import auth from './middleware/auth.js'

dotenv.config()

const app = express()

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.use(bodyParser.json())

app.post('/register', async (req, res) => {
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
})

app.post('/login', auth.verifyUser, async (req, res) => {
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
            return res.status(200).send(token)
          } else {
            res.status(400).send('Invalid credentials')
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  }
})

app.get('/get/players', async (req, res) => {
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
})

app.post('/add/players', auth.verifyAdmin, async (req, res) => {
  let { name, country } = req.body
  if (!name && !country) {
    return res.status(400).send('Input is required')
  } else {
    try {
      db.query(
        'SELECT * FROM players WHERE name = $1',
        [name],
        (err, result) => {
          if (result.rows[0] == undefined || null) {
            db.query(
              'INSERT INTO players (name, country ) VALUES ($1,$2)',
              [name, country],
              (err, response) => {
                if (err) {
                  res.status(400).send('FAILED')
                  console.log(err)
                } else {
                  res.status(200).send('ADDED SUCCESSFULLY')
                }
              }
            )
          } else if (
            result.rows[0].name == req.body.name &&
            result.rows[0].country == req.body.country
          ) {
            res.status(409).send('Player already exists')
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
})

app.post('/update/players', auth.verifyAdmin, async (req, res) => {
  let { name, country, id } = req.body
  if (!name && !country && !id) {
    return res.status(400).send('Input is required')
  } else {
    db.query('SELECT * FROM players WHERE id = $1', [id], (err, result) => {
      if (result.rowCount > 0) {
        db.query(
          'UPDATE players SET name = $1, country = $2 WHERE id = $3',
          [name, country, id],
          (err, response) => {
            if (err) {
              res.status(400).send('Failed')
              console.log(err)
            } else {
              res.status(400).send('Updated successfully')
            }
          }
        )
      }
    })
  }
})

app.post('/delete/players', auth.verifyAdmin, async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).send('Input is required')
  } else {
    db.query('SELECT * FROM players WHERE id = $1', [id], (err, result) => {
      if (result.rowCount > 0) {
        db.query('DELETE FROM players WHERE id = $1', [id], (err, response) => {
          if (err) {
            console.log(err)
          } else {
            res.status(200).send('Deleted Successfully')
          }
        })
      } else {
        res.status(400).send('Player does not exists')
      }
    })
  }
})

app.post('/add/fav/players', auth.verifyUser, async (req, res) => {
  const user_id = req.user.userId
  let { player_id } = req.body
  if (player_id == null) {
    res.status(400).send('Input is required')
  } else {
    try {
      db.query(
        'INSERT INTO favourites (user_id, player_id) VALUES ($1,$2)',
        [user_id, player_id],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            res.status(200).send('Added as favourite')
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
})

app.get('/get/fav/players', auth.verifyUser, async (req, res) => {
  const userId = req.user.userId
  db.query(
    'SELECT player_id from favourites WHERE user_id = $1',
    [userId],
    (req, result) => {
      try {
        if (result.rowCount > 0) {
          res.send(result.rows)
        } else {
          res.send('No favourites found')
        }
      } catch (err) {
        console.log(err)
      }
    }
  )
})

app.delete('/delete/fav/players', auth.verifyUser, async (req, res) => {
  const user_id = req.user.userId
  const { player_id } = req.body
  if (!player_id) {
    return res.status(400).send('Input is required')
  }
  try {
    db.query(
      'SELECT * FROM favourites WHERE user_id = $1',
      [user_id],
      (err, result) => {
        if (result.rowCount > 0) {
          db.query(
            'DELETE FROM favourites WHERE player_id  = $1',
            [player_id],
            (err, response) => {
              if (err) {
                console.log(err)
                res.status(400).send()
              } else {
                res.status(200).send('Favourite player deleted successfully')
              }
            }
          )
        } else {
          res.status(404).send('No players in favourite list')
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
})

function generateToken(userId) {
  const privateKey = process.env.JWT_PRIVATEKEY
  const token = jwt.sign(
    { userId: userId, iat: Math.round(new Date().getTime() / 1000) },
    privateKey,
    { expiresIn: '365d' }
  )
  return token
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
