import request from '@/utils/request'
// 文章相关的api都写在这
// 向外按需导出一个api函数
// 导出以函数方法的形式，有传参

export const getUsersPageAPI = function (_page, _limit, _param) {
  return request.get('/users' + '/' + _page + '/' + _limit + '/' + _param)
}
export const getUsersIdAPI = function (_id) {
  return request.get('/users/s/' + _id)
}
export const deleteUsersAPI = function (_row) {
  return request.delete('/users/' + _row)
}
export const updataUsersRoleAPI = function (data) {
  return request.put('/users', data)
}
