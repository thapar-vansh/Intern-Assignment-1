import express from 'express'

import userControllers from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/add/fav/players', auth.verifyUser, userControllers.addFavPlayers)

router.get('/get/fav/players', auth.verifyUser, userControllers.getFavPlayers)

router.post('/delete/fav/players', auth.verifyUser, userControllers.deleteFavPlayers)

export default router
