
const Sequelize = require('sequelize');
const database = new Sequelize(process.env.APP_NAME, 'postgres', process.env.PWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('Connected to skProSite postgres database'))
    .catch((err) => console.log(err))

//MODELS IMPORT
const User = database.import('./models/userModel');
const Blog = database.import('./models/blogModel');
const Workout = database.import('./models/workoutModel');
const Profile = database.import('./models/profileModel');

//DB ASSOCIATIONS
////1:1
User.hasOne(Profile, {as: "prof"})
Profile.belongsTo(User, {as: "prof"})

module.exports = database;