//import sequelize connection to database
const sequelize = require('../config/connection');
//require seed data form postData and userData
const seedPost = require('./postData');
const seedUser = require('./userData');

//function to force a sync and run seed functions from postData.js and userData.js
const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedPost();

    process.exit(0);
};

//function call
seedAll();