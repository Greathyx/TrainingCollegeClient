import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';
import {login, getAllRegisterApply} from "../services/SupervisorService";


export default {

  namespace: 'supervisor',

  state: {
    supervisor_id: null,
    hasLoggedIn: false,
    registerApplyData: null,
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (pathToRegexp('/homepage').exec(location.pathname) || pathToRegexp('').exec(location.pathname)) {
          document.title = '主页';
        }
        else if (pathToRegexp('/SupervisorLogin').exec(location.pathname)) {
          document.title = '管理员登陆';
        }
        else if (pathToRegexp('/TraineeRegister').exec(location.pathname)) {
          document.title = '学员注册';
        }
        else if (pathToRegexp('/TraineeLogin').exec(location.pathname)) {
          document.title = '学员登陆';
        }
        else if (pathToRegexp('/InstitutionRegister').exec(location.pathname)) {
          document.title = '机构注册';
        }
        else if (pathToRegexp('/Supervisor/Check').exec(location.pathname)) {
          document.title = '管理员-机构审核';
        }
        else {
          document.title = '页面不存在';
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
          payload: {supervisor_id: data.t.supervisor_id}
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

    // 获取所有机构注册申请
    * getAllRegisterApply({payload}, {call, put, select}) {
      const data = yield call(getAllRegisterApply);

      let applies = [];
      for (let i = 0; i < data.t.length; i++) {
        applies.push({
          key: i,
          institution_apply_id: data.t[i].institution_apply_id,
          name: data.t[i].name,
          email: data.t[i].email,
          address: data.t[i].location,
          faculty: data.t[i].faculty,
          introduction: data.t[i].introduction,
        });
      }

      yield put({
        type: 'updateRegisterApplyData',
        payload: {registerApplyData: applies}
      });
    }

  },

  reducers: {

    updateSupervisorId(state, action) {
      return {
        ...state,
        supervisor_id: action.payload.supervisor_id,
      }
    },

    updateHasLoggedIn(state, action) {
      return {
        ...state,
        hasLoggedIn: action.payload.hasLoggedIn,
      }
    },

    updateRegisterApplyData(state, action) {
      return {
        ...state,
        registerApplyData: action.payload.registerApplyData,
      }
    },

  }

}
