const { Pool } = require('pg')
const {
  DB_NAME_DEV,
  DB_HOST_DEV,
  DB_PASSWORD_DEV,
  DB_PORT_DEV,
  DB_USERNAME_DEV
} = require('../config/config')

const pool = new Pool({
  user: DB_USERNAME_DEV,
  host: DB_HOST_DEV,
  database: DB_NAME_DEV,
  password: DB_PASSWORD_DEV,
  port: DB_PORT_DEV,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

async function connect() {
  await pool.connect()
  console.log('Connected to database')
}

connect()

module.exports = { pool }