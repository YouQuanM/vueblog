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

// 获取likedissarticles
export function getLikeDissArr() {
  return request({
    url: '/getLikeAndDiss',
    method: 'POST'
  })
}

// 获取用户logs
export function getUserLogs(data) {
  return request({
    url: '/getUserLogs',
    method: 'POST',
    data: data
  })
}
