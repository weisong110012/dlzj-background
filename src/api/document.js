import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/FileDocument/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/FileDocument/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/FileDocument/del',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/FileDocument/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/FileDocument/read',
    method: 'post',
    data
  })
}
