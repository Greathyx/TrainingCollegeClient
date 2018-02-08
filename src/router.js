import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import SupervisorLoginPage from './routes/SupervisorLoginPage';
import TraineeRegisterPage from './routes/TraineeRegisterPage';
import TraineeLoginPage from './routes/TraineeLogin';
import InstitutionRegisterPage from './routes/InstitutionRegisterPage';
import SupervisorMainPage from './routes/SupervisorMainPage';
import SupervisorCheckPage from './routes/SupervisorCheckPage';
import Page404 from './routes/404Page';


function RouterConfig({history, app}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/homepage" exact component={HomePage}/>
        <Route path="/SupervisorLogin" exact component={SupervisorLoginPage}/>
        <Route path="/TraineeRegister" exact component={TraineeRegisterPage}/>
        <Route path="/TraineeLogin" exact component={TraineeLoginPage}/>
        <Route path="/InstitutionRegister" exact component={InstitutionRegisterPage}/>
        <Route path="/Supervisor">
          <SupervisorMainPage>
            <Switch>
              <Route path="/Supervisor/Check" exact restrict component={SupervisorCheckPage}/>
            </Switch>
          </SupervisorMainPage>
        </Route>
        <Route path='*' exact component={Page404}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
