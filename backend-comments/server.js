const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 3333

const usersRouter = require('./routes/user')
const commentsRouter = require('./routes/comments')

app.use(cors());
app.use(bodyParser.json())

const uri = process.env.MONGO_URI;

app.use('/users',usersRouter)
app.use('/comments',commentsRouter)

mongoose.connect(uri)

app.listen(port,() => {
    console.log(`Server is running on port ${port}...`)
})