import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { router as indexRoutes } from './routes/indexRoutes.js'
import { router as adminRoutes } from './routes/adminRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'

dotenv.config()

const app = express()

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.use(bodyParser.json())

app.use(indexRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
