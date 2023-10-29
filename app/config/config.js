const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '/../../.env') })

module.exports = {
  PORT: process.env.PORT,
  DB_HOST_DEV: process.env.DB_HOST_DEV,
  DB_NAME_DEV: process.env.DB_NAME_DEV,
  DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV,
  DB_DIALECT_DEV: process.env.DB_DIALECT_DEV,
  DB_PORT_DEV: process.env.DB_PORT_DEV,
  DB_USERNAME_DEV: process.env.DB_USERNAME_DEV,
  SECRET_KEY: process.env.SECRET_KEY
}