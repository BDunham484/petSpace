//import sequelize model constructor and datatypes
const { Model, DataTypes } = require('sequelize');
//import sequelize database connection
const sequelize = require('../config/connection');
//creates the Comment class by extending the sequelize Model constructor
class Comment extends Model { }
//define table columns and configurations for Comment model
Comment.init(
    {
        //define an id  column
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //define a comment text column
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //outline a user id column
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        //outline a post id column
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't pluralize name of database table
        freezeTableName: true,
        //user underscores instead of camel-casing
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'comment'
    }
);
//export comment model
module.exports = Comment;