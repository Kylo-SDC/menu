require('dotenv').config();
const { Pool } = require('pg');

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })

const pool = new Pool({
  user: 'nas',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
});

module.exports = pool;
