import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import indexRoutes from './routes/indexRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'

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
