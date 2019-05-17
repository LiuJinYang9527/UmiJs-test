import request from '../../../utils/request.js';

/**
 * @method 请求用户数据
 * @param {Number} page
 */
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=3`);
}

/**
 * @method 删除指定用户
 * @param {Number} id
 */
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
/**
 * @method 修改用户信息
 * @param {Number} id
 * @param {Object} values
 */
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
/**
 * @method 创建用户
 * @param {Object} values
 */
export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
