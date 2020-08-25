import React from 'react';
import ChooseQuestions from './ChooseQuestions';
import { StoreContainer } from '../Store';

type QuestionChoice = {
  id: number;
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
  answer: number;
  question: string;
}

interface IResp {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
}

interface Question {
  question_id: number;
  label: string;
  choices: QuestionChoice[];
}

const questionsDemo: Question[] = [
  {
    label: "How are you feeling at work?",
    choices: [
      { label: "Terrible", value: 1 },
      { label: "Not good", value: 2 },
      { label: "OK", value: 3 },
      { label: "Good", value: 4 },
      { label: "Great, I love my work", value: 5 },
    ],
  },
  {
    label: "Is it clear what you should focus on and prioritize?",
    choices: [
      { label: "I have no idea", value: 1 },
      { label: "I'm uncertain about my goals", value: 2 },
      { label: "Partly yes, partly no", value: 3 },
      { label: "Mostly yes", value: 4 },
      { label: "I know exactly what to do", value: 5 },
    ],
  },
  {
    label: "Do you feel safe to disagree or voice your concerns at work?",
    choices: [
      { label: "Almost never", value: 1 },
      { label: "Rarely", value: 2 },
      { label: "Sometimes yes, sometimes no", value: 3 },
      { label: "Yes, typically", value: 4 },
      { label: "Yes, almost always", value: 5 },
    ],
  },
];

interface IAnswer {
  info: string;
  description: QuestionChoice[];
}

export default function Answer() {
  const unstated = StoreContainer.useContainer();
  const [allAnswers, setAllAnswers] = React.useState<object[]>(unstated.answers)
  const [allQuestions, setAllQuestions] = React.useState<object[]>(unstated.questions)
  const [info, setInfo] = React.useState<object[]>()
  const [formula, setFormula] = React.useState<number>(0);
  const [questions, setQuestions] = React.useState<Question[]>(questionsDemo)

  // ===== stating to fetch in Store =====
  React.useEffect(() => {
    unstated.getAnswers();
    unstated.getQuestions();
    setAllAnswers(unstated.answers)
    setAllQuestions(unstated.questions)

  }, [])


  React.useEffect(() => {
    if (unstated.questions && formula)
      setQuestions(unstated.questions[formula])
  }, [formula, unstated.questions])


  return (
    <div className="container">
      <div className="text-center">
        <h2 className="page-section-heading mb-0 d-inline-block">Answer Section</h2>
      </div>
      <div className="portfolio-item-caption-content text-center text-white"><i className="far fa-comment-dots fa-3x mb-2"></i></div>
      <div className="col-md-12 col-lg-12 mb-12 justify-content-center h-100 w-100 pt-3 pb-3" style={{ backgroundColor: '#58B19F', borderRadius: '8px' }}>
        <ChooseQuestions formula={formula} setFormula={setFormula} />
      </div>
    </div>


    // </div>
  )
}
