const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    habit_title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,   
    },
    date_start:{
        type:Date,
        required:true,
    },
    date_final:{
        type:Date,
        required:true,
    }
},{
    timestamps:true
})

const Habits = mongoose.model('habit',habitSchema)

module.exports = Habits