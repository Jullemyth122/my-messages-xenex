const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const practiceRouter1 = require('./routes/practice-1')

const port = process.env.PORT || 1212

app.use(cors())
app.use(bodyParser.json())

const uri = process.env.MONGO_URI;

app.use('/practice1',practiceRouter1)

mongoose.connect(uri,{})

app.listen(port,() => {
    console.log(`Server listening on port ${port}`)
})