import express from 'express'

import adminControllers from '../controllers/admin.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/add/players', auth.verifyAdmin,adminControllers.addPlayers)

router.post('/update/players', auth.verifyAdmin,adminControllers.updatePlayers)

router.post('/delete/players', auth.verifyAdmin,adminControllers.deletePlayers)

export default router
