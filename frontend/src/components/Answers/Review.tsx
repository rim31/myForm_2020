import React from 'react';
import { StoreContainer } from '../Store';
import DisplayFormula from '../Questions/DisplayFormula';
import MyCharts from './MyCharts';
import { IAnswer } from "@ts-react-express-starter/common";


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

  {/**
    debug
  */}
  React.useEffect(() => {
    // console.log("Reviews  allAnswers", allAnswers);
  }, [allAnswers])


  return (
    <div>
      <div className="text-center">
        <h2 className="page-section-heading mb-0 d-inline-block">Reviews Section</h2>
      </div>
      <div className="portfolio-item-caption-content text-center text-white"><i className="far fa-chart-bar fa-3x mb-2"></i></div>
      <div className="col-md-12 col-lg-12 mb-12 justify-content-center h-100 w-100 pt-3 pb-3" style={{ backgroundColor: '#58B19F', borderRadius: '8px' }}>


        <h1>Answers : {unstated.answers.length} - Questions : {unstated.questions.length}</h1>
        <h2 style={{ color: 'blue' }}>Questions summary</h2>
        {allQuestions.map((question: any, i: number) => {
          return (
            <DisplayFormula key={i} questions={question} />
          )
        }
        )}
        <h2 style={{ color: 'green' }}>Answers summary</h2>

        <MyCharts results={unstated.answers} />

        {unstated.answers.map((answer: IAnswer, i: number) => {
          return (<div key={i}>
            <span style={{ fontWeight: 'bold' }}>Response n°  {answer.answer_id} | Formula n° {answer.info}</span>
            {answer.description ?
              answer.description.map((data: any, id: number) => <p key={id} style={{ color: 'whitesmoke', fontStyle: 'italic' }}> {id} - {JSON.parse(data).question} -> answer : {JSON.parse(data).answer} {smiley(JSON.parse(data).answer)} - {JSON.parse(data).label}</p>)
              : "..."}
          </div>
          )
        }
        )}
      </div>
    </div>
  );
}