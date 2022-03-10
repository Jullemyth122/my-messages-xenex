const router = require('express').Router();
const mongoose = require('mongoose')
let Habits = require('../models/habit_model')

// To get all the data
router.route('/').get((req,res) => {
    Habits.find()
        .then(habit => res.json(habit))
        .catch(err => res.status(400).json('Error :'+ err))
})

// To find specific data
router.route('/:id').get((req,res) => {
    Habits.findById(req.params.id)
        .then(habit => res.json(habit))
        .catch(err => res.status(400).json('Error :' + err))
})

// To find the description
// router.route('/').get((req,res) => {
   
//     Habits.find({description:req.body.description})
//         .then(habit => res.json(habit))
//         .catch(err => res.status(400).json('Error :' + err))


// })

// // To find the title
// router.route('/').get((req,res) => {
   
//     Habits.find({habit_title:req.body.habit_title})
//         .then(habit => res.json(habit))
//         .catch(err => res.status(400).json('Error :' + err))


// })

// To add new data
router.route('/add').post((req,res) => {

    const habit_title = req.body.habit_title
    const description = req.body.description
    const date_start = req.body.date_start
    const date_final = req.body.date_final

    const newHabitDeclaration = new Habits({
        habit_title,description,date_start,date_final
    })

    newHabitDeclaration.save()
        .then(habit => res.json('New Habit Added!'))
        .catch(err => res.status(400).json('Error :' + err))

})

// Find all the same description and change them
// router.route('/').put((req,res) => {
//     Habits.find({ description:req.body.description })
//         .then(habit => {

//             habit.habit_title = req.body.habit_title
//             habit.description = req.body.description
//             habit.date_start = req.body.date_start
//             habit.date_final = req.body.date_final

//             habit.save()
//                 .then(() => res.json('Edit Habit Updated'))
//                 .catch(err => res.json(400).json('Error :'+err))
//         })
//         .catch(err => res.status(400).json('Error: ' + err))
// })

// Request params
// router.route('/search/:variable').get((req,res) => {
//     console.log(req.params.variable)
//     res.send(req.params.variable)
// })

// Request query
// router.route('/item/query').get((req,res) => {
//     console.log(req.query)
//     res.send(req.query)
// })


// router.route('/:description').put((req,res) => {
//     Habits.findByIdAndUpdate(req.params.description)
//         .then(habit => {
//             habit.habit_title = req.body.habit_title
//             habit.description = req.body.description
//             habit.date_start = req.body.date_start
//             habit.date_final = req.body.date_final

//             habit.save()
//                 .then(() => res.json('Edit Habit Updated'))
//                 .catch(err => res.json(400).json('Error :'+err))

//         })
//         .catch(err => res.status(400).json('Error: ' + err))
// })

// // Find all the same description and delete them
// router.route('/').delete((req,res) => {
//     Habits.find({ description:req.body.description })
//         .then(habit => {
//             habit.habit_title = req.body.habit_title
//             habit.description = req.body.description
//             habit.date_start = req.body.date_start
//             habit.date_final = req.body.date_final
//         })
//         .catch(err => res.status(400).json('Error: ' + err))
// })

// Edit specific id
router.route('/update/:id').put((req,res) => {
    Habits.findByIdAndUpdate(req.params.id)
        .then(habit => {

            habit.habit_title = req.body.habit_title
            habit.description = req.body.description
            habit.date_start = req.body.date_start
            habit.date_final = req.body.date_final

            habit.save()
                .then(() => res.json('Edit Habit Updated'))
                .catch(err => res.status(400).json('Error :'+err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
// Delete specific id
router.route('/:id').delete((req,res) => {
    Habits.findByIdAndDelete(req.params.id)
        .then(habit => res.json('Record was deleted'))
        .catch(err => res.status(400).json('Error:'+err))
})

module.exports = router