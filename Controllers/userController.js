const router = require('express').Router(); //alt way of importing express and
//accessing .Router() method, declared as var router
const User = require('../db').import('../Models/userModel');
const Profile = require('../db').import('../Models/profileModel');
const validateSession = require('../Middleware/validateSession');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//CREATE
////USER REGISTRATION
router.post('/register', function (req, res) {

    User.create(
        {
            name: req.body.user.name,
            email: req.body.user.email,
            password: bcrypt.hashSync(req.body.user.password, 13),
            // password: req.body.user.password,-------superceded by code above
            isAdmin: req.body.user.isAdmin,
        }
    )
        .then(
            // res.send('This is the "user/register" endpoint.')-----superceded by below code because 
            //.send() and .json() are nearly identical, but only .json() converts non-objects (e.g., null, undefined, etc.) into valid JSON
            function createSuccess(user) {
                let token = jwt.sign(
                    //.sign() is token-creating jwt method
                    //.sign(payload, signature, specific options or callback func)----params
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: 60 * 90 }
                );
                res.json(
                    {
                        user: user,
                        //returns db info as res object, declared as variable user
                        //left user = variable name of returned res object, right user = arg for createSuccess() func
                        message: 'User registered successfully.',
                        sessionToken: token,
                    }
                );
            }
        )
        .catch(
            (err) => res.status(500).json({ error: err })
        )
}) //END USER REGISTRATION

//"CREATE"
////USER LOGIN
router.post('/login', function (req, res) {

    User.findOne(
        //.findOne() method is sequelize data retrieval func
        { where: { email: req.body.user.email }, include: "profile"}
        //where is sequelize object that tells db to look for something with matching properties
    )
        .then(
            function loginSuccess(user) {
                if (user) {
                    //why am I not required to put something along the lines of if(user == true) instead? QQQ

                    bcrypt.compare(req.body.user.password, user.password, function (err, matches) {

                        if (matches) {

                            let token = jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 60 * 90 },
                            )

                            res.status(200).json(
                                {
                                    user: user,
                                    message: 'User logged in successfully.',
                                    sessionToken: token,
                                }
                            )

                        } else {
                            res.status(502).send({ error: 'Login failed.' })
                        }
                    })

                } else {
                    res.status(500).json({ error: "User does not exist." })
                }
            })
        .catch((err) => res.status(500).json({ error: err }))
}) //END USER LOGIN

//READ
////DISPLAY ALL USERS *admin only*
router.get('/allusers', validateSession, (req, res) => {

    if (req.user.isAdmin == true) {

        User.findAll()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json({ error: err }))
    } else {
        res.status(403).json({ error: 'User not authorized to display all users.' })
    }
})  //END DISPLAY ALL USERS (READ)

//DISPLAY SINGLE USER (ON SKDASH)
router.get('/singleuser', validateSession, (req, res) => {
    User.findOne( {
        where: { 
            id: req.user.id
        }, include: "profile"

    })
    .then((userProfile) => res.status(200).json(userProfile))
    .catch((err) => res.status(500).json({error: err}))
})
//PUT
////EDIT USER
router.put('/edituser/:userId', validateSession, function (req, res) {

    const editUser = {
        name: req.body.user.name,
        email: req.body.user.email,//----not editing email
        // password: bcrypt.hashSync(req.body.user.password, 13),----not editing pword
        // password: req.body.user.password,----superceded by code above
        // tagline: req.body.user.tagline,
        // theWhy: req.body.user.theWhy,
        isAdmin: req.body.user.isAdmin,
    }

    const query = { where: { id: req.params.userId } };

    User.update(editUser, query)
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({ error: err }))
}) 

//DELETE
////DELETE USER *admin only*
router.delete('/deleteuser/:userId', validateSession, function (req, res) {

    if (req.user.isAdmin == true) {

        const query = { where: { id: req.params.userId } }

        User.destroy(query)
            .then(() => res.status(200).json({ message: 'User has been deleted.' }))
            .catch((err) => res.status(500).json({ error: err }))
    } else {
        res.status(403).json({ error: 'User is not authorized to delete other users.' })
    }
})



module.exports = router;
