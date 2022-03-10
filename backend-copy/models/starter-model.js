const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const starterSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    nickname:{
        type:String,
        required:true,
        trim:true
    },
    age: {
        type:Number,
        required:true,
        max:65
    },
    height:{   
        type:Number,
        required:true,
    },
    weight:{
        type:Number,
        required:true
    },
    date_birth:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

// This is to called the table name for database 
const Starter = mongoose.model('starter',starterSchema)

module.exports = Starter