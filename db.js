
const Sequelize = require('sequelize');
const database = new Sequelize(process.env.APP_NAME, 'postgres', process.env.PWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('Connected to skProSite postgres database'))
    .catch((err) => console.log(err))

//MODELS IMPORT
const User = database.import('./Models/userModel');
const Blog = database.import('./Models/blogModel');
const Workout = database.import('./Models/workoutModel');
const Profile = database.import('./Models/profileModel');

//DB ASSOCIATIONS
////1:1
User.hasOne(Profile)
Profile.belongsTo(User)

module.exports = database;