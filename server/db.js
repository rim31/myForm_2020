const Pool = require('pg').Pool;
const config = require('./config');
console.log("COUCOU", config.pwd);

const pool = new Pool({
  user: 'postgres',
  password: config.pwd,
  // password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'tsp'
});

module.exports = pool;
