import axios from 'axios'
import { getToken } from './cookie'

// 创建 axios 请求实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 修改config的操作在requestConfig方法之前
    config.headers['Authorization'] = getToken()
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    // 这里怎么拦截需要与后端同学沟通，在res或则error中拦截都有可能
    return res.data
  },

  error => {
    console.log(error)
  }
)

export default service
