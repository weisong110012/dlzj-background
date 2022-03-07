import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/CompyDepartment/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/CompyDepartment/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/CompyDepartment/del',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/CompyDepartment/edit',
    method: 'post',
    data
  })
}