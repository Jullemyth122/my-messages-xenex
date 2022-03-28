const router = require('express').Router()
let Users = require('../models/user-model')

router.route('/').get((req,res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})      

router.route('/register').post((req,res) => {
    
    const { name,password } = req.body

    const newUsersDeclaration = new Users({
        name,password
    })

    newUsersDeclaration.save()
        .then(register => res.json(register))

})

module.exports = router