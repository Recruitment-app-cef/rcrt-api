//importando variables de entorno
require('dotenv').config()

//conexión a DB postgreSQL
const db = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '5432',
        user: process.env.USER || 'romer',
        database: process.env.DB || 'master',
        password: process.env.PWD || 'romer' 
    }
});

module.exports = db;