import React from 'react';
import { StoreContainer } from '../Store';
import Button from '@material-ui/core/Button';
import DisplayFormula from '../Questions/DisplayFormula';
import ResponseFormula from './ResponseFormula';
import { Link } from 'react-router-dom';

interface IQuestion {
  question_id: number;
  info: string;
  description: Array<object>;
}

export default function ChooseQuestions(props: { formula: number, setFormula: any }) {
  const unstated = StoreContainer.useContainer();
  const [choiceQuestions, setChoiceQuestions] = React.useState<number>(0)
  const [allQuestions, setAllQuestions] = React.useState<IQuestion[]>(unstated.questions)
  const [questions, setQuestions] = React.useState<IQuestion>({})
  const [activeStep, setActiveStep] = React.useState<number>(0);


  {/*
    function handleNext() : Next Formula
    increment the number of the current formula (max limitation)
  */}
  const handleNext = () => {
    if (activeStep < allQuestions.length - 1) {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      setChoiceQuestions(activeStep);
      props.setFormula(props.formula + 1)
    }
  };

  {/*
    function handleBack() : Back Formula
    increment the number of the current formula (max limitation)
  */}
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
      setChoiceQuestions(activeStep);
      props.setFormula(props.formula - 1)
    }
  };

  {/*
    setter allQuestions
    at the loading
  */}
  React.useEffect(() => {
    unstated.getQuestions();
    setAllQuestions(unstated.questions)
  }, [])

  {/*
    setter question 
    for props on changing activeStep (n° forumla)
  */}
  React.useEffect(() => {
    setQuestions(allQuestions[activeStep])
  }, [activeStep])
  return (
    <>
      <div>
        {allQuestions.length > 0 ?
          <header className='mb-2'>
            <h2>Please choose a form : </h2>
            <h3 className="text-secondary">Form : n°{activeStep + 1} / {allQuestions.length}</h3>
            <Button variant="contained" color="secondary" onClick={handleBack}>Previous</Button>
            <Button className="ml-1" variant="contained" color="secondary" onClick={handleNext}>Next</Button>
          </header>
          :
          <header >
            <h1>Create a forum of questions :</h1>
            <Link to="/question" >
              <Button variant="contained" color="primary" >Create Questions</Button>
            </Link>
          </header>
        }

        {allQuestions.length > 0 ?
          <span>
            <span>Preview : </span>
            <DisplayFormula questions={allQuestions[activeStep]} />
            <h3>Select your answer and go to next question : </h3>
            <ResponseFormula questions={unstated.questions[activeStep]} />
          </span>
          : <></>}


      </div>
    </>
  );
}
