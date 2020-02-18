require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  user: 'nas',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
});

module.exports = pool;
