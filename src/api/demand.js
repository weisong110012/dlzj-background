import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/demand/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/demand/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/demand/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/demand/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/demand/detail',
    method: 'post',
    data
  })
}
