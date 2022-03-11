import express from 'express'

import {
  addFavPlayers,
  getFavPlayers,
  deleteFavPlayers,
} from '../controllers/user.js'
import { verifyUser } from '../middleware/auth.js'

export const router = express.Router()

router.post('/add/fav/players', verifyUser, addFavPlayers)

router.get('/get/fav/players', verifyUser, getFavPlayers)

router.delete('/delete/fav/players', verifyUser, deleteFavPlayers)
