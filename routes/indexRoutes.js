import express from 'express'

import indexControllers from '../controllers/index.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.post('/register', indexControllers.register)

router.post('/login', auth.verifyUser,indexControllers.login)

router.get('/players', indexControllers.getPlayers)

export default router
