import request from '../utils/request';


/**
 * 发送注册验证码
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
 * 学员登陆
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
