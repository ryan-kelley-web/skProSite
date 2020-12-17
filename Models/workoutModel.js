module.exports = (sequelize, DataTypes) => {

    const Workout = sequelize.define('workout', {

        workoutIntention: { 
            type: DataTypes.STRING 
        },
        workoutTitle: {
            type:DataTypes.STRING
        },
        workoutContent: { 
            type: DataTypes.STRING 
        },
        workoutGuidance: { 
            type: DataTypes.STRING 
        },
        workoutPubDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workoutOwner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return Workout;
}

