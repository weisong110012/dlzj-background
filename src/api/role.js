import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/queryRoles',
    method: 'get',
    params
  })
}
