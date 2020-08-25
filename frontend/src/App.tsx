import * as React from "react";
import { getHelloWorld, getQuestions, getAnswers } from "./api";
// import { IAllAnswers } from "@ts-react-express-starter/common";
// import interfaces from '../../common/src/interfaces'
// import { questions } from '../../common/src/questions'
const { useState, useEffect } = React;
// import MyQuestion from './components/MyQuestion';
import Layout from './components/layout/Layout';
import Review from './components/Answers/Review';
import Answer from './components/Answers/Answer';
import InputQuestions from './components/Questions/InputQuestions';
import ListQuestions from './components/Questions/ListQuestions';
import { StoreContainer } from "./components/Store"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FunctionComponent = () => {
  const [serverMessage, setServerMessage] = useState<string>("Calling backend...");
  // const [serverQuestions, setServerQuestions] = useState<any>([]);
  // const [serverAnswers, setServerAnswers] = useState<any>([]);

  useEffect(() => {
    getHelloWorld().then(json => setServerMessage(json.message));

  }, []);
  // useEffect(() => {
  //   getQuestions().then(json => setServerQuestions(json));
  //   getAnswers().then(json => setServerAnswers(json));
  //   console.log(serverQuestions);
  // }, []);

  return (
    <Router>
      <StoreContainer.Provider>
        <Layout className="App">
          <div className="container">
            <h1>Hello From React!</h1>
            <p>{serverMessage}</p>
            <Switch>
              <Route exact path={'/'} component={(serverMessage: any) => <Answer {...serverMessage} />} />
              <Route exact path={'/answer'} component={Answer} />
              <Route exact path={'/review'} component={Review} />
              <Route exact path={'/question'} component={InputQuestions} />
              <Route exact path={'/listquestions'} component={ListQuestions} />
              <Route path={'*'} ><NotFound /></Route>
            </Switch>
          </div>
        </Layout>
      </StoreContainer.Provider>
    </Router >
  );
};

function NotFound() {
  return (
    <h1>Page Not Found</h1>
  )
}

export default App;