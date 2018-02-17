import {message} from 'antd';
import {
  isActive,
  sendVerificationCode,
  register,
  login,
  traineeEditInfo,
  getTraineeVipInfo,
  getAllCourses,
  getAllCoursesWithClasses,
  generateOrder,
  getAllOrdersByStatus,
  pay,
  cancelPay,
  unsubscribe,
} from "../services/TraineeService";


export default {

  namespace: 'trainee',

  state: {
    trainee_id: null,
    trainee_email: null,
    trainee_name: null,
    expenditure: null,
    credit: null,
    is_active: null,
    level: null,
    discount: null,
    courses: [],
    coursesWithoutClasses: [],
    notPaidOrders: [],
    paidOrders: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      const trainee_id = sessionStorage.getItem('trainee_id');
      const trainee_email = sessionStorage.getItem('trainee_email');
      const trainee_name = sessionStorage.getItem('trainee_name');
      const expenditure = sessionStorage.getItem('expenditure');
      const credit = sessionStorage.getItem('credit');
      const is_active = sessionStorage.getItem('is_active');
      const level = sessionStorage.getItem('level');
      const discount = sessionStorage.getItem('discount');

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
      if (level && level !== undefined) {
        dispatch({
          type: 'updateLevel',
          payload: {level: level},
        });
      }
      if (discount && discount !== undefined) {
        dispatch({
          type: 'updateDiscount',
          payload: {discount: discount},
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

    // 获取会员累计消费，等级，优惠折扣和积分
    * getTraineeVipInfo({payload}, {call, put, select}) {
      const data = yield call(getTraineeVipInfo, payload);
      sessionStorage.setItem('expenditure', data.t.expenditure);
      sessionStorage.setItem('level', data.t.level);
      sessionStorage.setItem('discount', data.t.discount);
      sessionStorage.setItem('credit', data.t.credit);

      yield put({
        type: 'updateExpenditure',
        payload: {expenditure: data.t.expenditure}
      });
      yield put({
        type: 'updateLevel',
        payload: {level: data.t.level}
      });
      yield put({
        type: 'updateDiscount',
        payload: {discount: data.t.discount}
      });
      yield put({
        type: 'updateCredit',
        payload: {credit: data.t.credit}
      });
    },

    // 获取所有机构发布的所有选班课程
    * getAllCourses({payload}, {call, put, select}) {
      const data = yield call(getAllCourses);

      let courses = [];
      for (let i = 0; i < data.t.length; i++) {
        courses.push({
          key: i,
          course_id: data.t[i].course_id,
          institution_id: data.t[i].publisher,
          institution_name: data.t[i].publisher_name,
          course_name: data.t[i].name,
          price: data.t[i].price,
          type: data.t[i].type,
          amount: data.t[i].booked_amount + " / " + data.t[i].trainee_amount,
          trainee_amount: data.t[i].trainee_amount,
          booked_amount: data.t[i].booked_amount,
          start_date: data.t[i].start_date,
          periods_per_week: data.t[i].periods_per_week,
          total_weeks: data.t[i].total_weeks,
          teacher: data.t[i].teacher,
          course_introduction: data.t[i].introduction,
          class_amount: data.t[i].class_amount,
          book_due_date: data.t[i].book_due_date,
        });
      }

      yield put({
        type: 'updateCourses',
        payload: {courses: courses}
      });
    },

    // 获取所有机构发布的所有不选班课程
    * getAllCoursesWithClasses({payload}, {call, put, select}) {
      const data = yield call(getAllCoursesWithClasses);

      let coursesWithoutClasses = [];
      for (let i = 0; i < data.t.length; i++) {
        coursesWithoutClasses.push({
          key: i,
          course_id: data.t[i].course_id,
          institution_id: data.t[i].publisher,
          institution_name: data.t[i].publisher_name,
          course_name: data.t[i].name,
          price: data.t[i].price,
          type: data.t[i].type,
          amount: data.t[i].booked_amount + " / " + data.t[i].trainee_amount,
          trainee_amount: data.t[i].trainee_amount,
          booked_amount: data.t[i].booked_amount,
          start_date: data.t[i].start_date,
          periods_per_week: data.t[i].periods_per_week,
          total_weeks: data.t[i].total_weeks,
          teacher: data.t[i].teacher,
          course_introduction: data.t[i].introduction,
          class_amount: "开课前2周系统自动分配班级",
          book_due_date: data.t[i].book_due_date,
        });
      }

      yield put({
        type: 'updateCoursesWithClasses',
        payload: {coursesWithoutClasses: coursesWithoutClasses}
      });
    },

    // 生成课程订单
    * generateOrder({payload}, {call, put, select}) {
      const data = yield call(generateOrder, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.warning(data.message);
      }
    },

    // 获取学员所有未支付订单
    * getAllNotPaidOrders({payload}, {call, put, select}) {
      const data = yield call(getAllOrdersByStatus, payload);
      let notPaidOrders = [];
      for (let i = 0; i < data.t.length; i++) {
        let status = "";
        if (data.t[i].status === "not_paid") {
          status = "未支付";
        }
        notPaidOrders.push({
          key: i,
          course_order_id: data.t[i].course_order_id,
          traineeID: data.t[i].traineeID,
          courseID: data.t[i].courseID,
          classID: data.t[i].classID,
          payment: data.t[i].payment,
          status: status,
          amount: data.t[i].amount,
          description: data.t[i].description,
          trainee_name: data.t[i].trainee_name,
          institution_name: data.t[i].institution_name,
          course_name: data.t[i].course_name,
          add_credits: data.t[i].add_credits,
        });
      }

      yield put({
        type: 'updateNotPaidOrders',
        payload: {notPaidOrders: notPaidOrders}
      });
    },

    // 付款
    * pay({payload}, {call, put, select}) {
      const data = yield call(pay, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.warning(data.message);
      }
    },

    // 获取学员所有已支付订单
    * getAllPaidOrders({payload}, {call, put, select}) {
      const data = yield call(getAllOrdersByStatus, payload);
      let paidOrders = [];
      for (let i = 0; i < data.t.length; i++) {
        let status = "";
        if (data.t[i].status === "paid") {
          status = "已支付";
        }
        paidOrders.push({
          key: i,
          course_order_id: data.t[i].course_order_id,
          traineeID: data.t[i].traineeID,
          courseID: data.t[i].courseID,
          classID: data.t[i].classID,
          payment: data.t[i].payment,
          status: status,
          amount: data.t[i].amount,
          description: data.t[i].description,
          trainee_name: data.t[i].trainee_name,
          institution_name: data.t[i].institution_name,
          course_name: data.t[i].course_name,
          add_credits: data.t[i].add_credits,
        });
      }

      yield put({
        type: 'updatePaidOrders',
        payload: {paidOrders: paidOrders}
      });
    },

    // 取消课程订单
    * cancelPay({payload}, {call, put, select}) {
      const data = yield call(cancelPay, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.warning(data.message);
      }
    },

    // 用户退课
    * unsubscribe({payload}, {call, put, select}) {
      const data = yield call(unsubscribe, payload);
      if (data.successTag) {
        message.success(data.message);
      }
      else {
        message.warning(data.message);
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
    // 更新会员等级
    updateLevel(state, action) {
      return {
        ...state,
        level: action.payload.level,
      }
    },
    // 更新会员优惠折扣
    updateDiscount(state, action) {
      return {
        ...state,
        discount: action.payload.discount,
      }
    },
    // 更新所有不分班课程列表
    updateCourses(state, action) {
      return {
        ...state,
        courses: action.payload.courses,
      }
    },
    // 更新所有分班课程列表
    updateCoursesWithClasses(state, action) {
      return {
        ...state,
        coursesWithoutClasses: action.payload.coursesWithoutClasses,
      }
    },
    // 更新用户未付款订单列表
    updateNotPaidOrders(state, action) {
      return {
        ...state,
        notPaidOrders: action.payload.notPaidOrders,
      }
    },
    // 更新用户已付款订单列表
    updatePaidOrders(state, action) {
      return {
        ...state,
        paidOrders: action.payload.paidOrders,
      }
    },
  }

}
