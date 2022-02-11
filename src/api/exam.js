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
export function setPhone(data) {
  return request({
    url: '/examination/setPhone',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/examination/removeExamination',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/examination/edit',
    method: 'post',
    data
  })
}
export function getdetail(data) {
  return request({
    url: '/examination/showReal',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: '/examination/exportExcel',
    method: 'post',
    data
  })
}
