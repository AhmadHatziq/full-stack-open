const app = require('./app')
const config = require('./utils/config')

// Make the server listen on port 3003 or the environment variable (for deployment)
const PORT = config.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})