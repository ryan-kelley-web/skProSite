module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('blog', {

        blogCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        blogSubtitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        blogPubDate: {
            type: DataTypes.DATEONLY,
            //how can I tie this to the db's createdAt col? QQQ
            allowNull: false
        }, 
        blogItself: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        blogAuthor: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return Blog;
}