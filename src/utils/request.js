import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:8083'
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  const user = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null
  if (user) {
    config.headers.Authorization = user
  }
  // console.log(config)
  // console.log(user)
  return config
})

// response 拦截器
// 可以在接口响应后统一处理结果

export default request
