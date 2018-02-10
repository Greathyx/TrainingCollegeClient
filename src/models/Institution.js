import {message} from 'antd';
import {register, login, editInfo} from "../services/InstitutionService";


export default {

  namespace: 'institution',

  state: {
    institution_code: null,
    institution_email: null,
    institution_name: null,
    institution_location: null,
    institution_faculty: null,
    institution_introduction: null
  },

  subscriptions: {
    setup({dispatch, history}) {
      const institution_code = sessionStorage.getItem('institution_code');
      const institution_email = sessionStorage.getItem('institution_email');
      const institution_name = sessionStorage.getItem('institution_name');
      const institution_location = sessionStorage.getItem('institution_location');
      const institution_faculty = sessionStorage.getItem('institution_faculty');
      const institution_introduction = sessionStorage.getItem('institution_introduction');
      if (institution_code && institution_code !== undefined) {
        dispatch({
          type: 'updateInstitutionCode',
          payload: {institution_code: institution_code},
        });
      }
      if (institution_email && institution_email !== undefined) {
        dispatch({
          type: 'updateInstitutionEmail',
          payload: {institution_email: institution_email},
        });
      }
      if (institution_name && institution_name !== undefined) {
        dispatch({
          type: 'updateInstitutionName',
          payload: {institution_name: institution_name},
        });
      }
      if (institution_location && institution_location !== undefined) {
        dispatch({
          type: 'updateInstitutionLocation',
          payload: {institution_location: institution_location},
        });
      }
      if (institution_faculty && institution_faculty !== undefined) {
        dispatch({
          type: 'updateInstitutionFaculty',
          payload: {institution_faculty: institution_faculty},
        });
      }
      if (institution_introduction && institution_introduction !== undefined) {
        dispatch({
          type: 'updateInstitutionIntroduction',
          payload: {institution_introduction: institution_introduction},
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
        sessionStorage.setItem('institution_email', data.t.email);
        sessionStorage.setItem('institution_name', data.t.name);
        sessionStorage.setItem('institution_location', data.t.location);
        sessionStorage.setItem('institution_faculty', data.t.faculty);
        sessionStorage.setItem('institution_introduction', data.t.introduction);
        yield put({
          type: 'updateInstitutionCode',
          payload: {institution_code: data.t.code}
        });
        yield put({
          type: 'updateInstitutionEmail',
          payload: {institution_email: data.t.email}
        });
        yield put({
          type: 'updateInstitutionName',
          payload: {institution_name: data.t.name}
        });
        yield put({
          type: 'updateInstitutionLocation',
          payload: {institution_location: data.t.location}
        });
        yield put({
          type: 'updateInstitutionFaculty',
          payload: {institution_faculty: data.t.faculty}
        });
        yield put({
          type: 'updateInstitutionIntroduction',
          payload: {institution_introduction: data.t.introduction}
        });
        message.success(data.message);
        return true;
      }
      else {
        message.error(data.message);
        return false;
      }
    },

    // 机构申请修改信息
    * editInfo({payload}, {call, put, select}) {
      const data = yield call(editInfo, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }
    },

  },

  reducers: {
    // 更新机构登陆码
    updateInstitutionCode(state, action) {
      return {
        ...state,
        institution_code: action.payload.institution_code,
      }
    },
    // 更新机构电子邮件
    updateInstitutionEmail(state, action) {
      return {
        ...state,
        institution_email: action.payload.institution_email,
      }
    },
    // 更新机构名称
    updateInstitutionName(state, action) {
      return {
        ...state,
        institution_name: action.payload.institution_name,
      }
    },
    // 更新机构地址
    updateInstitutionLocation(state, action) {
      return {
        ...state,
        institution_location: action.payload.institution_location,
      }
    },
    // 更新机构师资介绍
    updateInstitutionFaculty(state, action) {
      return {
        ...state,
        institution_faculty: action.payload.institution_faculty,
      }
    },
    // 更新机构简介
    updateInstitutionIntroduction(state, action) {
      return {
        ...state,
        institution_introduction: action.payload.institution_introduction,
      }
    },
  }

}
