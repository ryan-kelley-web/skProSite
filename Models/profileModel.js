module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile',
        {
            profileCityState: {
                type: DataTypes.STRING
            },
            profileTagline: {
                type: DataTypes.STRING
            },
            profileWhy: {
                type: DataTypes.STRING
            },
            profileAdvantage: {
                type: DataTypes.STRING
            }
        })
        return Profile;
}

//STRETCH: add profileMemberSince: {type:DataTypes.DATEONLY}, tie to createdAt col in postgres?