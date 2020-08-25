import React, { Fragment, useState } from 'react'
import EditQuestion from './EditQuestion';
// import { IAllQuestion } from "@ts-react-express-starter/common";
import DisplayFormula from '../Questions/DisplayFormula';
import { StoreContainer } from '../Store';

interface IQuestion {
  question_id: number;
  info: string;
  description: Array<object>;
}

{/**
COMPONENT ListQuestions : list of the questions in a table
TABLE where you can PREVIEW, EDIT and DELETE
*/}
export default function ListQuestions(props: any) {
  const unstated = StoreContainer.useContainer();
  const [questions, setQuestions] = useState<IQuestion[]>(props ? props.question : []);

  {/**
  function deleteQuestion(id:number) : delete a question with the id given
   DELETE : function delete a question from the server
  probably need a modal : 'are you sure ?'
*/}
  const deleteQuestion = async (id: number) => {
    try {
      const deleteQuestion = await fetch(`http://localhost:8081/api/q/${id}`, {
        method: "DELETE"
      });
      const newQuestion: IQuestion[] = questions.filter(question => question.question_id !== id)
      setQuestions(newQuestion);
      unstated.getQuestions();
    } catch (err) {
      console.error(err.message);
    }
  };

  {/**
  function getQuestions() : getter of all questions
   GETTER : function get all questions from the server
   also present in the Store unstated 
*/}
  const getQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/q");
      const json = await response.json();
      setQuestions(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  // getting all questions on loading this component
  React.useEffect(() => {
    getQuestions();
  }, [])

  return (
    <Fragment>
      <h1>List of Questions</h1>
      <table className="table mt-2 text-center">
        <thead>
          <tr>
            <th>Info</th>
            <th>Results</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {questions ? questions.map((question: IQuestion, i: number) => (
            <tr key={question.question_id}>
              <td> {question.question_id} {question.info}</td>
              <td><DisplayFormula questions={unstated.questions[i]} /></td>
              <td><EditQuestion question={question} setQuestions={setQuestions} questions={questions} /></td>
              <td><button className='btn btn-danger' onClick={() => deleteQuestion(question.question_id)}>Delete</button></td>
            </tr>
          )) : <tr></tr>}
        </tbody>
      </table>
    </Fragment>
  )
}
