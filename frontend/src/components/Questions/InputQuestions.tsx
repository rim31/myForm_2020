import React, { useState, useEffect, Fragment } from 'react';
import { Button, FormControl, TextareaAutosize, Input, InputLabel, FormHelperText, TextField } from '@material-ui/core';
import { IAllQuestions } from "@ts-react-express-starter/common";

interface IBody {
  info: string;
  description: any;
}

export default function InputQuestion(props: any) {
  const [description, setDescription] = useState<any>("")
  const [info, setInfo] = useState<string>("")

  {/*
    function onSubmitQuestion() : save question to DB
    backend need info:string and description : string[]
    TODO : URL in .env
   */}
  const onSubmitQuestion = async (e: any) => {
    e.preventDefault();
    if (info.length < 255 && info.length > 0) {
      try {
        const body: IBody = { info: info, description: [description] };
        const response: any = await fetch("http://localhost:8081/api/q", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        window.location = "/"; // return to the homepage to answer,TODO to change like with EditQuestion  to have a nice refresh
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert('title : min 1 / max 255 characters please');
    }
  };

  return (
    <Fragment>
      <FormControl className="d-flex" onSubmit={onSubmitQuestion}>
        <label>Title</label>
        <TextField className="mb-1 mt-1" id="outlined-basic" label="Title of your form (max 255 characters)" variant="outlined" value={info} onChange={(e: any) => setInfo(e.target.value)} />
        <label>Questions(json format)</label>
        <TextareaAutosize className="mb-1" variant="outlined" aria-label="minimum height" rowsMin={4} placeholder="insert your questions (json format)"
          value={description} onChange={(e: any) => setDescription(e.target.value)} />
        <FormHelperText id="my-helper-text">JSON format please</FormHelperText>
        <Button type="submit" onClick={onSubmitQuestion}
          variant="contained" color="primary">Submit</Button>
      </FormControl>

      <h2>example question format json</h2>
      <pre style={{ border: true, backgroundColor: "grey" }}>
        <code>
          {`
          [
              {
            label: "How are you feeling at work?",
                choices: [
                  {label: "Terrible", value: 1 },
                  {label: "Not good", value: 2 },
                  {label: "OK", value: 3 },
                  {label: "Good", value: 4 },
                  {label: "Great, I love my work", value: 5 },
                ],
              },
              {
            label: "Is it clear what you should focus on and prioritize?",
                choices: [
                  {label: "I have no idea", value: 1 },
                  {label: "I'm uncertain about my goals", value: 2 },
                  {label: "Partly yes, partly no", value: 3 },
                  {label: "Mostly yes", value: 4 },
                  {label: "I know exactly what to do", value: 5 },
                ],
              },
              {
            label: "Do you feel safe to disagree or voice your concerns at work?",
                choices: [
                  {label: "Almost never", value: 1 },
                  {label: "Rarely", value: 2 },
                  {label: "Sometimes yes, sometimes no", value: 3 },
                  {label: "Yes, typically", value: 4 },
                  {label: "Yes, almost always", value: 5 },
                ],
              },
            ]`}
        </code>
      </pre>
    </Fragment>
  );
}
