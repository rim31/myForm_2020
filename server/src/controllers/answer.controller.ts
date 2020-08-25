import { Request, Response } from "express";
const pool = require('../../db');
// import { getAll, getAnswer, postAnswer, updateAnswer, deleteAnswer } from '../controllers/api.controller';


// set standard_conforming_strings=on TO ESCAPE \

// ======== create a Answer  =======
export const postAnswer = async (req: Request, res: Response) => {
  // }
  // app.post("/api", async (req, res) => {
  try {
    const info: string = req.body.info;
    let description: any = req.body.description;
    // description = JSON.stringify(description);
    const newAnswers: any = await pool.query(
      "INSERT INTO table_answer (info, description) VALUES($1, $2) RETURNING *",// returning back the data, $1 is a placeholder for the info area, and the 2nd argument is for this placeholder
      [info, description]);
    res.json(newAnswers.rows[0]);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== get all Answers / Answers  ==========
// app.get("/api", async (req, res) => {
export const getAnswers = async (req: Request, res: Response) => {
  try {
    const allAnswers: any = await pool.query(
      "SELECT * FROM table_answer");// returning back the data
    res.json(allAnswers.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== get a Answer/answer =======
// app.get("/api/:id", async (req, res) => {
export const getAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Answer: any = await pool.query(
      "SELECT * FROM table_answer WHERE answer_id = $1", [id])
    res.json(Answer.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};


// ======== update a Answer/answer ========
// app.put("/api/:id", async (req, res) => {
export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const info: string = req.body.info;
    let description: any = req.body.description;
    // description = description[0].replace(/\\/, "\\\\");
    // description = JSON.stringify(description);
    console.log(description)
    const updateAnswer: any = await pool.query(
      "UPDATE table_answer SET info = $1, description = $2 WHERE answer_id = $3",
      [info, description, id]
    );
    res.json("update ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};

// ======== delete a Answer/answer ======== 
// app.delete("/api/:id", async (req, res) => {
export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteAnswer: any = await pool.query(
      "DELETE FROM table_answer WHERE answer_id = $1", [id])
    res.json("delete ok");// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
};
