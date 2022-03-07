import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/CompyRole/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/CompyRole/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/CompyRole/del',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/CompyRole/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/CompyRole/read',
    method: 'post',
    data
  })
}
