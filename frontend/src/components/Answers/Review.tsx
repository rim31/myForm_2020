import React from 'react';
import { StoreContainer } from '../Store';
import DisplayFormula from '../Questions/DisplayFormula';

interface IAnswer {
  answer_id: number;
  info: string;
  description: object[]
}

export default function Review() {
  const unstated = StoreContainer.useContainer();
  const [allAnswers, setAllAnswers] = React.useState<object[]>(unstated.answers)
  const [allQuestions, setAllQuestions] = React.useState<object[]>(unstated.questions)
  let formula: object[] = [];

  const smiley = (i: number) => {
    switch (i) {
      case 1:
        return "😫"
      case 2:
        return "🙁"
      case 3:
        return "😐"
      case 4:
        return "🙂"
      case 5:
        return "😃"
      default:
        return 'oho'
    }
  }

  React.useEffect(() => {
    unstated.getAnswers();
    unstated.getQuestions();
    setAllAnswers(unstated.answers)
    setAllQuestions(unstated.questions)
  }, [])

  return (
    <>
      <h1>Answers : {allAnswers.length} - Questions : {allQuestions.length}</h1>
      <h2 style={{ color: 'blue' }}>Questions summary</h2>
      {allQuestions.map((question: any, i: number) => {
        // if (question.description !== undefined) {
        //   question.description.map((e: any, index: number) => {
        //     console.log("map", index, eval(e));
        //     formula[index] = eval(e); // convert string to json !! spend 4 hours on it cause JSON.parse / stringify PB
        //   })
        // }
        // console.log("form", formula);
        return (
          <DisplayFormula key={i} questions={question} />
          // <div key={i}> <h3>id : {question.question_id} - {question.info}</h3>
          //   <div>
          //     {question.description ? question.description.map((e: any, ind: number) => {
          //       let tmp: any = eval(e);
          //       let numberAnswersPossible: number = 0;
          //       // console.log("tmp", ind, tmp);
          //       return (<div key={ind}>
          //         {tmp.map((a: any, ii: number) => {
          //           return (<div key={ii}><h4>{ii + 1} -  {a.label}</h4>
          //             {a.choices.length > 0 ? a.choices.map((b: any, iii: number) => {
          //               numberAnswersPossible++;
          //               return (<p key={iii}><em>{b.value}- {b.label}</em></p>)
          //             }) : ''}
          //           </div>)
          //         }
          //         )}
          //         <h5 className='mb-5'>{numberAnswersPossible} answers possibles</h5>
          //       </div>)
          //     }) : ""}
          //   </div>
          // </div>
        )
      }
      )}
      <h2 style={{ color: 'green' }}>Answers summary</h2>
      {allAnswers.map((answer: IAnswer, i: number) => {
        // console.log("++info++", answer.info);
        // console.log("++description++", answer.description);
        return (<div key={i}>Response n°  {answer.answer_id} | Formula n° {answer.info}
          {/* info : {typeof (answer.info)} description : {typeof (answer.description)}| {answer.description ? answer.description.length:0} | {answer.description} | */}
          {answer.description ?
            answer.description.map((data: any, id: number) => <p key={id} style={{ color: 'grey' }}> {id} => {typeof ((data))}  {typeof (JSON.parse(data))} {JSON.parse(data).question} -> answer : {JSON.parse(data).answer} {smiley(JSON.parse(data).answer)} - {JSON.parse(data).label}</p>)
            : "..."}
        </div>
        )
      }
      )}
    </>
  );
}