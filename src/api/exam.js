import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/examination/index',
    method: 'post',
    data
  })
}
export function getCreateList(data) {
  return request({
    url: '/examination/indexCreate',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/order/remove',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/order/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/order/detail',
    method: 'post',
    data
  })
}
