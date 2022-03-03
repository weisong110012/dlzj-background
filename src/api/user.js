import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/getUserInfo',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/getUserInfo',
    method: 'post'
  })
}

export function getList(data) {
  return request({
    url: '/user/index',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/user/remove',
    method: 'post',
    data
  })
}
