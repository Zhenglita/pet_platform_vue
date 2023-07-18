import request from '@/utils/request'
// 文章相关的api都写在这
// 向外按需导出一个api函数
// 导出以函数方法的形式，有传参

export const getLoginAPI = function (username, password) {
  return request.get('/users',
    // get请求参数为params,post请求参数为别的
    {
      params: {
        username,
        password
      }
    })
}
export const getAdminLoginAPI = function (username, password) {
  return request.get('/users/admin/login',
    // get请求参数为params,post请求参数为别的
    {
      params: {
        username,
        password
      }
    })
}
