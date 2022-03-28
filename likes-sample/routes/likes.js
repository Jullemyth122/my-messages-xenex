const router = require('express').Router()
const mongoose = require('mongoose')
let Liker = require('../models/like-model')

router.route('/').get((req,res) => {
    Liker.find()
        .then(likes => res.json(likes))
        .catch(err => console.log(err))

})

router.route('/add').post((req,res) => {
    const fullname = req.body.fullname

    const newLikeDeclaration = new Liker({
        fullname
    })

    newLikeDeclaration.save()
        .then(likes => res.json('New Record Added!'))
        .catch(err => res.status(400).json('Error :' + err))
})

router.route('/update/:id').put((req,res) => {
    Liker.findByIdAndUpdate(req.params.id)
        .then(likes => {
            
            likes.fullname = req.body.fullname
            likes.like = req.body.likes

            likes.save()
            .then(() => res.json('Likes Updated!'))
            .catch(err => res.status(400).json('Error :' + err))
        })
        .catch(err => res.status(400).json('Error :' + err))

})

module.exports = router