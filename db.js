const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: '123123123',
    host: 'localhost',
    port: 5432,
    database: 'subscribe_db'
});

module.exports = pool;