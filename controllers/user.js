import db from '../util/database.js'

async function addFavPlayers(req, res) {
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
}

async function getFavPlayers(req, res) {
  const userId = req.user.userId
  try {
    db.query(
      'SELECT player_id,name,country FROM favourites fv JOIN players pl ON pl.id = fv.player_id WHERE user_id = $1',
      [userId],
      (err, response) => {
        if (err) {
          console.log(err)
        } else if (response.rowCount > 0) {
          res.send(response.rows)
        } else {
          res.send('No favourites found')
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
}

async function deleteFavPlayers(req, res) {
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
}

export default {
  addFavPlayers: addFavPlayers,
  getFavPlayers: getFavPlayers,
  deleteFavPlayers: deleteFavPlayers,
}
