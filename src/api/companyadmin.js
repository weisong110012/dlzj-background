import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/CompyAdmin/getList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/CompyAdmin/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/CompyAdmin/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/CompyAdmin/edit',
    method: 'post',
    data
  })
}
export function editPassword(data) {
  return request({
    url: '/CompyAdmin/editPassword',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/CompyAdmin/detail',
    method: 'post',
    data
  })
}
