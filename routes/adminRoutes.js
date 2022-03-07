import express from 'express'

import {
  addPlayers,
  updatePlayers,
  deletePlayers,
} from '../controllers/admin.js'
import { verifyAdmin } from '../middleware/auth.js'

export const router = express.Router()

router.post('/add/players', verifyAdmin, addPlayers)

router.put('/update/players', verifyAdmin, updatePlayers)

router.delete('/delete/players', verifyAdmin, deletePlayers)
