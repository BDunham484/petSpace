//import sequelize model constructor and datatypes
const { Model, DataTypes } = require('sequelize');
//inprt sequelize connection to database
const sequelize = require('../config/connection');
//creates the Like class by extending the sequelize Model constructor
class Like extends Model {}
//define table columns and configurations for Like model
Like.init(
  {
    //define an id column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //define a user id columne
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    //define a post id column
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
    //pass in our imported sequelize connection
    sequelize,
    //don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camel-casing
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'like'
  }
);
//export like model
module.exports = Like;