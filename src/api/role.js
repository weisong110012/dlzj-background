import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/role/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/role/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/role/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/role/detail',
    method: 'post',
    data
  })
}
