const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const practiceSchema1 = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:Number,
        max:1000  
    }

},{
    timestamps:true
})

const practice1 = mongoose.model('practice1',practiceSchema1)

module.exports = practice1