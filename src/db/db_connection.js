//importando variables de entorno
require('dotenv').config()

//conexión a DB postgreSQL
const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        database: 'master',
        password: 'romer' 
    }
});

module.exports = db;