const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    roleName: '测试',
    remark: '测试'
  }]
})

module.exports = [
  {
    url: '/system/queryRoles',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: items,
        total: items.length*2,
        pageNum:1,
        pageSize:10
      }
    }
  }
]
