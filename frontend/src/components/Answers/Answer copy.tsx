import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ChooseQuestions from './ChooseQuestions';
// import Review from './Review';
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

interface IAnswer {
  info: string;
  description: QuestionChoice[];
}

export default function Answer() {
  const unstated = StoreContainer.useContainer();
  const [allAnswers, setAllAnswers] = React.useState<object[]>(unstated.answers)
  const [allQuestions, setAllQuestions] = React.useState<object[]>(unstated.questions)

  const [formula, setFormula] = React.useState<number>(0);
  const [respQuestion, setResQuestion] = React.useState<QuestionChoice[]>([]) // Result of question to save in DB
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [value, setValue] = React.useState<number | undefined>(respQuestion[activeStep] ? respQuestion[activeStep].answer : '');// if reload a answer formula from db

  const handleNext = () => {
    if (activeStep < questions.length - 1 && respQuestion[activeStep]) {
      console.log(respQuestion);// =========== DEBUG =============
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      setValue(respQuestion[activeStep] ? respQuestion[activeStep].label : "");
      console.log(value);// =========== DEBUG =============
    } else {
      alert('please select an answer');
    }
  };

  const handleSave = () => {
    // const answer: IAnswer = { info: formula, description: respQuestion };
    const answer: any = { info: respQuestion.toString(), description: respQuestion };
    unstated.postAnswer(answer);
    unstated.getAnswers();
    alert("Thank You :-)")
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
      setValue(respQuestion[activeStep] ? respQuestion[activeStep].label : "");
      console.log(value); // =========== DEBUG =============
    }
  };

  //  saving on click the answer localy in the array respQuestion
  const handleChange = (event) => {
    let resp: IResp | undefined = questions[activeStep].choices.find(i => i.label === event.target.value)
    if (resp) {
      let newResp: QuestionChoice[] = [...respQuestion];
      newResp[activeStep] = {
        id: activeStep,
        label: resp.label,
        answer: resp.value,
        question: questions[activeStep].label,
        value: resp.value
      }
      setResQuestion(newResp);
      // const answer: IAnswer = { info: formula, description: respQuestion };
      // unstated.postAnswer(answer);
    }
    console.log("respQuestion", respQuestion);// =========== DEBUG =============
    setValue(event.target.value);
    console.log(value);// =========== DEBUG =============

  };


  // React.useEffect(() => { // =========== DEBUG =============
  //   console.log(questions);// =========== DEBUG =============
  //   console.log(respQuestion[activeStep] ? respQuestion[activeStep].label : '');// =========== DEBUG =============
  // }, [respQuestion])

  // ===== TEST =====
  React.useEffect(() => {
    unstated.getAnswers();
    unstated.getQuestions();
    setAllAnswers(unstated.answers)
    setAllQuestions(unstated.questions)
    // console.log(unstated.answers)
    // console.log(unstated.questions)
    // console.log("all answers", allAnswers)
    // console.log("all questions", allQuestions)
    console.log(typeof (questions), questions.length, questions)
  }, [])

  return (
    <div >
      <div>
        <ChooseQuestions />
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold' }}>{questions[activeStep].label}</FormLabel>
          <RadioGroup aria-label="question" name={questions[activeStep].label} value={value} onChange={handleChange}>
            <div>
              {questions[activeStep].choices.map((choice: QuestionChoice, index: number) =>
                <div key={index}>
                  <FormControlLabel value={choice.label}
                    checked={respQuestion[activeStep] ? respQuestion[activeStep].label === choice.label : false}
                    control={<Radio />} label={choice.label} />
                </div>
              )}
            </div>
          </RadioGroup>
        </FormControl>
        <div>
          <header >
            <h1>STEP : {activeStep + 1} / {questions.length}</h1>
            <Button variant="contained" color="primary" onClick={handleBack}>Previous</Button>
            {activeStep === questions.length - 1 ?
              <Button className="ml-1" variant="contained" color="primary" onClick={handleSave}>Save</Button>
              :
              <Button className="ml-1" variant="contained" color="primary" onClick={handleNext}>Next</Button>}
          </header>
        </div>
      </div>

      {/* <Review /> */}

    </div>
  )
}
