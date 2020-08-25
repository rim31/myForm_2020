import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MyQuestion from './MyQuestion';

type QuestionChoice = {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
}

interface Question {
  label: string;
  choices: QuestionChoice[];
}

const questions: Question[] = [
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

export default function Questions() {
  const [value, setValue] = React.useState<Question[]>(questions)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    console.log(questions)
  }, [])
  return (
    <>
      <div>
        {questions.map((question: Question, i: number) => <div key={i}>
          <MyQuestion question={question}>
        </div>)}
      </div>
    </>
  )
}
