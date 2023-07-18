import request from '@/utils/request'
export const getAllBooksAPI = function () {
  return request.get('/books')
}

export const getBooksAllPageAPI = function (_page, _limit, _param) {
  return request.get('/books' + '/' + _page + '/' + _limit + '/' + _param)
}
export const getBooksByBIdAPI = function (_ID, _Uid) {
  return request.get('/books' + '/s/' + _ID + '/' + _Uid)
}
export const getBooksPageAPI = function (_page, _limit, _param) {
  return request.get('/books' + '/' + _page + '/' + _limit + '/' + _param)
}
export const deleteBooksAPI = function (_row) {
  return request.delete('/books/' + _row)
}
export const getBooksByIdAPI = function (_id) {
  return request.get('/books/s/' + _id)
}
export const saveBooks = function (data) {
  return request({
    url: '/books',
    method: 'post',
    data
  })
}
export const updataBooks = function (data) {
  return request({
    url: '/books',
    method: 'put',
    data
  })
}
export const updataBooksList = function (data) {
  return request({
    url: '/books/groudList',
    method: 'put',
    data
  })
}
export const updataBooksUnderList = function (data) {
  return request({
    url: '/books/underList',
    method: 'put',
    data
  })
}
export const getTopBooksAPI = function () {
  return request.get('/books/admin/order')
}
