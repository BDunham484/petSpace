//import sequelize constructor from the library
const Sequelize = require('sequelize');
//run dotenv whenever connection.js is called
require('dotenv').config();

let sequelize;

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
);
// //if using heroku it makes a connection to jawsdb
// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
//     //if using locally it makes a connection to the database using credentials stored in an environment
// } else {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     });
// }

module.exports = sequelize;