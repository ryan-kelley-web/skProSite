const express = require('express');
const router = express.Router();
const validateSession = require('../Middleware/validateSession');
const Workout = require('../db').import('../Models/workoutModel');

//not all endpoints below are admin only

//CREATE
////ADD NEW WORKOUT
router.post('/newworkout', validateSession, (req, res) => {

    // if (req.user.isAdmin == true) {

        const newWorkoutEntry = {
            workoutIntention: req.body.workout.workoutIntention,
            workoutTitle: req.body.workout.workoutTitle,
            workoutItself: req.body.workout.workoutItself,
            workoutGuidance: req.body.workout.workoutGuidance,
            workoutPubDate: req.body.workout.workoutPubDate,
            workoutAuthor: req.user.id, //.toString() worked again
        }

        Workout.create(newWorkoutEntry)
            .then((workout) => res.status(200).json(workout))
            .catch((err) => res.status(500).json({ error: err }))

    } 
    // else {

    //     res.status(403).json({ error: 'User not authorized to add new workouts.' })
    // }
// }
) //END ADD NEW WORKOUT (CREATE)

//READ
////SEE ALL WORKOUTS
router.get('/allworkouts', (req, res) => {
    //validateSession not necessary

    Workout.findAll()
        .then((workouts) => res.status(200).json(workouts))
        .catch((err) => res.status(500).json({ error: err }))
}) //END SEE ALL WORKOUTS (READ)

//SEE SINGLE WORKOUT
router.get('/viewworkout/:workoutId', validateSession, (req, res) =>{
    Workout.findOne({
        where: {
            id: req.params.workoutId
        }
    })
    .then((singleWkt) => res.status(200).json(singleWkt))
    .catch((err)=> res.status(500).json({error: err}))
})

//UPDATE
////EDIT WORKOUT
router.put('/editworkout/:workoutId', validateSession, function (req, res) {

    if (req.user.isAdmin == true) {

        const revisedWorkoutEntry = {
            workoutIntention: req.body.workout.workoutIntention,
            workoutTitle: req.body.workout.workoutTitle,
            workoutItself: req.body.workout.workoutItself,
            workoutGuidance: req.body.workout.workoutGuidance,
            workoutPubDate: req.body.workout.workoutPubDate,
            workoutAuthor: req.user.id,
        }

        const query = { where: { id: req.params.workoutId } }; //owner not working again but .toString() not helping----QQQ

        Workout.update(revisedWorkoutEntry, query)
            .then((workout) => res.status(200).json(workout))
            .catch((err) => res.status(500).json({ error: err }))

    } else {
        res.status(403).json({ error: 'User not authorized to edit workouts.' })
    }
}) //END EDIT WORKOUT (UPDATE)

//DELETE
////DELETE WORKOUT
router.delete('/deleteworkout/:workoutId', validateSession, function (req, res) {

    if (req.user.isAdmin == true) {

        const query = { 
            where: { 
                id: req.params.workoutId, 
                workoutAuthor: req.user.id 
            } 
        } //owner?----QQQ
        //.toString()--should not need so long as owner is integer

        Workout.destroy(query)
            .then(() => res.status(200).json({ message: 'Workout has been deleted.' }))
            .catch((err) => res.status(500).json({ error: err }))

    } else {
        res.status(403).json({ error: 'User not authorized to delete workouts.' })
    }
}) //END DELETE WORKOUT (DELETE)


module.exports = router;



//note: write http req in controller, write route in app.js