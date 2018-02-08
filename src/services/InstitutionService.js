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
