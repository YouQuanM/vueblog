import request from '../common/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    data: data,
    method: 'POST'
  })
}

// 注册
export function signUp(params) {
  return request({
    url: '/signUp',
    params: params,
    method: 'GET'
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/getUserInfo',
    method: 'POST'
  })
}