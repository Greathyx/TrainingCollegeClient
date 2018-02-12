import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import TraineeRegisterPage from './routes/TraineeRegisterPage';
import TraineeLoginPage from './routes/TraineeLoginPage';
import TraineeMainPage from './routes/TraineeMainPage';
import TraineeEditInfoPage from './routes/TraineeEditInfoPage';

import InstitutionRegisterPage from './routes/InstitutionRegisterPage';
import InstitutionLoginPage from './routes/InstitutionLoginPage';
import InstitutionMainPage from './routes/InstitutionMainPage';
import InstitutionReleaseCoursePage from './routes/InstitutionReleaseCoursePage';
import InstitutionEditInfoPage from './routes/InstitutionEditInfoPage';
import InstitutionCourseInfoPage from './routes/InstitutionCourseInfoPage';

import SupervisorLoginPage from './routes/SupervisorLoginPage';
import SupervisorMainPage from './routes/SupervisorMainPage';
import SupervisorCheckRegisterPage from './routes/SupervisorCheckRegisterPage';
import SupervisorCheckModifyPage from './routes/SupervisorCheckModifyPage';

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
        <Route path="/InstitutionLogin" exact component={InstitutionLoginPage}/>
        <Route path="/Trainee">
          <TraineeMainPage>
            <Switch>
              <Route path="/Trainee/EditInfo" exact restrict component={TraineeEditInfoPage}/>
            </Switch>
          </TraineeMainPage>
        </Route>
        <Route path="/Institution">
          <InstitutionMainPage>
            <Switch>
              <Route path="/Institution/ReleaseCourse" exact restrict component={InstitutionReleaseCoursePage}/>
              <Route path="/Institution/CourseInfo" exact restrict component={InstitutionCourseInfoPage}/>
              <Route path="/Institution/EditInfo" exact restrict component={InstitutionEditInfoPage}/>
            </Switch>
          </InstitutionMainPage>
        </Route>
        <Route path="/Supervisor">
          <SupervisorMainPage>
            <Switch>
              <Route path="/Supervisor/CheckRegister" exact restrict component={SupervisorCheckRegisterPage}/>
              <Route path="/Supervisor/CheckModify" exact restrict component={SupervisorCheckModifyPage}/>
            </Switch>
          </SupervisorMainPage>
        </Route>
        <Route path='*' exact component={Page404}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
