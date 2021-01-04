module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            isAdmin: {
                type: DataTypes.BOOLEAN
                //do I need to add allowNull?----QQQ
                //can i avoid users seeing "isAdmin" on the frontend?----QQQ
            }

        })
    return User;
}