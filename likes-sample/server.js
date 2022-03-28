const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
require('dotenv').config()

const likersRouter = require('./routes/likes')

const port = process.env.PORT || 5555

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;

app.use('/likers',likersRouter)

mongoose
.connect(uri,{  //.connect(connectionString)
})       

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
