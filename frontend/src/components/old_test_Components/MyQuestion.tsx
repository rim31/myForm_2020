import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Review from '../Answers/Review';

type QuestionChoice = {
  idQuestion: number;
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function MyQuestion() {
  const classes = useStyles();
  const [state, setState] = React.useState<Question[]>(questions)
  const [respQuestion, setResQuestion] = React.useState<QuestionChoice[]>([])
  const [value, setValue] = React.useState('female');
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const nextQuestion = () => {
    respQuestion(...respQuestion, { idQuestion: respQuestion.idQuestion + 1 });
  };

  const handleChange = (event) => {
    setValue(...value, event.target.value);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MyQuestion />;
      case 1:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  React.useEffect(() => {
    console.log(questions)
  }, [])
  return (
    <>
      <div>
        {questions.map((question: Question, i: number) =>
          <div key={i}>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold' }}>{question.label}</FormLabel>
              <RadioGroup aria-label="question" name={question.label} value={value} onChange={handleChange}>
                <div>
                  {question.choices.map((choice: QuestionChoice, index: number) =>
                    <div key={index}>
                      <FormControlLabel value={choice.label} control={<Radio />} label={choice.label} />
                    </div>
                  )}
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        )}
      </div>

      {/* <React.Fragment>
        {getStepContent(activeStep)}
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        </div>
      </React.Fragment> */}

    </>
  )
}
