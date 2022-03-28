const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    comments: {
        type:[
            {
                name:{
                    type:String,
                },
                likes:{
                    type:Number,
                    min:0,
                    max:100
                },
                likes_list:[{
                    confirmation_like:{type:Boolean},
                    name:{type:String}
                }]
                ,
                comment_description:{
                    type:String,maxlength:7000
                },
                comment_list:{
                    type:[
                        {
                            name:{ type:String},
                            likes:{
                                type:Number,
                                max:10000,
                            },
                            comment_description:{
                                type:String,maxlength:7000
                            },
                        }
                    ],
                    validate:[arrayLimit,'{PATH} exceeds the limit of 10']
                }
            }
        ],
        validate:[arrayLimit,'{PATH} exceeds the limit of 10']
    }
})

function arrayLimit(val) {
    return val.length <= 10;
}

const COMMENT = mongoose.model('comments',commentsSchema)

const defaultIdLikerModel = [
    "00000001a24dfc9b806e607f",
    // "00000001a24dfc9b806e607d"
]

const queries = []
defaultIdLikerModel.forEach((likerId) => {
    queries.push(
      COMMENT.findOneAndUpdate(
        { _id: likerId },
        {
          $setOnInsert: {
            comments:[]
          },
        },
        {
            upsert: true,
        },
        ),
    );
});
  
Promise.all(queries).then().catch(error => console.log(error))
module.exports = COMMENT