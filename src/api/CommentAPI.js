import request from '@/utils/request'
export const getAllMessagesAPI = function (_id) {
  return request.get('/comments/s/' + _id)
}
export const deleteMessagesAPI = function (_ID) {
  return request.delete('/comments/' + _ID)
}
export const getMessagesAPI = function (_ID) {
  return request.get('/comments/a/' + _ID)
}
export const getAllMessagesAdminAPI = function () {
  return request.get('/comments/admin')
}
export const getTenNewCommentAPI = function () {
  return request.get('/comments/home/new')
}
export const getTheArticleNewCommentAPI = function (_ID) {
  return request.get('/comments/new/' + _ID)
}
