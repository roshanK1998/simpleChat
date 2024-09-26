const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_system',
    connectionLimit: 10
});

// console.log('connected to database')

module.exports = pool;
