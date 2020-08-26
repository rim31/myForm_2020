import React from 'react';

{/*
  COMPONENT modal : Display formula
  depending on the props questions
  (note : JSON.parse note working well because of the response of the DB, despite ::json or format of data : varchar or text[])
  [{
    question_id: number;
    info: string;
    description: object[]
  }]
*/}
export default function DisplayFormula(props: { questions: any }) {

  {/**
    function answersPossible(questions: any) : count the number of possible answer
   */}
  const answersPossible = () => {
    let res: number = 0;
    if (props.questions.description) {
      props.questions.description.map((e: any) => {
        let tmp: any;
        try {
          tmp = eval(e);
        } catch (err) {
          console.error(err.message); // can throw a specific error , but just display in console.error
          return 0;
        }
        if (tmp)
          tmp.map((a: any) => { res = res + a.choices.length })
      })
      return (res);
    }
    else {
      return 0;
    }
  }



  return (
    <div className='text-dark'>
      {props.questions ?
        <p>
          <button className="btn btn-secondary" type="button" data-toggle="collapse" data-target={`#collapse${props.questions.question_id}`} aria-expanded="false" aria-controls="collapse">
            n° : {props.questions.question_id} - Q/A {answersPossible(props.questions.description)}
          </button>
        </p>
        : <></>}

      {props.questions ?
        <div className="collapse" id={`collapse${props.questions.question_id}`}>
          <div className="card card-body" style={{ backgroundColor: 'whitesmoke' }}>
            {props.questions ?
              <div>
                <h3>n° : {props.questions.question_id} - {props.questions.info}</h3>
                <div>
                  {props.questions.description ? props.questions.description.map((e: any, ind: number) => {
                    let tmp: any;
                    try {
                      tmp = eval(e);
                    } catch (err) {
                      console.error(err.message);
                    }
                    let numberAnswersPossible: number = 0;
                    return (<div key={ind}>
                      {tmp ? tmp.map((a: any, ii: number) => {
                        return (<div key={ii}><h4>{ii + 1} -  {a.label}</h4>
                          {a.choices ? a.choices.map((b: any, iii: number) => {
                            numberAnswersPossible++;
                            return (<p key={iii}><em>{b.value}- {b.label}</em></p>)
                          }) : ''}
                        </div>)
                      }
                      ) : ""}

                      <h5 className='mb-5'>{numberAnswersPossible} answers possibles</h5>
                    </div>)
                  }) : ""}
                </div>
              </div>
              : ""}

          </div>
        </div>
        : <></>}

    </div>

  );
}
