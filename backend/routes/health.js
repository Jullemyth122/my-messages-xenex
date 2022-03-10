const router = require('express').Router();
const mongoose = require('mongoose')
let Health = require('../models/health_model')

router.route('/').get((req,res) => {
    Health.find()
        .then(health => res.json(health))
        .catch(err => res.status(400).json('Error :' + err))
})

router.route('/add').post((req,res) => {

    const fullname = req.body.fullname
    const temperature = req.body.temperature
    const date_start = req.body.date_start
    const date_final = req.body.date_final
    // const email = req.body.email
    // const phonenumber = req.body.phonenumber

    const newHealthDeclaration = new Health({
        fullname,temperature,date_start,date_final
        // email,phonenumber
    })

    newHealthDeclaration.save()
        .then(health => res.json('New Record Added!'))
        .catch(err => res.status(400).json('Error :' + err))

})

//details to get
router.route('/:id').get((req,res) => {        
    Health.findById(req.params.id)
        .then(health => res.json(health))
        .catch(err => res.status(400).json('Error :' + err))  
    
})

//delete 
router.route('/:id').delete((req,res) => {
    Health.findByIdAndDelete(req.params.id)
    .then(health => res.json('Record was deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

//update
router.route('/update/:id').put((req,res) => {
    Health.findByIdAndUpdate(req.params.id)
        .then(health => {
            health.fullname = req.body.fullname
            health.temperature = req.body.temperature
            health.date_start = req.body.date_start
            health.date_final = req.body.date_final
            // health.email = req.body.email
            // health.phonenumber = req.body.phonenumber

            health.save()
                .then(() => res.json('Edit Record Updated!'))
                .catch(err => res.status(400).json('Error :' + err))
        
        })
        .catch(err => res.status(400).json('Error :' + err))

})

module.exports = router