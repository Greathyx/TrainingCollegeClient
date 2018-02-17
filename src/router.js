import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import TraineeRegisterPage from './routes/trainee/TraineeRegisterPage';
import TraineeLoginPage from './routes/trainee/TraineeLoginPage';
import TraineeMainPage from './routes/trainee/TraineeMainPage';
import TraineeChooseCourseWithClassPage from './routes/trainee/TraineeChooseCourseWithClassPage';
import TraineeChooseCourseWithoutClassPage from './routes/trainee/TraineeChooseCourseWithoutClassPage';
import TraineeNotPaidOrdersPage from './routes/trainee/TraineeNotPaidOrdersPage';
import TraineePaidPage from './routes/trainee/TraineePaidPage';
import TraineeVipCenterPage from './routes/trainee/TraineeVipCenterPage';
import TraineeEditInfoPage from './routes/trainee/TraineeEditInfoPage';

import InstitutionRegisterPage from './routes/institution/InstitutionRegisterPage';
import InstitutionLoginPage from './routes/institution/InstitutionLoginPage';
import InstitutionMainPage from './routes/institution/InstitutionMainPage';
import InstitutionReleaseCoursePage from './routes/institution/InstitutionReleaseCoursePage';
import InstitutionEditInfoPage from './routes/institution/InstitutionEditInfoPage';
import InstitutionCourseInfoPage from './routes/institution/InstitutionCourseInfoPage';

import SupervisorLoginPage from './routes/supervisor/SupervisorLoginPage';
import SupervisorMainPage from './routes/supervisor/SupervisorMainPage';
import SupervisorCheckRegisterPage from './routes/supervisor/SupervisorCheckRegisterPage';
import SupervisorCheckModifyPage from './routes/supervisor/SupervisorCheckModifyPage';

import Page404 from './routes/404Page';
import TestPage from './routes/TestPage';

function RouterConfig({history, app}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/homepage" exact component={HomePage}/>
        <Route path="/test" exact component={TestPage}/>
        <Route path="/SupervisorLogin" exact component={SupervisorLoginPage}/>
        <Route path="/TraineeRegister" exact component={TraineeRegisterPage}/>
        <Route path="/TraineeLogin" exact component={TraineeLoginPage}/>
        <Route path="/InstitutionRegister" exact component={InstitutionRegisterPage}/>
        <Route path="/InstitutionLogin" exact component={InstitutionLoginPage}/>
        <Route path="/Trainee">
          <TraineeMainPage>
            <Switch>
              <Route path="/Trainee/ChooseCourseWithClass" exact restrict component={TraineeChooseCourseWithClassPage}/>
              <Route path="/Trainee/ChooseCourseWithoutClass" exact restrict component={TraineeChooseCourseWithoutClassPage}/>
              <Route path="/Trainee/NotPaidOrders" exact restrict component={TraineeNotPaidOrdersPage}/>
              <Route path="/Trainee/PaidOrders" exact restrict component={TraineePaidPage}/>
              <Route path="/Trainee/VipCenter" exact restrict component={TraineeVipCenterPage}/>
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
