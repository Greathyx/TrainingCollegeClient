import request from '../utils/request';


/**
 *
 * 机构注册
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function register(param) {

  const formData = new FormData();
  formData.append('email', param.email);
  formData.append('name', param.name);
  formData.append('password', param.password);
  formData.append('location', param.location);
  formData.append('faculty', param.faculty);
  formData.append('introduction', param.introduction);

  return request('/institution/register', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 机构登陆方法
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function login(param) {

  const formData = new FormData();
  formData.append('code', param.code);
  formData.append('password', param.password);

  return request('/institution/login', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 修改机构信息
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function editInfo(param) {

  const formData = new FormData();
  formData.append('code', param.code);
  formData.append('email', param.email);
  formData.append('name', param.name);
  formData.append('password_previous', param.password_previous);
  formData.append('password_new', param.password_new);
  formData.append('location', param.location);
  formData.append('faculty', param.faculty);
  formData.append('introduction', param.introduction);

  return request('/institution/editInfo', {
    method: 'POST',
    body: formData
  })

}
