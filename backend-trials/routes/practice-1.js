const router = require('express').Router()

let practice1 = require('../model/practical-model-1')

router.route('/').get((req,res) => {
    practice1.find()
        .then(practice_1 => res.json(practice_1))
        .catch(err => console.log(err))
})


router.route('/add').post((req,res) => {
    const name = req.body.name
    const number = req.body.number || 0

    const newPractice1 = new practice1({
        name,number
    })

    newPractice1.save()
        .then(practice_1 => res.json('New record added!'))
        .catch(err => res.status(400).json('Error :' + err))

})

router.route('/update/:id').post((req,res) => {
    
    practice1.findById(req.params.id)
        .then( practice_1 => {

            practice_1.name = req.body.name
            practice_1.number = req.body.number

            practice_1.save()
            .then(() => res.json('Sample Updated!'))
            .catch(err => res.status(400).json('Error :' + err))

        })
        .catch()

})

router.route('/update/:id').put((req,res) => {

    practice1.findByIdAndUpdate(req.params.id)
        .then(practice_1 => {
            practice_1.name = req.body.name
            practice_1.number = req.body.number

            practice_1.save()
            .then(() => res.json('Sample Updated!'))
            .catch(err => res.status(400).json('Error :' + err))
        })
        .catch(err => res.status(400).json('Error :' + err))

        

})


module.exports = router