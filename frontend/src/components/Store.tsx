// eslint-disable-next-line
import * as React from 'react';
import { createContainer } from "unstated-next";
import moment from 'moment';
import _ from 'lodash';


interface IQuestion {
  question_id: number;
  info: string;
  description: Array<object>;
}

type QuestionChoice = {
  id: number;
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
  answer: number;
  question: string;
}

interface IAnswers {
  answer_id: string;
  info: string;
  description: QuestionChoice[];
}

interface IAnswer {
  // answer_id: string;
  info: string;
  description: QuestionChoice[];
}

export const useStore = () => {
  const [answers, setAnswers] = React.useState<Object[] | IAnswers[]>(['from Store :  test']);
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const debug: boolean = true;

  // GETTER : function get all questions from the server
  const getQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/q");
      const json = await response.json();
      setQuestions(json);
    } catch (err) {
      console.error(err.message);
    }
  };
  // GETTER : function get all answers from the server
  const getAnswers = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/");
      const json = await response.json();
      setAnswers(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateAnswer = async (res: object[], id: number) => {
    try {
      const update = await fetch(`http://localhost:8081/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res)
      });
      console.log(update);
    } catch (err) {
      console.error(err.message);
    }
  }

  // const postAnswer = async (body: IAnswer) => {
  const postAnswer = async (body: any) => {
    try {
      const posted = await fetch(`http://localhost:8081/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(posted);
    } catch (err) {
      console.error(err.message);
    }
  }

  React.useEffect(() => {
    getAnswers;
    getQuestions;
  }, [])

  return {
    debug,
    answers,
    questions,
    getQuestions,
    getAnswers,
    updateAnswer,
    postAnswer
  };
}
export const StoreContainer = createContainer(useStore)