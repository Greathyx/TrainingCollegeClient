import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';
import {login, logout} from "../services/SupervisorService";


export default {

  namespace: 'supervisor',

  state: {
    supervisor_id: null,
    hasLoggedIn: false,
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (pathToRegexp('/homepage').exec(location.pathname) || pathToRegexp('').exec(location.pathname)) {
          document.title = 'Homepage';
        }
        else if (pathToRegexp('/SupervisorLogin').exec(location.pathname)) {
          document.title = 'Supervisor Login';
        }
        else {
          document.title = 'Not found';
        }
      });

      const supervisor_id = sessionStorage.getItem('supervisor_id');
      const hasLoggedIn = sessionStorage.getItem('hasLoggedIn');

      if (supervisor_id && supervisor_id !== undefined) {
        dispatch({
          type: 'updateSupervisorId',
          payload: {supervisor_id: supervisor_id},
        });
      }

      if (hasLoggedIn !== undefined) {
        dispatch({
          type: 'updateHasLoggedIn',
          payload: {hasLoggedIn: hasLoggedIn}
        })
      }

    },
  },

  effects: {

    // 登陆
    * login({payload}, {call, put, select}) {

      const data = yield call(login, payload);

      if (data.successTag) {
        sessionStorage.setItem('supervisor_id', data.t.supervisor_id);
        sessionStorage.setItem('hasLoggedIn', true);

        yield put({
          type: 'updateSupervisorId',
          payload: {userId: data.t.supervisor_id}
        });

        yield put({
          type: 'updateHasLoggedIn',
          payload: {hasLoggedIn: true}
        });

        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

    // 登出
    // * logout({payload}, {call, put, select}) {
    //   const data = yield call(logout);
    //   if (!data.auth) {
    //     sessionStorage.setItem('hasLoggedIn', false);
    //
    //     yield put({
    //       type: 'updateHasLoggedIn',
    //       payload: {hasLoggedIn: false}
    //     });
    //     message.success('Logout successfully!')
    //   }
    //   else {
    //     message.error('Logout error!')
    //   }
    // }
  },

  reducers: {

    updateSupervisorId(state, action) {
      return {
        ...state,
        userId: action.payload.supervisor_id,
      }
    },

    updateHasLoggedIn(state, action) {
      return {
        ...state,
        hasLoggedIn: action.payload.hasLoggedIn,
      }
    },

  }

}
