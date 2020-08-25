require('dotenv').config()

module.exports = {
  port_prod: process.env.API_PROD_BASE,
  port_dev: process.env.API_DEV_URL
};

{/**
example .env
API_DEV_URL=http://localhost:8081/api
API_PROD_BASE=/api
*/}