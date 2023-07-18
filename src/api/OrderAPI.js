import request from '@/utils/request'

export const getAllOrdersAPI = function (_UID) {
  return request.get('/orders/' + _UID)
}
export const getOrdersNameAPI = function (_NAME, _UID) {
  return request.get('/orders/select/' + _NAME + '/' + _UID)
}
export const delOrdersAPI = function (_ID) {
  return request.delete('/orders/' + _ID)
}
export const getAllAdminOrdersAPI = function (param) {
  return request.get('/orders' + param)
}
export const updataAdminOrdersAPI = function (_ID) {
  return request.put('/orders/' + _ID)
}
export const delupdataAdminOrdersAPI = function (_ID) {
  return request.put('/orders/del/' + _ID)
}
export const addVoucherAPI = function (_ID) {
  return request.get('/orders/voucher/' + _ID)
}
