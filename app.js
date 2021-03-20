const express = require('express')
const app = express()
const port = process.env.PORT || 3000   // Use system's enviroment port number else use 3000

// Middleware for parsing json
app.use(express.json())

// Root request
app.get("/", (req, res) => {
  res.send("Hello world")
})

// Listening to specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})