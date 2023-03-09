const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.USER,
        process.env.PASS,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001,
        }
    );
}

module.exports = sequelize;
