import pg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pg

dotenv.config()

const CONFIG = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  max: 10,
}

const pool = new Pool(CONFIG)

const query = async(text, params) => {
  return new Promise((resolve, reject) => {
    try {
      const result = pool.query(text, params)
      return resolve(result)
    } catch (error) {
      return reject(error)
    }
  })
}

export default {
  query: query
}