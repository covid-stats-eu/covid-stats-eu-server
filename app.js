import express, { json } from 'express'
import cors from 'cors'
import {activityRouter, countryRouter } from './routes.js'


const app = express()
const port = process.env.PORT || 3000   // Use system's enviroment port number else use 3000

// Middleware for parsing json
app.use(json())
app.use(cors({origin: "*",}))

// using routes
app.use('/activity', cors({origin: "*",}), activityRouter)
app.use('/country', cors({origin: "*",}), countryRouter)

// Root request
app.get("/", (req, res) => {
  res.send("Hello world")
})

// Listening to specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
