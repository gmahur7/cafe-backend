require('dotenv').config()
const express = require('express')
const app = express()

const mongoDBConnect = require('./Database/config')
mongoDBConnect()
const userRoutes = require('./Router/UserRouter')

const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)

app.listen(port, () => {
    console.log("Server Is Running @ " + port)
})