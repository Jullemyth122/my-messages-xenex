const router = require('express').Router();
const mongoose = require('mongoose')
let Starter = require('../models/starter-model')

router.route('/').get((req,res) => {
    Starter.find()
        .then(starter => res.json(starter))
        .catch(err => res.status(400).json('Error :' + err))
})

router.route('/add').post((req,res) => {

    const fullname = req.body.fullname
    const nickname = req.body.nickname
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight
    const date_birth = req.body.date_birth


    const newStarterDeclaration = new Starter({
        fullname,nickname,age,height,weight,date_birth
        // email,phonenumber
    })

    newStarterDeclaration.save()
        .then(starter => res.json('New Record Added!'))
        .catch(err => res.status(400).json('Error :' + err))

})

//details to get
router.route('/:id').get((req,res) => {        
    Starter.findById(req.params.id)
        .then(starter => res.json(starter))
        .catch(err => res.status(400).json('Error :' + err))  
    
})

//delete 
router.route('/:id').delete((req,res) => {
    Starter.findByIdAndDelete(req.params.id)
    .then(starter => res.json('Record was deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

//update
router.route('/update/:id').put((req,res) => {
    Starter.findByIdAndUpdate(req.params.id)
        .then(starter => {
            
            starter.fullname = req.body.fullname
            starter.nickname = req.body.nickname
            starter.age = req.body.age
            starter.height = req.body.height
            starter.weight = req.body.weight
            starter.date_birth = req.body.date_birth

            starter.save()
                .then(() => res.json('Edit Record Updated!'))
                .catch(err => res.status(400).json('Error :' + err))
        
        })
        .catch(err => res.status(400).json('Error :' + err))

})

module.exports = router