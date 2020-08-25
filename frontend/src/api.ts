import { isProd, HelloWorldMessage, IAllQuestions, IAllAnswers } from "@ts-react-express-starter/common";
// const config: any = require('../config'); // ERROR :X


// TODO: inject endpoints from config
// const API_BASE = isProd ? config.port_prod : config.port_dev;
const API_BASE = isProd ? "/api" : "//localhost:8081";
const get = (path: string) => window.fetch(API_BASE + path, { method: "GET" });

export const getHelloWorld = (): Promise<HelloWorldMessage> =>
  get("/").then(response => response.json());


export const getQuestions = (): Promise<IAllQuestions> =>
  get("/api/q/").then(response => response.json());

export const getAnswers = (): Promise<IAllAnswers> =>
  get("/api/").then(response => response.json());
