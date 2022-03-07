import express from 'express'

import { register, login, getPlayers } from '../controllers/index.js'
import { verifyUser } from '../middleware/auth.js'

export const router = express.Router()

router.post('/register', register)

router.get('/login', verifyUser, login)

router.get('/players', getPlayers)


