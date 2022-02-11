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
export function exportExcelCard(data) {
  return request({
    url: '/examination/download',
    method: 'post',
    data
  })
}
export function sendExamTime(data) {
  return request({
    url: '/examination/sendExamTime',
    method: 'post',
    data
  })
}
export function sendDeferExamTime(data) {
  return request({
    url: '/examination/sendDeferExamTime',
    method: 'post',
    data
  })
}
export function sendReExamTime(data) {
  return request({
    url: '/examination/sendReExamTime',
    method: 'post',
    data
  })
}

export function setSign(data) {
  return request({
    url: '/examination/setSign',
    method: 'post',
    data
  })
}
export function setReport(data) {
  return request({
    url: '/examination/setReport',
    method: 'post',
    data
  })
}

export function sendAdopt(data) {
  return request({
    url: '/examination/sendAdopt',
    method: 'post',
    data
  })
}
export function sendUnadopt(data) {
  return request({
    url: '/examination/sendUnadopt',
    method: 'post',
    data
  })
}
