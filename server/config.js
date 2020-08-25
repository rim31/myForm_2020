const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  pwd: process.env.DB_PWD,
  path_prefix_prod: process.env.PATH_PREFIX_PROD,
  react_server: process.env.REACT_SERVER,
  port_prod: process.env.PORT_PROD,
  port_dev: process.env.PORT_DEV
};