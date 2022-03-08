import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/FileCarousel/index',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/FileCarousel/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/FileCarousel/del',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/FileCarousel/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/FileCarousel/red',
    method: 'post',
    data
  })
}
