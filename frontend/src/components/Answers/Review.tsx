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
    <div>
      <div className="text-center">
        <h2 className="page-section-heading mb-0 d-inline-block">Reviews Section</h2>
      </div>
      <div className="portfolio-item-caption-content text-center text-white"><i className="far fa-chart-bar fa-3x mb-2"></i></div>
      <div className="col-md-12 col-lg-12 mb-12 justify-content-center h-100 w-100 pt-3 pb-3" style={{ backgroundColor: '#58B19F', borderRadius: '8px' }}>

        <h1>Answers : {allAnswers.length} - Questions : {allQuestions.length}</h1>
        <h2 style={{ color: 'blue' }}>Questions summary</h2>
        {allQuestions.map((question: any, i: number) => {
          return (
            <DisplayFormula key={i} questions={question} />
          )
        }
        )}
        <h2 style={{ color: 'green' }}>Answers summary</h2>
        {allAnswers.map((answer: IAnswer, i: number) => {
          return (<div key={i}>Response n°  {answer.answer_id} | Formula n° {answer.info}
            {answer.description ?
              answer.description.map((data: any, id: number) => <p key={id} style={{ color: 'whitesmoke' }}> {id} => {typeof ((data))}  {typeof (JSON.parse(data))} {JSON.parse(data).question} -> answer : {JSON.parse(data).answer} {smiley(JSON.parse(data).answer)} - {JSON.parse(data).label}</p>)
              : "..."}
          </div>
          )
        }
        )}
      </div>
    </div>
  );
}