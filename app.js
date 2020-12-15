require('dotenv').config();
let express = require('express');
let app = express(); 
let sequelize = require('./db'); 

//CONTROLLER IMPORT VARIABLES (see also controller routes)
let blog = require('./Controllers/blogController');
let user = require('./Controllers/userController');

//SEQUELIZE REQUIREMENT
//use force:true in case of emergency to reset db tables
sequelize.sync();
// sequelize.sync( { force: true } );

//MIDDLEWARE FUNCTION ***must stay above routes***
//allows use of req.body middleware as provided by Express (see userController.js)
//Express jsonifies the req and interprets the body data
app.use(express.json());

//CONTROLLER ROUTES
/* 
Example Route:
 app.use('/test', function(req, res){
     res.send('This is a msg from test endpoint on the server.')
 }) 
 */

//each route calls Express's .use() method, creates route access to all funcs in corresponding controller files
//.use(param1 = URL path to controller, param2 = controller import variable) (see above)
app.use('/blog', blog);
app.use('/user', user); //EXPOSED ROUTE

// //PROTECTED ROUTE option 1: "the ValidateSession ALL Technique"
// //***use *if* ALL routes in ____Controller(s) need to be restricted***
// app.use(require('./Middleware/validateSession')); 
// //***if utilized, anything below this line will be protected***


//PROTECTED ROUTE option 2: "the ValidateSession SOME Technique"
// //***use *if* a controller has a specific number of routes need to be restricted***
//inject validateSession.js directly into a route(s) in ____Controller
//(see blogController.js)

//SKPROSITE SERVER SOCKET
app.listen(3000, function(){
    console.log('skProSite is listening on Port 3000');
})