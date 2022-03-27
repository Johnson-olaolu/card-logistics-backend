const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())

//Mongo DB connection
const config = require('./config/config')
config.ConnectDB()

//initailise passport 
const initializePassport = require("./utils/passport")
initializePassport()

//routes
const appRoutes = require('./routes/index.routes')
app.use("/api", appRoutes)

//error middleware 
const { notFound, errorHandler} = require('./middleware/errorMiddleware')
app.use(notFound, errorHandler)

app.listen( process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})