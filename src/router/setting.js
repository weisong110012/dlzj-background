module.exports=[
    {
        "path": "",
        "component": "layout/Layout",
        "redirect": "dashboard",
        "children": [
            {
                "path": "/dashboard",
                "component": "views/dashboard/index",
                "name": "Dashboard",
                "meta": {
                    "title": "首页",
                    "icon": "dashboard",
                    "affix": true
                }
            }
        ]
    },
    {
      path: '/notice',
      "component": "layout/Layout",
      redirect: '/notice/notice',
      name: 'notice',
      meta: { title: '公告管理', icon: 'el-icon-postcard' },
      children: [
        {
          path: 'notice',
          name: 'notice',
          component: 'views/notice/index',
          meta: { title: '公告管理', icon: 'el-icon-postcard' },
          hidden:false
        }
      ]
    },
]
