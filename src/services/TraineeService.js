import request from '../utils/request';


/**
 *
 * 获取会员状态，即是否已注销
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function isActive(param) {

  const formData = new FormData();
  formData.append('trainee_id', param.trainee_id);

  return request('/trainee/isActive', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 发送注册验证码
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function sendVerificationCode(param) {

  const formData = new FormData();
  formData.append('email', param.email);

  return request('/trainee/sendVerificationCode', {
    method: 'POST',
    body: formData
  })

}


/**
 * 学员注册
 * @param param
 * @returns {Promise.<Object>}
 */
export async function register(param) {

  const formData = new FormData();
  formData.append('email', param.email);
  formData.append('password', param.password);
  formData.append('verificationCode', param.verificationCode);

  return request('/trainee/register', {
    method: 'POST',
    body: formData
  })

}


/**
 *
 * 学员登陆
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function login(param) {

  const formData = new FormData();
  formData.append('email', param.email);
  formData.append('password', param.password);

  return request('/trainee/login', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 学员修改信息
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function traineeEditInfo(param) {

  const formData = new FormData();
  formData.append('trainee_id', param.trainee_id);
  formData.append('email', param.email);
  formData.append('name', param.name);
  formData.append('password_previous', param.password_previous);
  formData.append('password_new', param.password_new);
  formData.append('expenditure', param.expenditure);
  formData.append('credit', param.credit);
  formData.append('is_active', param.is_active);

  return request('/trainee/traineeEditInfo', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 获取会员累计消费，等级，优惠折扣和积分
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function getTraineeVipInfo(param) {

  const formData = new FormData();
  formData.append('trainee_id', param.trainee_id);

  return request('/trainee/getTraineeVipInfo', {
    method: 'POST',
    body: formData
  })

}
