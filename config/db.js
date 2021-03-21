// Database connection and configuration
const mysql = require('mysql2/promise');
const credentials = require('./credentials.js');

async function query(sql, params) {
    const connection = await mysql.createConnection(credentials.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}