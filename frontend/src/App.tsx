import * as React from "react";
import { getHelloWorld, getQuestions, getAnswers } from "./api";
const { useState, useEffect } = React;
import Layout from './components/layout/Layout';
import Review from './components/Answers/Review';
import Answer from './components/Answers/Answer';
import InputQuestions from './components/Questions/InputQuestions';
import ListQuestions from './components/Questions/ListQuestions';
import { StoreContainer } from "./components/Store"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FunctionComponent = () => {
  const [serverMessage, setServerMessage] = useState<string>("Calling backend...");

  useEffect(() => {
    getHelloWorld().then(json => setServerMessage(json.message));

  }, []);

  return (
    <Router>
      <StoreContainer.Provider>
        <div className="App" style={{ backgroundColor: "whitesmoke", height: '100%' }}>
          <Layout>
            <header className="App-header"
              style={{ backgroundColor: "#282c34", minHeight: '100vh', color: 'white' }}
            >
              <div className="container" >
                {/* <h1>Hello From React!</h1>
            <p>{serverMessage}</p> */}
                <Switch>
                  <Route exact path={'/'} component={(serverMessage: any) => <Answer {...serverMessage} />} />
                  <Route exact path={'/answer'} component={Answer} />
                  <Route exact path={'/review'} component={Review} />
                  <Route exact path={'/question'} component={InputQuestions} />
                  <Route exact path={'/listquestions'} component={ListQuestions} />
                  <Route path={'*'} ><NotFound /></Route>
                </Switch>
              </div>
            </header>
          </Layout>
        </div>


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