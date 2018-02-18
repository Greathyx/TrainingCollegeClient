import {message} from 'antd';
import {
  register,
  login,
  editInfo,
  releaseCourse,
  getCourseInfo,
  getAllOrdersByStatus,
} from "../services/InstitutionService";


export default {

  namespace: 'institution',

  state: {
    institution_id: null,
    institution_code: null,
    institution_email: null,
    institution_name: null,
    institution_location: null,
    institution_faculty: null,
    institution_introduction: null,
    courseData: [],
    booked_courses: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      const institution_id = sessionStorage.getItem('institution_id');
      const institution_code = sessionStorage.getItem('institution_code');
      const institution_email = sessionStorage.getItem('institution_email');
      const institution_name = sessionStorage.getItem('institution_name');
      const institution_location = sessionStorage.getItem('institution_location');
      const institution_faculty = sessionStorage.getItem('institution_faculty');
      const institution_introduction = sessionStorage.getItem('institution_introduction');
      if (institution_id && institution_id !== undefined) {
        dispatch({
          type: 'updateInstitutionId',
          payload: {institution_id: institution_id},
        });
      }
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
        sessionStorage.setItem('institution_id', data.t.institution_id);
        sessionStorage.setItem('institution_code', data.t.code);
        sessionStorage.setItem('institution_email', data.t.email);
        sessionStorage.setItem('institution_name', data.t.name);
        sessionStorage.setItem('institution_location', data.t.location);
        sessionStorage.setItem('institution_faculty', data.t.faculty);
        sessionStorage.setItem('institution_introduction', data.t.introduction);
        yield put({
          type: 'updateInstitutionId',
          payload: {institution_id: data.t.institution_id}
        });
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

    // 机构发布课程
    * releaseCourse({payload}, {call, put, select}) {
      const data = yield call(releaseCourse, payload);
      if (data.successTag) {
        message.success(data.message);
        return true;
      }
      else {
        message.error(data.message);
        return false;
      }
    },

    // 获取机构课程信息
    * getCourseInfo({payload}, {call, put, select}) {
      const data = yield call(getCourseInfo, payload);
      let courses = [];
      for (let i = 0; i < data.t.length; i++) {
        let class_amount = data.t[i].class_amount;
        if(data.t[i].hasClasses && class_amount === 1) {
          class_amount = "暂未确定";
        }
        courses.push({
          key: i,
          name: data.t[i].name,
          trainee_amount: data.t[i].booked_amount + " / " + data.t[i].trainee_amount,
          periods_per_week: data.t[i].periods_per_week,
          total_weeks: data.t[i].total_weeks,
          type: data.t[i].type,
          start_date: data.t[i].start_date,
          teacher: data.t[i].teacher,
          introduction: data.t[i].introduction,
          price: data.t[i].price,
          class_amount: class_amount,
          book_due_date: data.t[i].book_due_date
        });
      }

      yield put({
        type: 'updateInstitutionCourseData',
        payload: {courseData: courses}
      });
    },

    // 获取机构订课信息
    * getAllOrdersByStatus({payload}, {call, put, select}) {
      const data = yield call(getAllOrdersByStatus, payload);
      let booked_courses = [];
      for (let i = 0; i < data.t.length; i++) {
        booked_courses.push({
          key: i,
          course_name: data.t[i].course_name,
          trainee_name: data.t[i].trainee_name,
          amount: data.t[i].amount,
          payment: data.t[i].payment,
          book_time: data.t[i].book_time,
          description: data.t[i].description,
        });
      }

      yield put({
        type: 'updateBookedCourses',
        payload: {booked_courses: booked_courses}
      });
    },

  },

  reducers: {
    // 更新机构ID
    updateInstitutionId(state, action) {
      return {
        ...state,
        institution_id: action.payload.institution_id,
      }
    },
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
    // 更新机构课程信息
    updateInstitutionCourseData(state, action) {
      return {
        ...state,
        courseData: action.payload.courseData,
      }
    },
    // 更新机构订课信息
    updateBookedCourses(state, action) {
      return {
        ...state,
        booked_courses: action.payload.booked_courses,
      }
    },

  }

}
