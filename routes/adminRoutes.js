import express from 'express'

import {
  addPlayers,
  updatePlayers,
  deletePlayers,
} from '../controllers/admin.js'
import { verifyAdmin } from '../middleware/auth.js'

export const router = express.Router() 

router.post('/add/players', verifyAdmin, addPlayers)

router.post('/update/players', verifyAdmin, updatePlayers)

router.post('/delete/players', verifyAdmin, deletePlayers)

