module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('blog', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pubDate: {
            type: DataTypes.STRING,
            //how can I tie this to the db's createdAt col? QQQ
            allowNull: false,
        }, 
        contentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       



        //STRETCH?
        //QQQ------instead of pubDate, could I make pubDt, pubMo, pubYr, setting DataTypes as num, str, num respectively?

    })
    return Blog;
}