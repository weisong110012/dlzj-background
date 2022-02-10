import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/question/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/question/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/question/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/question/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/question/detail',
    method: 'post',
    data
  })
}
