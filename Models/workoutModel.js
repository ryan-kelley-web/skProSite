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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        workoutAuthor: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Workout;
}

