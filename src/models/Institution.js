import {message} from 'antd';
import {register, login} from "../services/InstitutionService";


export default {

  namespace: 'institution',

  state: {
    institution_code: null,
  },

  subscriptions: {
    setup({dispatch, history}) {
      const institution_code = sessionStorage.getItem('institution_code');
      if (institution_code && institution_code !== undefined) {
        dispatch({
          type: 'updateInstitutionCode',
          payload: {institution_code: institution_code},
        });
      }
    }
  },

  effects: {

    // 机构注册
    * register({payload}, {call, put, select}) {
      const data = yield call(register, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

    // 机构登陆
    * login({payload}, {call, put, select}) {
      const data = yield call(login, payload);
      if (data.successTag) {
        sessionStorage.setItem('institution_code', data.t.code);
        yield put({
          type: 'updateInstitutionCode',
          payload: {institution_code: data.t.code}
        });
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

  },

  reducers: {
    updateInstitutionCode(state, action) {
      return {
        ...state,
        institution_code: action.payload.institution_code,
      }
    },
  }

}
