import request from '../utils/request';


/**
 *
 * 登陆
 *
 * you can login with supervisor_id
 *
 * param:{
 *      supervisor_id: int
 *      password: string
 * }
 *
 */
export async function login(param) {

  const formData = new FormData();
  formData.append('supervisor_id', param.supervisor_id);
  formData.append('password', param.password);

  return request('/supervisor/login', {
    method: 'POST',
    body: formData
  })

}


/**
 *
 * 登出
 *
 * @returns {Promise.<Object>}
 */
// export async function logout() {
//
//   return request('/supervisor/logout', {
//     method: 'GET',
//   })
//
// }
