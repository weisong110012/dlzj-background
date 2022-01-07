const routes=[
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
          meta: { title: '公告列表', icon: 'el-icon-postcard' },
          hidden:false
        }
      ]
    },
    {
      path: '/message',
      "component": "layout/Layout",
      redirect: '/message/message',
      name: 'message',
      meta: { title: '通知管理', icon: 'el-icon-s-comment' },
      children: [
        {
          path: 'message',
          name: 'message',
          component: 'views/message/index',
          meta: { title: '通知列表', icon: 'el-icon-s-comment' },
          hidden:false
        }
      ]
    },
    {
      path: '/system',
      "component": "layout/Layout",
      name: 'system',
      meta: { title: '系统管理', icon: 'el-icon-setting' },
      children: [
        {
          path: 'user',
          name: 'user',
          component: 'views/system/user/index',
          meta: { title: '用户管理', icon: 'el-icon-user' },
          hidden:false
        },
        {
          path: 'admin',
          name: 'admin',
          component: 'views/system/admin/index',
          meta: { title: '管理员管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'role',
          name: 'role',
          component: 'views/system/role/index',
          meta: { title: '角色管理', icon: 'el-icon-s-custom' },
          hidden:false
        }
      ]
    },
]

module.exports=routes;
