const router = require('express').Router()

let COMMENT = require('../models/comments-model')

router.route('/').get((req,res) => {
    COMMENT.find()
        .then(comments => res.json(comments))
        .catch(err => console.log(err))
})

router.route('/:id').get((req,res) => {
    const id = req.params.id
})

router.route('/post/:id').post((req,res) => {
    const { _id, comments } = req.body

    const id = req.params.id
    console.log(comments)

    COMMENT.updateOne(
        {_id:_id},
        {
            $addToSet: { 
                comments: {  
                    $each: comments
                } 
            }
        }
    ).then((comments) => res.json("New Comment Added") )
    .catch(err => console.log(err))

})

router.route('/append/:id').put((req,res) => {
    const { _id, sub_id, comments,old_items } = req.body
    const id = req.params.id
    console.log(_id)
    console.log(sub_id)
    console.log(comments)
    console.log(old_items)
    // Sub_id for the certain item of comments
    COMMENT.updateOne(
        {
            _id:id,
            "comments._id" : sub_id
        },
        {
            $set:{
                "comments.$.likes_list": comments
            }
        },
        // {arrayFilters:[
        //     {"i":comments},
        //     // {"[]":comments}
        // ]}
    ).then((comments) => res.json("Likes List Added") )
    .catch(err => console.log(err))

})

router.route('/likes/:id').put((req,res) => {
    const { _id, comments } = req.body

    const id = req.params.id
    console.log(id,comments)
    console.log(comments[0].name)
    console.log(comments[0].likes)

    if (comments[0].confirmation_like == true) {
        COMMENT.updateOne(
            {
                _id:id,
                "comments.name": comments[0].name,
            },
            {
                $set:{
                    "comments.$.likes": comments[0].likes,
                    "comments.$.likes_list.$[i].confirmation_like":true
                }
            },
            {arrayFilters: [{"i.confirmation_like":false}]}
        )
        .then((comments) => res.json("Likes Updated"))
        .catch(err => console.log(err))
    }
    else if (comments[0].confirmation_like == false) {
        COMMENT.updateOne(
            {
                _id:id,
                "comments.name": comments[0].name,
            },
            {
                $set:{
                    "comments.$.likes": comments[0].likes,
                    "comments.$.likes_list.$[i].confirmation_like":false
                }
            },
            {arrayFilters: [{"i.confirmation_like":true}]}
        )
        .then((comments) => res.json("Likes Updated"))
        .catch(err => console.log(err))        
    }


})

router.route('/edit/:id').put((req,res) => {
    const { _id, comments } = req.body

    const id = req.params.id

    COMMENT.updateOne(
        {_id:id,"comments.name": comments[0].name },
        {
            $set:{"comments.$.comment_description":comments[0].comment_description}
        }
    ).then((comments) => res.json({message:"Comment Edited",data:comments}) )
    .catch(err => console.log(err))

})


module.exports = router