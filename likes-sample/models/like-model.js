const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likerSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    like:{
        type:Number,
        required:false
    },
    dislike:{
        type:Number,
        required:false
    }
},{
    timestamps:true
})

// This is to called the table name for database 
const Liker = mongoose.model('likessample',likerSchema)

module.exports = Liker