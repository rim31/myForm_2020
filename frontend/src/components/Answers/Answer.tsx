import React from 'react';
import ChooseQuestions from './ChooseQuestions';
import { StoreContainer } from '../Store';

export default function Answer() {
  const unstated = StoreContainer.useContainer();
  const [formula, setFormula] = React.useState<number>(0);

  // ===== stating to fetch in Store =====
  React.useEffect(() => {
    unstated.getAnswers();
    unstated.getQuestions();
  }, [])

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="page-section-heading mb-0 d-inline-block">Answer Section</h2>
      </div>
      <div className="portfolio-item-caption-content text-center text-white"><i className="far fa-comment-dots fa-3x mb-2"></i></div>
      <div className="col-md-12 col-lg-12 mb-12 justify-content-center h-100 w-100 pt-3 pb-3" style={{ backgroundColor: '#58B19F', borderRadius: '8px' }}>
        <ChooseQuestions formula={formula} setFormula={setFormula} />
      </div>
    </div>
  )
}
