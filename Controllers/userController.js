const router = require('express').Router(); //alt way of importing express and
//accessing .Router() method, declared as var router
const User = require('../db').import('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//USER REGISTRATION
router.post('/register', function (req, res) {

    User.create(
        {
            name: req.body.user.name,
            email: req.body.user.email,
            // password: req.body.user.password,-------superceded by code below
            password: bcrypt.hashSync(req.body.user.password, 13),
            tagline: req.body.user.tagline,
            theWhy: req.body.user.theWhy,
            isAdmin: false,
        }
    )
        .then(
            // res.send('This is the "user/register" endpoint.')-----superceded by below code because 
            //.send() and .json() are nearly identical, but only .json() converts non-objects (e.g., null, undefined, etc.) into valid JSON
            function createSuccess(user) {
                let token = jwt.sign( //.sign() is token-creating jwt method
                    { id: user.id, email: user.email }, //.sign(param1 = payload, param2 = signature, param3 = specific options or callback func)
                    process.env.JWT_SECRET,
                    { expiresIn: 60 * 90 }
                );
                res.json(
                    {
                        user: user, //returns db info as res object, declared as variable user
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

//USER LOGIN
router.post('/login', function (req, res) {

    User.findOne(             //.findOne() method is sequelize data retrieval func
        { where: { email: req.body.user.email } } //where is sequelize object that tells db to look for something with matching properties
    )
        .then(
            function loginSuccess(user) {
                if (user) {    //why am I not required to put something along the lines of if(user == true) instead? QQQ

                    bcrypt.compare(
                        req.body.user.password,
                        user.password,
                        function (err, matches) {
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
                                res.status(502).send(
                                    { error: 'Login failed.' }
                                )
                            }
                        }
                    )

                } else {
                    res.status(500).json(
                        { error: "User does not exist." }
                    )
                }
            }
        )
        .catch(
            (err) => res.status(500).json(
                { error: err }
            )
        )
}) //END USER LOGIN

//from app.js----------what is the reason this example route was demo'd in app.js? why not demo in a controller? QQQ
//EXAMPLE ROUTE
//(param1 = path, param2 = callback func, invoked when skProSite gets an http req hit while listening)
// app.use('/test', function(req, res){
//     res.send('This is a msg from test endpoint on the server.')
// })

module.exports = router; 