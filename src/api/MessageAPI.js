import request from '@/utils/request'
// 文章相关的api都写在这
// 向外按需导出一个api函数
// 导出以函数方法的形式，有传参

export const getAPI = function () {
  return request.get('/messages')
}
export const delAPI = function (username) {
  return request.delete('/messages/' + username)
}
export const addAPI = function (username) {
  return request.get('/messages/add/' + username)
}
export const addwranAPI = function (data) {
  return request({
    url: '/messages/add',
    method: 'post',
    data
  }
  )
}
export const addquestAPI = function (data) {
  return request.get('/messages/add/quest/' + data)
}
export const getquestAPI = function () {
  return request.get('/messages/getMessage')
}
export const getMessageAPI = function () {
  return request.get('/messages/enable')
}
// export const getMessagesAPI = function () {
//   return request.get('/messages/handleReqDefResult')
// }
export const delMessageAPI = function (id) {
  return request.get('/messages/zlt/' + id)
}
export const downMessageAPI = function () {
  return request.get('/messages/zlt')
}
