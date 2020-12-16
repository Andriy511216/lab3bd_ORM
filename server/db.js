const Sequelize = require('sequelize');

const db = new Sequelize('university', 'postgres', 'zvfrfcs', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

module.exports = db;

