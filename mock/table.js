const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    'status|1': ['published', 'draft', 'deleted'],
    author: '测试',
    display_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
