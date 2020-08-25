import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function Accordeon(props: { questions: any }) {
  const classes = useStyles();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={'>'}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.questions ? props.questions.info : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>


            {props.questions ?
              <div>
                <p style={{ size: '20px' }}>id : {props.questions.question_id} - {props.questions.info}</p>
                <div>
                  {props.questions.description ? props.questions.description.map((e: any, ind: number) => {
                    let tmp: any = eval(e);
                    let numberAnswersPossible: number = 0;
                    // console.log("tmp", ind, tmp);
                    return (<div key={ind}>
                      {tmp.map((a: any, ii: number) => {
                        return (<div key={ii}><h4>{ii + 1} -  {a.label}</h4>
                          {a.choices.length > 0 ? a.choices.map((b: any, iii: number) => {
                            numberAnswersPossible++;
                            return (<p key={iii}><em>{b.value}- {b.label}</em></p>)
                          }) : ''}
                        </div>)
                      }
                      )}
                      <p style={{ size: '16px' }} className='mb-5'>{numberAnswersPossible} answers possibles</p>
                    </div>)
                  }) : ""}
                </div>
              </div>
              : ""}

          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>

  );
}
