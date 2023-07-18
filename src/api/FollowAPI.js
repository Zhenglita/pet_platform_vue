import request from '@/utils/request'
// 文章相关的api都写在这
// 向外按需导出一个api函数
// 导出以函数方法的形式，有传参

export const addAPI = function (uid) {
  return request.get('/follows/add/' + uid)
}
export const getAllAPI = function () {
  return request.get('/follows')
}
export const getUserAllAPI = function (uid) {
  return request.get('/follows/' + uid)
}
