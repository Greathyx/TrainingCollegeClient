import React from 'react';
import dynamic from 'dva/dynamic';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import LoginSupervisorPage from './routes/LoginSupervisorPage';

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
        <Route path="/SupervisorLogin" exact component={LoginSupervisorPage}/>
        <Route path='*' exact component={notFound}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
