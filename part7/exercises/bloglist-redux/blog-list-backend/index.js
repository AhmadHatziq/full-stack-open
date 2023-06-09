const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Check if running in test mode 
if (process.env.NODE_ENV === 'test') {
  logger.info(`Running in TEST mode.`)
}

// Make the server listen on port 3003 or the environment variable (for deployment)
const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})