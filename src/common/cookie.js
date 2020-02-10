import Cookies from 'js-cookie'
const TOKEN_KEY = 'token'
const USER_KEY = 'userInfo'

// 获取本地 cookie 中的 token 信息
export function getToken() {
  const token = Cookies.get(TOKEN_KEY)
  if (token !== '' || token !== undefined || token !== null) {
    return token
  } else {
    return null
  }
}

// 将 token 设置到本地
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token, {
    expires: 1 // 失效时间 1 天
  })
}

// 将本地 cookie 中的 token 中移除
export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

// 获取本地 cookie 中的 token 信息
export function getUserInfo() {
  const userinfo = Cookies.get(USER_KEY)
  if (userinfo !== '' || userinfo !== undefined || userinfo !== null) {
    return userinfo
  } else {
    return null
  }
}

// 将 token 设置到本地
export function setUserInfo(user) {
  return Cookies.set(USER_KEY, user, {
    expires: 1 // 失效时间 1 天
  })
}

// 将本地 cookie 中的 token 中移除
export function removeUserInfo() {
  return Cookies.remove(USER_KEY)
}