import React, { Fragment, useState } from 'react'
import { IAllQuestions } from "@ts-react-express-starter/common";
import { Button, } from '@material-ui/core';

import { StoreContainer } from '../Store';

interface IQuestion {
  question_id: number;
  info: string;
  description: Array<object>;
}

interface IBody {
  info: string;
  description: any;
}

{/** 
  Component modal :EditQuestion
*/}
export default function EditQuestion(props: { question: IQuestion, setQuestions: any, questions: IQuestion[] }) {
  const unstated = StoreContainer.useContainer();
  const [info, setInfo] = useState<string>(props.question.info)
  const [description, setDescription] = useState<any>(props.question.description.toString())// problem cause the  response from the DB is a string and JSON.parse doesn't work , so be careful when update

  {/**  
    function updateQuestion(params) : info: string , description: string 
    edit the question with the 2 parameters in useState

    (note : server want an info:string, description: string[] - pb editing just display description in the form input)
    */}
  const updateQuestion = async (e: any) => {
    e.preventDefault();
    if (info.length < 255 && info.length > 0) {
      try {
        const body: IBody = { info: info, description: [description] }
        console.log("body", body);
        const updateQuestion = await fetch(`http://localhost:8081/api/q/${props.question.question_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        console.log("updated Questions : ", updateQuestion);
        // updating the page without using refresh window.location = "/" :P 
        let newQ: IQuestion[] = [...props.questions];
        let obj: IQuestion | undefined = newQ.find(q => q.question_id === props.question.question_id);
        if (obj) {
          let index: number = newQ.indexOf(obj)
          obj = {
            question_id: props.question.question_id,
            info: info,
            description: description,
          }
          newQ[index] = obj;
          props.setQuestions(newQ);
          unstated.getQuestions();
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert('title : min 1 / max 255 characters please');
    }
  }




  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      {/* <button type="button" className="btn btn-primary"  */}
      <Button variant="contained" color="primary"
        data-toggle="modal" data-target={`#id_question${props.question.question_id}`}>Edit
      </Button>
      {/* </button> */}

      {/* <!-- The Modal --> */}
      <div className="modal" id={`id_question${props.question.question_id}`}
        onClick={() => { setInfo(info); setDescription(description); }}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Questions (Admin)</h4>
              <button type="button" className="close" data-dismiss="modal"
                onClick={() => { setInfo(info); setDescription(description); }}>&times;</button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <label>Title (max 255 characters)</label>
              <input type='text' className='form-control' value={info} onChange={(e: any) => { setInfo(e.target.value); }} placeholder="title of survey" />
              <label>Your questions</label>
              <textarea rows={3} className='form-control mt-1' placeholder="your questions (json format) "
                value={description}// pb formating to solve when receiving data into string instead of an array, tried to change format in the props already ...
                onChange={(e: any) => { setDescription(e.target.value) }} />
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal"
                onClick={(e: any) => updateQuestion(e)}>Edit</button>
              <button type="button" className="btn btn-info" data-dismiss="modal"
                onClick={() => { setInfo(info); setDescription(description); }}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}




  // // problemn with JSON.parse : "[ {...},{...} ]" for ingecting in the initial state of description
  // const convertToJSON = (data: any) => {
  //   let res: object[] = [];
  //   {
  //     data ? data.map((e: any, index: number) => {
  //       try {
  //         res[index] = eval(e); // convert string to json !! spend 4 hours on it cause JSON.parse / stringify PB
  //       } catch (err) {
  //         console.error(err.message)
  //       }
  //     }) : ''
  //   }
  //   return (res);
  // }
