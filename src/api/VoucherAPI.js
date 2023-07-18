import request from '@/utils/request'
export const getVoucherAPI = function () {
  return request.get('/vouchers')
}
export const addVoucherAPI = function (data) {
  return request({
    url: '/vouchers',
    method: 'post',
    data
  })
}
export const addKillVoucherAPI = function (data) {
  return request({
    url: '/vouchers/kill',
    method: 'post',
    data
  })
}
export const delVoucherAPI = function (_row) {
  return request.delete('/vouchers/' + _row)
}
export const updataVoucherAPI = function (data) {
  return request({
    url: '/vouchers',
    method: 'put',
    data
  })
}
export const getVoucherByBookAPI = function (_id) {
  return request.get('/vouchers/' + _id)
}
export const getVoucherByUserAPI = function () {
  return request.get('/vouchers/user')
}
