// const Pool = require('pg').Pool;
import { Pool as Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: process.env.DBPWD,
  host: 'localhost',
  port: 5432,
  database: 'tsp'
});

module.exports = pool;
