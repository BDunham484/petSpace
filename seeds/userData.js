//import user model
const { User } = require('../models');

//array of data to poplate user info
const userData = [
    {
        username: 'brad',
        email: 'brad@email.com',
        password: 'password'
    },
    {
        username: 'danny',
        email: 'danny@email.com',
        password: 'password'
    },
    {
        username: 'max',
        email: 'max@email.com',
        password: 'password'
    }
]

//function to bulk create initial users
const seedUser = () => User.bulkCreate(userData);

//export functio to index.js
module.exports = seedUser;