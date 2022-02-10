import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/admin/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/admin/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/admin/edit',
    method: 'post',
    data
  })
}
export function editPassword(data) {
  return request({
    url: '/admin/editPassword',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/admin/detail',
    method: 'post',
    data
  })
}
