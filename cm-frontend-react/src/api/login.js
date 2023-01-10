import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    params: data
  })
}

export function reqLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/getUserByToken',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}
