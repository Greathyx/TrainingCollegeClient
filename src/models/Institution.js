import {message} from 'antd';
import {register} from "../services/InstitutionService";


export default {

  namespace: 'institution',

  state: {
    institution_id: null,
  },

  subscriptions: {
    setup({dispatch, history}) {
      const institution_id = sessionStorage.getItem('institution_id');
      if (institution_id && institution_id !== undefined) {
        dispatch({
          type: 'updateInstitutionId',
          payload: {institution_id: institution_id},
        });
      }
    }
  },

  effects: {

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
    // * login({payload}, {call, put, select}) {
    //   const data = yield call(login, payload);
    //   if (data.successTag) {
    //     sessionStorage.setItem('trainee_email', data.t.email);
    //     yield put({
    //       type: 'updateTraineeEmail',
    //       payload: {trainee_email: data.t.email}
    //     });
    //     message.success(data.message);
    //   }
    //   else {
    //     message.error(data.message);
    //   }
    // },

  },

  reducers: {
    updateInstitutionId(state, action) {
      return {
        ...state,
        institution_id: action.payload.institution_id,
      }
    },
  }

}
