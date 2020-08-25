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
      <div className="text-center">
        <h2 className="page-section-heading mb-0 d-inline-block">List Questions Section</h2>
      </div>
      <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-list-ol fa-3x mb-2"></i></div>
      <div className="col-md-12 col-lg-12 mb-12 justify-content-center h-100 w-100 pt-3 pb-3" style={{ backgroundColor: '#58B19F', borderRadius: '8px' }}>

        {/* <h1>List of Questions</h1> */}
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
                <td className="text-left"> {i} - {question.info}</td>
                <td><DisplayFormula questions={unstated.questions[i]} /></td>
                <td><EditQuestion question={question} setQuestions={setQuestions} questions={questions} /></td>
                <td><button className='btn btn-danger' onClick={() => deleteQuestion(question.question_id)}>Delete</button></td>
              </tr>
            )) : <tr></tr>}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}
