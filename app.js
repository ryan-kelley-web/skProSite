require('dotenv').config();
let express = require('express');
let app = express();
let database = require('./db');

//CONTROLLER IMPORT VARIABLES (see also controller routes)
let blog = require('./Controllers/blogController');
let user = require('./Controllers/userController');
let workout = require('./Controllers/workoutController');
let profile = require('./Controllers/profileController');

//SEQUELIZE REQUIREMENT
////*in case of emergency use FORCE:TRUE to reset db tables*
database.sync();
/////////////////////////////////////
// database.sync( { force: true } );
/////////////////////////////////////

//MIDDLEWARE FUNCTION 
//*must stay above routes*
app.use(require("./Middleware/headers"));
app.use(express.json());
//allows use of req.body middleware as provided by Express (see userController.js)
//Express jsonifies the req and interprets the body data

//CONTROLLER ROUTES
app.use('/blog', blog);
app.use('/user', user);
app.use('/workout', workout);
app.use('/profile', profile);
////////////////////////////////////////
// Example Route:
//  app.use('/test', function(req, res){
//      res.send('This is a msg from test endpoint on the server.')
//  }) 
/////////////////////////////////////////
//each route calls Express's .use() method, creates route access to all funcs in corresponding controller files
//.use(URL path to controller, controller import variable)----params (see above for 'controller import variable')

// //PROTECTED ROUTE option 1: "the ValidateSession ALL Technique"
// //***use *if* ALL routes in ____Controller(s) need to be restricted***
// app.use(require('./Middleware/validateSession')); 
// //*if utilized, anything below this line will be protected*


//PROTECTED ROUTE option 2: "the ValidateSession SOME Technique"
// //***use *if* a controller has a specific number of routes that need to be restricted***
//inject validateSession.js directly into a route(s) in ____Controller
//(see blogController.js)

//SKPROSITE SERVER SOCKET
app.listen(process.env.PORT, function () {
    console.log('skProSite is listening on Port 3000');
})