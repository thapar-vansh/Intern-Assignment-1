import db from '../util/database.js'

async function addPlayers(req, res, next) {
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
}

async function updatePlayers(req, res) {
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
              res.status(200).send('Updated successfully')
            }
          }
        )
      }
    })
  }
}

async function deletePlayers(req, res) {
  const { id } = req.body
  if (!id) {
    return res.status(400).send('Input is required')
  } else {
    try {
      db.query('SELECT * FROM players WHERE id = $1', [id], (err, result) => {
        if (result.rowCount > 0) {
          db.query(
            'DELETE FROM players WHERE id = $1',
            [id],
            (err, response) => {
              if (err) {
                console.log(err)
              } else {
                res.status(200).send('Deleted Successfully')
              }
            }
          )
        } else {
          res.status(400).send('Player does not exists')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  addPlayers: addPlayers,
  updatePlayers: updatePlayers,
  deletePlayers: deletePlayers,
}
