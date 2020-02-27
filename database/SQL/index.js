require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: '3.15.196.128',
  database: 'sdc',
  password: 'sdc',
  port: 5432,
});

module.exports = pool;
