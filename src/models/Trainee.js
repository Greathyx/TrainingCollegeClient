import {message} from 'antd';
import {sendVerificationCode, register, login} from "../services/TraineeService";


export default {

  namespace: 'trainee',

  state: {
    trainee_email: null,
  },

  subscriptions: {
    setup({dispatch, history}) {
      const trainee_email = sessionStorage.getItem('trainee_email');
      if (trainee_email && trainee_email !== undefined) {
        dispatch({
          type: 'updateTraineeEmail',
          payload: {trainee_email: trainee_email},
        });
      }
    }
  },

  effects: {

    // 发送注册验证码
    * sendVerificationCode({payload}, {call, put, select}) {
      const data = yield call(sendVerificationCode, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.warning(data.message);
      }
    },

    // 注册
    * register({payload}, {call, put, select}) {
      const data = yield call(register, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

    // 登陆
    * login({payload}, {call, put, select}) {
      const data = yield call(login, payload);
      if (data.successTag) {
        sessionStorage.setItem('trainee_email', data.t.email);
        yield put({
          type: 'updateTraineeEmail',
          payload: {trainee_email: data.t.email}
        });
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

  },

  reducers: {
    updateTraineeEmail(state, action) {
      return {
        ...state,
        trainee_email: action.payload.trainee_email,
      }
    },
  }

}
