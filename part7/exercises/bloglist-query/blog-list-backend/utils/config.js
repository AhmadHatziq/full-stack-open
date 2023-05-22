require('dotenv').config()

// Environment variables are stored in the ".env" file, which is not comitted. 

const PORT = process.env.PORT

// If running in TEST mode, will access the TEST DB. Else, will use the normal DB. 
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI 

module.exports = {
  MONGODB_URI,
  PORT
}