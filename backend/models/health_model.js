const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    temperature:{
        type:Number,
        required:true,
        trim:true
    },
    // email:{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    // phonenumber:{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    date_start: {
        type:Date,
        required:true
    },
    date_final: {
        type:Date,
        required:true
    }
},{
    timestamps:true
})

// This is to called the table name for database 
const Health = mongoose.model('health',healthSchema)

module.exports = Health