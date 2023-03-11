const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: 'Whack',
        email: 'thisis@bogus.com',
        password: 'areyoukidding123'
    },
    {
        username: 'IAmFrustrated',
        email: 'didntcoverinclass@email.com',
        password: 'gettingsickofthis123'
    }
];

const seedUsers = () => User.bulkcreate(userdata, { individualHooks: true });

module.exports = seedUsers;