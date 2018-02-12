import {message} from 'antd';
import {
  isActive,
  sendVerificationCode,
  register,
  login,
  traineeEditInfo
} from "../services/TraineeService";


export default {

  namespace: 'trainee',

  state: {
    trainee_id: null,
    trainee_email: null,
    trainee_name: null,
    expenditure: null,
    credit: null,
    is_active: null
  },

  subscriptions: {
    setup({dispatch, history}) {
      const trainee_id = sessionStorage.getItem('trainee_id');
      const trainee_email = sessionStorage.getItem('trainee_email');
      const trainee_name = sessionStorage.getItem('trainee_name');
      const expenditure = sessionStorage.getItem('expenditure');
      const credit = sessionStorage.getItem('credit');
      const is_active = sessionStorage.getItem('is_active');

      if (trainee_id && trainee_id !== undefined) {
        dispatch({
          type: 'updateTraineeId',
          payload: {trainee_id: trainee_id},
        });
      }
      if (trainee_email && trainee_email !== undefined) {
        dispatch({
          type: 'updateTraineeEmail',
          payload: {trainee_email: trainee_email},
        });
      }
      if (trainee_name && trainee_name !== undefined) {
        dispatch({
          type: 'updateTraineeName',
          payload: {trainee_name: trainee_name},
        });
      }
      else {
        dispatch({
          type: 'updateTraineeName',
          payload: {trainee_name: ""},
        });
      }
      if (expenditure && expenditure !== undefined) {
        dispatch({
          type: 'updateExpenditure',
          payload: {expenditure: expenditure},
        });
      }
      if (credit && credit !== undefined) {
        dispatch({
          type: 'updateCredit',
          payload: {credit: credit},
        });
      }
      if (is_active && is_active !== undefined) {
        dispatch({
          type: 'updateIsActive',
          payload: {is_active: is_active},
        });
      }
    }
  },

  effects: {

    // 获取会员状态，即是否已注销
    * isActive({payload}, {call, put, select}) {
      const is_active = yield call(isActive, payload);
      sessionStorage.setItem('is_active', is_active);
      yield put({
        type: 'updateIsActive',
        payload: {is_active: is_active}
      });
      return is_active;
    },

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
        sessionStorage.setItem('trainee_id', data.t.trainee_id);
        sessionStorage.setItem('trainee_email', data.t.email);
        let name = data.t.name;
        if (data.t.name === null) {
          name = "";
        }
        sessionStorage.setItem('trainee_name', name);
        sessionStorage.setItem('expenditure', data.t.expenditure);
        sessionStorage.setItem('credit', data.t.credit);
        sessionStorage.setItem('is_active', data.t.is_active);
        yield put({
          type: 'updateTraineeId',
          payload: {trainee_id: data.t.trainee_id}
        });
        yield put({
          type: 'updateTraineeEmail',
          payload: {trainee_email: data.t.email}
        });
        yield put({
          type: 'updateTraineeName',
          payload: {trainee_name: data.t.name}
        });
        yield put({
          type: 'updateExpenditure',
          payload: {expenditure: data.t.expenditure}
        });
        yield put({
          type: 'updateCredit',
          payload: {credit: data.t.credit}
        });
        yield put({
          type: 'updateIsActive',
          payload: {is_active: data.t.is_active}
        });
        message.success(data.message);
        return true;
      }
      else {
        message.error(data.message);
        return false;
      }
    },

    // 学员修改信息
    * traineeEditInfo({payload}, {call, put, select}) {
      const data = yield call(traineeEditInfo, payload);
      if (data.successTag) {
        sessionStorage.setItem('trainee_id', data.t.trainee_id);
        sessionStorage.setItem('trainee_email', data.t.email);
        let name = data.t.name;
        if (data.t.name === null) {
          name = "";
        }
        sessionStorage.setItem('trainee_name', name);
        sessionStorage.setItem('expenditure', data.t.expenditure);
        sessionStorage.setItem('credit', data.t.credit);
        sessionStorage.setItem('is_active', data.t.is_active);
        yield put({
          type: 'updateTraineeId',
          payload: {trainee_id: data.t.trainee_id}
        });
        yield put({
          type: 'updateTraineeEmail',
          payload: {trainee_email: data.t.email}
        });
        yield put({
          type: 'updateTraineeName',
          payload: {trainee_name: data.t.name}
        });
        yield put({
          type: 'updateExpenditure',
          payload: {expenditure: data.t.expenditure}
        });
        yield put({
          type: 'updateCredit',
          payload: {credit: data.t.credit}
        });
        yield put({
          type: 'updateIsActive',
          payload: {is_active: data.t.is_active}
        });
        message.success(data.message);
        return true;
      }
      else {
        message.error(data.message);
        return false;
      }
    },

  },

  reducers: {
    // 更新学员ID
    updateTraineeId(state, action) {
      return {
        ...state,
        trainee_id: action.payload.trainee_id,
      }
    },
    // 更新学员电子邮件
    updateTraineeEmail(state, action) {
      return {
        ...state,
        trainee_email: action.payload.trainee_email,
      }
    },
    // 更新学员真实姓名
    updateTraineeName(state, action) {
      return {
        ...state,
        trainee_name: action.payload.trainee_name,
      }
    },
    // 更新学员累计花费
    updateExpenditure(state, action) {
      return {
        ...state,
        expenditure: action.payload.expenditure,
      }
    },
    // 更新学员积分
    updateCredit(state, action) {
      return {
        ...state,
        credit: action.payload.credit,
      }
    },
    // 更新学员资格状态
    updateIsActive(state, action) {
      return {
        ...state,
        is_active: action.payload.is_active,
      }
    },
  }

}
