import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/company/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/company/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/company/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/company/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/notice/detail',
    method: 'post',
    data
  })
}
