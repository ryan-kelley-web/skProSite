module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tagline: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        theWhy: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        isAdmin: {
            type: DataTypes.BOOLEAN, 
            //do I need to add allowNull? can i avoid users seeing "isAdmin"? QQQ
        },

    })
    return User;
}