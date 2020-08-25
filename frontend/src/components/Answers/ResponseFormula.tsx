import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { StoreContainer } from '../Store';


export default function ResponseFormula(props: { questions: any }) {
  const unstated = StoreContainer.useContainer();
  const [respQuestion, setResQuestion] = React.useState<QuestionChoice[]>([]) // Result of question to save in DB
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [value, setValue] = React.useState<number | undefined>(respQuestion[activeStep] ? respQuestion[activeStep].answer : '');// if reload a answer formula from db
  const [questions, setQuestions] = React.useState<any>(props.questions)

  {/*
    function handleNext() : go to next question 
    and save locally the value of the current answer
    limitation max
  */}
  const handleNext = () => {
    if (activeStep < questions[0].length - 1 && respQuestion[activeStep]) {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      setValue(respQuestion[activeStep] ? respQuestion[activeStep].label : "");
    } else {
      alert('please select an answer');
    }
  };

  {/*
    function handleSave() : save the answers at the last question 
    and save locally the value of the current answer
    can limit only on max question filled 
  */}
  const handleSave = () => {
    const answer: any = { info: props.questions.question_id, description: respQuestion };
    unstated.postAnswer(answer);
    unstated.getAnswers();
    alert("Thank You :-)")
  };

  {/*
    function handleBack() : go to previous question 
    and save locally the value of the current answer
    limitation max
  */}
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
      setValue(respQuestion[activeStep] ? respQuestion[activeStep].label : "");
    }
  };

  {/*
    function handleChange() : saving on click the answer localy in the array respQuestion
    whe click on an answer
  */}
  const handleChange = (event) => {
    let resp: IResp | undefined = questions[0][activeStep].choices.find((i: any) => i.label === event.target.value)
    if (resp) {
      let newResp: QuestionChoice[] = [...respQuestion];
      newResp[activeStep] = {
        id: activeStep,
        label: resp.label,
        answer: resp.value,
        question: questions[0][activeStep].label,
        value: resp.value
      }
      setResQuestion(newResp);
    }
    setValue(event.target.value);
  };

  {/*
    setter Formula : on change of the parent component with setQuestions()
    reset answer with a new formula on change of formula also
  */}
  React.useEffect(() => {
    let tmp: object[] = [];
    setResQuestion([]);
    setActiveStep(0);
    if (props.questions) {
      props.questions.description.map((e: any, i: number) => {
        try {
          tmp[i] = eval(e);
        } catch (err) {
          console.error(err)
        }
      })
      setQuestions(tmp);
    }
  }, [props]);

  return (
    <div>
      {questions ?
        <FormControl component="fieldset">
          {questions ?
            <div>
              {props.questions ?
                <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold' }}>id : {props.questions.question_id} - {props.questions.info}</FormLabel>
                : ''}
              <div>
                {questions[0] ?
                  <div>
                    <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold' }}>  {questions[0][activeStep].label}</FormLabel>
                    <RadioGroup aria-label="question" name={questions[0][activeStep].label} value={value} onChange={handleChange}>
                      {questions[0][activeStep].choices ?
                        questions[0][activeStep].choices.map((b: any, iii: number) => {
                          return (<div key={iii}>
                            <FormControlLabel value={b.label}
                              checked={respQuestion[activeStep] ? respQuestion[activeStep].label === b.label : false}
                              control={<Radio />} label={b.label} />
                          </div>)
                        }) : ''}
                    </RadioGroup>

                    <header >
                      <h1>STEP : {activeStep + 1} / {questions[0].length}</h1>
                      <Button variant="contained" color="primary" onClick={handleBack}>Previous</Button>
                      {activeStep === questions[0].length - 1 ?
                        <Button className="ml-1" variant="contained" color="primary" onClick={handleSave}>Save</Button>
                        :
                        <Button className="ml-1" variant="contained" color="primary" onClick={handleNext}>Next</Button>
                      }
                    </header>
                  </div>
                  : ""}
              </div>
            </div>
            : ""}
        </FormControl>
        : <></>}
    </div>
  );
}
