import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import TraineeRegisterPage from './routes/trainee/TraineeRegisterPage';
import TraineeLoginPage from './routes/trainee/TraineeLoginPage';
import TraineeMainPage from './routes/trainee/TraineeMainPage';
import TraineeChooseCourseWithClassPage from './routes/trainee/TraineeChooseCourseWithClassPage';
import TraineeChooseCourseWithoutClassPage from './routes/trainee/TraineeChooseCourseWithoutClassPage';
import TraineeNotPaidOrdersPage from './routes/trainee/TraineeNotPaidOrdersPage';
import TraineePaidPage from './routes/trainee/TraineePaidOrdersPage';
import TraineeUnsubscribeOrdersPage from './routes/trainee/TraineeUnsubscribeOrdersPage';
import TraineeCourseRegistrationPage from './routes/trainee/TraineeCourseRegistrationPage';
import TraineeScoresPage from './routes/trainee/TraineeScoresPage';
import TraineeConsumptionStatisticsPage from './routes/trainee/TraineeConsumptionStatisticsPage';
import TraineeVipCenterPage from './routes/trainee/TraineeVipCenterPage';
import TraineeEditInfoPage from './routes/trainee/TraineeEditInfoPage';

import InstitutionRegisterPage from './routes/institution/InstitutionRegisterPage';
import InstitutionLoginPage from './routes/institution/InstitutionLoginPage';
import InstitutionMainPage from './routes/institution/InstitutionMainPage';
import InstitutionReleaseCoursePage from './routes/institution/InstitutionReleaseCoursePage';
import InstitutionCourseRegistrationPage from './routes/institution/InstitutionCourseRegistrationPage';
import InstitutionScoresRegistrationPage from './routes/institution/InstitutionScoresRegistrationPage';
import InstitutionConfirmPaymentPage from './routes/institution/InstitutionConfirmPaymentPage';
import InstitutionCourseInfoPage from './routes/institution/InstitutionCourseInfoPage';
import InstitutionBookedCoursesPage from './routes/institution/InstitutionBookedCoursesPage';
import InstitutionUnsubscribeCoursesPage from './routes/institution/InstitutionUnsubscribeCoursesPage';
import InstitutionEarningStatisticsPage from './routes/institution/InstitutionEarningStatisticsPage';
import InstitutionEditInfoPage from './routes/institution/InstitutionEditInfoPage';

import SupervisorLoginPage from './routes/supervisor/SupervisorLoginPage';
import SupervisorMainPage from './routes/supervisor/SupervisorMainPage';
import SupervisorCheckRegisterPage from './routes/supervisor/SupervisorCheckRegisterPage';
import SupervisorCheckModifyPage from './routes/supervisor/SupervisorCheckModifyPage';
import SupervisorInstitutionsInfoPage from './routes/supervisor/SupervisorInstitutionsInfoPage';
import SupervisorSettlePaymentPage from './routes/supervisor/SupervisorSettlePaymentPage';
import SupervisorEarningStatisticsPage from './routes/supervisor/SupervisorEarningStatisticsPage';

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
              <Route path="/Trainee/UnsubscribeOrders" exact restrict component={TraineeUnsubscribeOrdersPage}/>
              <Route path="/Trainee/CourseRegistration" exact restrict component={TraineeCourseRegistrationPage}/>
              <Route path="/Trainee/Scores" exact restrict component={TraineeScoresPage}/>
              <Route path="/Trainee/ConsumptionStatistics" exact restrict component={TraineeConsumptionStatisticsPage}/>
              <Route path="/Trainee/VipCenter" exact restrict component={TraineeVipCenterPage}/>
              <Route path="/Trainee/EditInfo" exact restrict component={TraineeEditInfoPage}/>
            </Switch>
          </TraineeMainPage>
        </Route>
        <Route path="/Institution">
          <InstitutionMainPage>
            <Switch>
              <Route path="/Institution/ReleaseCourse" exact restrict component={InstitutionReleaseCoursePage}/>
              <Route path="/Institution/CourseRegistration" exact restrict component={InstitutionCourseRegistrationPage}/>
              <Route path="/Institution/ScoresRegistration" exact restrict component={InstitutionScoresRegistrationPage}/>
              <Route path="/Institution/ConfirmPayment" exact restrict component={InstitutionConfirmPaymentPage}/>
              <Route path="/Institution/CourseInfo" exact restrict component={InstitutionCourseInfoPage}/>
              <Route path="/Institution/BookedCourses" exact restrict component={InstitutionBookedCoursesPage}/>
              <Route path="/Institution/UnsubscribeCourses" exact restrict component={InstitutionUnsubscribeCoursesPage}/>
              <Route path="/Institution/EarningStatistics" exact restrict component={InstitutionEarningStatisticsPage}/>
              <Route path="/Institution/EditInfo" exact restrict component={InstitutionEditInfoPage}/>
            </Switch>
          </InstitutionMainPage>
        </Route>
        <Route path="/Supervisor">
          <SupervisorMainPage>
            <Switch>
              <Route path="/Supervisor/CheckRegister" exact restrict component={SupervisorCheckRegisterPage}/>
              <Route path="/Supervisor/CheckModify" exact restrict component={SupervisorCheckModifyPage}/>
              <Route path="/Supervisor/InstitutionsInfo" exact restrict component={SupervisorInstitutionsInfoPage}/>
              <Route path="/Supervisor/SettlePayment" exact restrict component={SupervisorSettlePaymentPage}/>
              <Route path="/Supervisor/EarningStatistics" exact restrict component={SupervisorEarningStatisticsPage}/>
            </Switch>
          </SupervisorMainPage>
        </Route>
        <Route path='*' exact component={Page404}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
