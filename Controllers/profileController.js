const Profile = require('../db').import('../Models/profileModel');
const User = require('../db').import('../Models/userModel');
const validateSession = require('../Middleware/validateSession');
const router = require('express').Router();

//CREATE
////CREATE PROFILE
router.post('/createprofile', validateSession, (req, res) => {

    // const NewProfile = {
    //     profileCityState: req.body.profile.profileCityState,
    //     profileTagline: req.body.profile.profileTagline,
    //     profileWhy: req.body.profile.profileWhy,
    //     profileAdvantage: req.body.profile.profileAdvantage,
    //     userId: req.user.id
    // }

    // Profile.create(NewProfile)

        Profile.create(
            {
                profileCityState: req.body.profile.profileCityState,
                profileTagline: req.body.profile.profileTagline,
                profileWhy: req.body.profile.profileWhy,
                profileAdvantage: req.body.profile.profileAdvantage,
                userId: req.user.id
            }
        )
        .then((profile) => res.status(200).json(profile))
        .catch((err) => console.log(err))
})


//GET
////GET PROFILE
router.get('/getprofile', (req, res) => {
    Profile.findOne(
        {
            where: { userId: req.user.id }
        }
    )
        .then(function createSuccess(profile) {
            res.status(200).json({
                message: 'Profile found.',
                profile: profile
            })
        })
        .catch((err) => res.status(500).json('Profile not found.', err))
})



//DELETE
////DELETE PROFILE
router.delete('/deleteprofile/:userId', validateSession, function (req, res) {

    const query = { where: { id: req.params.userId } }

    Profile.destroy(query)
        .then(() => res.status(200).json({ message: 'Profile has been deleted.' }))
        .catch((err) => res.status(500).json({ error: err }))
})


module.exports = router;
