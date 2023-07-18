import request from '@/utils/request'

// 根据文章id查文章
export const getArticleALLListAPI = function (id) {
  return request.get('/articles/s/' + id)
}
// 分页查询，有条件查询
export const getArticleListAPI = function (_page, _limit, _param) {
  return request.get('/articles' + '/' + _page + '/' + _limit + '/' + _param)
}
// 根据uid查询用户是否为文章作者
export const getArticleByUserIdListAPI = function (uid) {
  return request.get('/articles/a/' + uid)
}
// 查询正在被审核或者已经审核通过的文章
export const getArticleByAdbleListAPI = function (enable, uid) {
  return request.get('/articles/e/' + enable + '/' + uid)
}

export const deteleArticleAPI = function (aid) {
  return request.delete('/articles/' + aid)
}

export const getAdminArticleByAdbleListAPI = function (enable) {
  return request.get('/articles/admin/' + enable)
}
export const getTenNewArticleAPI = function () {
  return request.get('/articles/home/new')
}
export const getHotArticleAPI = function () {
  return request.get('/articles/home/comment')
}
export const getRandomArticleAPI = function () {
  return request.get('/articles/home/random')
}
export const getMendArticleAPI = function () {
  return request.get('/articles/home/mend')
}
