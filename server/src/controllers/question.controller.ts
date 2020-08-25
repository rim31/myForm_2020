import { Request, Response, json } from "express";
const pool = require('../../db');
// import { getAll, getQuestion, postQuestion, updateQuestion, deleteQuestion } from '../controllers/api.controller';


// set standard_conforming_strings=on TO ESCAPE \

// ======== create a Question  =======
export const postQuestion = async (req: Request, res: Response) => {
  // }
  // app.post("/api", async (req, res) => {
  try {
    const info: string = req.body.info;
    let description: any = req.body.description;
    // description = JSON.stringify(description);
    const newQuestions: any = await pool.query(
      "INSERT INTO table_question (info, description) VALUES($1, $2) RETURNING *",// returning back the data, $1 is a placeholder for the info area, and the 2nd argument is for this placeholder
      [info, description]);
    res.json(newQuestions.rows[0]);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== get all Questions / Questions  ==========
// app.get("/api", async (req, res) => {
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const allQuestions: any = await pool.query(
      "SELECT * FROM table_question");// returning back the data | ::json->'json' doesn't give the good result expect
    res.json(allQuestions.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== get a Question/answer =======
// app.get("/api/:id", async (req, res) => {
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Question: any = await pool.query(
      "SELECT * FROM table_question WHERE question_id = $1", [id])
    res.json(Question.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== update a Question/answer ========
// app.put("/api/:id", async (req, res) => {
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const info: string = req.body.info;
    let description: any = req.body.description;
    // description = description[0].replace(/\\/, "\\\\");
    // description = JSON.stringify(description);
    console.log(description)
    const updateQuestion: any = await pool.query(
      "UPDATE table_question SET info = $1, description = $2 WHERE question_id = $3",
      [info, description, id]
    );
    res.json("update ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== delete a Question/Answer ======== 
// app.delete("/api/:id", async (req, res) => {
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteQuestion: any = await pool.query(
      "DELETE FROM table_question WHERE question_id = $1", [id])
    res.json("delete ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};
