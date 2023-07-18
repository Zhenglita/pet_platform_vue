import request from '@/utils/request'
// 文章相关的api都写在这
// 向外按需导出一个api函数
// 导出以函数方法的形式，有传参

export const getCartAPI = function (_BooksID, _Uid) {
  return request.get('/carts/s/' + _BooksID + '/' + _Uid)
}
export const updateCartAPI = function (_BooksID, _Uid, _Num) {
  return request.get('/carts/update/' + _BooksID + '/' + _Uid + '/' + _Num)
}
export const getByuidCartAPI = function (__Uid) {
  return request.get('/carts/user/' + __Uid)
}
export const deleteCartAPI = function (__Uid, _BooksID) {
  return request.delete('/carts/' + __Uid + '/' + _BooksID)
}
