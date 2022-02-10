import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/carousel/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/carousel/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/carousel/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/carousel/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/carousel/detail',
    method: 'post',
    data
  })
}
