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
 * 获取所有机构注册申请
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function getAllRegisterApply() {

  return request('/supervisor/getAllRegisterApply', {
    method: 'GET',
  })

}

/**
 *
 * 批准机构注册或修改信息申请
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function approveApply(param) {

  const formData = new FormData();
  formData.append('institution_apply_id', param.institution_apply_id);

  return request('/supervisor/approveApply', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 驳回机构注册或修改信息申请
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function rejectApply(param) {

  const formData = new FormData();
  formData.append('institution_apply_id', param.institution_apply_id);

  return request('/supervisor/rejectApply', {
    method: 'POST',
    body: formData
  })

}

/**
 *
 * 发送管理员处理结果邮件
 *
 * @param param
 * @returns {Promise.<Object>}
 */
export async function sendReplyMail(param) {

  const formData = new FormData();
  formData.append('to', param.to);
  formData.append('title', param.title);
  formData.append('content', param.content);

  return request('/supervisor/sendReplyMail', {
    method: 'POST',
    body: formData
  })

}
