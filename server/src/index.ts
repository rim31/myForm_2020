import * as path from "path";
import * as express from "express";
import * as cors from "cors";
import apiRoutes from "./routes/api";
const config: any = require('../config');
import { isProd } from "@ts-react-express-starter/common";
import { getTestMessage } from "./testMessage";
// const pool = require('../db');
// import * as pool from '../db_test';

console.log("env:", config.pwd)
console.log(`[Express: ${isProd ? "PRODUCTION" : "DEVELOPMENT"} MODE]`);

const app = express();
//======================
// app.use(cors());
app.use(express.json());
//======================



// TODO: all these should come from some config
console.log(config.port_prod, config.port_dev)
const PORT = isProd ? config.port_prod : config.port_dev;
const PATH_PREFIX = isProd ? config.path_prefix_prod : "";
const REACT_SERVER = config.react_server;

/*
 * In production mode, all static files are in a folder, but in dev mode
 * React and Express live in separate servers and ports.
 */
if (isProd) {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  app.use(cors({ origin: REACT_SERVER }));
}

app.get(`${PATH_PREFIX}/`, async (req, res) => {
  const obj = await getTestMessage();
  res.json(obj);
});

// Routes
app.use('/api', apiRoutes);// go to /routes/auth.ts



app.listen(PORT, () => {
  console.log(`opened in port ${PORT}`);
});
