module.exports = (sequelize, DataTypes) => {

    const Workout = sequelize.define('workout', {

        workoutIntention: { 
            type: DataTypes.STRING 
        },
        workoutTitle: {
            type:DataTypes.STRING
        },
        workoutItself: { 
            type: DataTypes.STRING 
        },
        workoutGuidance: { 
            type: DataTypes.STRING 
        },
        workoutPubDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workoutAuthor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Workout;
}

