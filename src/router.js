import React from 'react';
import dynamic from 'dva/dynamic';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import SupervisorLoginPage from './routes/SupervisorLoginPage';
import TraineeRegisterPage from './routes/TraineeRegisterPage';
import TraineeLoginPage from './routes/TraineeLogin';


function RouterConfig({history, app}) {

  const notFound = dynamic({
    app,
    component: () => import('./routes/404Page')
  });
  // const home = dynamic({
  //   app,
  //   component: () => import('./routes/home')
  // });
  // const homeChild = dynamic({
  //   app,
  //   component: () => import('./routes/child')
  // });

  return (
    <Router history={history}>
      <Switch>
        {/*<Route path='/home' exact component={home} />*/}
        {/*<Route path='/home/child' exact component={homeChild} />*/}
        <Route path="/" exact component={HomePage}/>
        <Route path="/homepage" exact component={HomePage}/>
        <Route path="/SupervisorLogin" exact component={SupervisorLoginPage}/>
        <Route path="/TraineeRegister" exact component={TraineeRegisterPage}/>
        <Route path="/TraineeLogin" exact component={TraineeLoginPage}/>
        <Route path='*' exact component={notFound}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
