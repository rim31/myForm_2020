import { Request, Response } from "express";
const pool = require('../../db');
import { IQuestion } from '../models/IQuestion';


// ======== create a question  =======
export const postQuestion = async (req: Request, res: Response) => {
  // }
  // app.post("/api/q", async (req, res) => {
  try {
    const { description } = req.body;
    const newQuestions: any = await pool.query(
      "INSERT INTO tablequestion (description) VALUES($1) RETURNING *",// returning back the data, $1 is a placeholder for the description area, and the 2nd argument is for this placeholder
      [description]);
    res.json(newQuestions.rows[0]);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== get all questions / Answers  ==========
// app.get("/api/q", async (req, res) => {
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const allQuestions: any = await pool.query(
      "SELECT * FROM tablequestion");// returning back the data
    res.json(allQuestions.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== get a question/answer =======
// app.get("/api/q/:id", async (req, res) => {
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const test: IQuestion = req.params;
    console.log(test.description);
    const question: any = await pool.query(
      "SELECT * FROM tablequestion WHERE question_id = $1", [id])
    res.json(question.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== update a question/answer ========
// app.put("/api/q/:id", async (req, res) => {
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateQuestion: any = await pool.query(
      "UPDATE tablequestion SET description = $1 WHERE question_id = $2",
      [description, id]
    );
    res.json("update ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== delete a question/answer ======== 
// app.delete("/api/q/:id", async (req, res) => {
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteQuestion: any = await pool.query(
      "DELETE FROM tablequestion WHERE question_id = $1", [id])
    res.json("delete ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};
