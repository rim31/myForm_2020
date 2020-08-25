import { Request, Response } from "express";
const pool = require('../../db');

{/**
format data model: 
answer {
  answer_id: number; (primary key)
  info: string; (for id of form questions)
  description: object[];
}
*/}

// ======== create a Answer  =======
// app.post("/api", async (req, res) => {
export const postAnswer = async (req: Request, res: Response) => {
  try {
    const info: string = req.body.info;
    let description: any = req.body.description;
    const newAnswers: any = await pool.query(
      "INSERT INTO table_answer (info, description) VALUES($1, $2) RETURNING *",// returning back the data, $1 is a placeholder for the info area, and the 2nd argument is for this placeholder
      [info, description]);
    res.json(newAnswers.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};


// ======== get all Answers  ==========
// app.get("/api", async (req, res) => {
export const getAnswers = async (req: Request, res: Response) => {
  try {
    const allAnswers: any = await pool.query(
      "SELECT * FROM table_answer");// returning back the data
    res.json(allAnswers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// ======== get a Answer =======
// app.get("/api/:id", async (req, res) => {
export const getAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Answer: any = await pool.query(
      "SELECT * FROM table_answer WHERE answer_id = $1", [id])
    res.json(Answer.rows);
  } catch (err) {
    console.error(err.message);
  }
};


// ======== update a Answer ========
// app.put("/api/:id", async (req, res) => {
export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const info: string = req.body.info;
    let description: any = req.body.description;
    console.log(description)
    const updateAnswer: any = await pool.query(
      "UPDATE table_answer SET info = $1, description = $2 WHERE answer_id = $3",
      [info, description, id]
    );
    res.json("update ok");
  } catch (err) {
    console.error(err.message);
  }
};

// ======== delete a Answer ======== 
// app.delete("/api/:id", async (req, res) => {
export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteAnswer: any = await pool.query(
      "DELETE FROM table_answer WHERE answer_id = $1", [id])
    res.json("delete ok");
  } catch (err) {
    console.error(err.message);
  }
};
