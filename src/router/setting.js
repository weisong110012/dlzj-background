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
      path: '/yeuw',
      "component": "layout/Layout",
      name: 'yeuw',
      meta: { title: '业务管理', icon: 'el-icon-setting' },
      children: [
        {
          path: 'order',
          name: 'order',
          component: 'views/user/index',
          meta: { title: '订单管理', icon: 'el-icon-user' },
          hidden:false
        },
        {
          path: 'demand',
          name: 'demand',
          component: 'views/admin/index',
          meta: { title: '需求管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'document',
          name: 'document',
          component: 'views/admin/index',
          meta: { title: '文档管理', icon: 'el-icon-s-custom' },
          hidden:false
        }
      ]
    },
    {
      path: '/kaoshi',
      "component": "layout/Layout",
      name: 'kaoshi',
      meta: { title: '考试管理', icon: 'el-icon-setting' },
      children: [
        {
          path: 'examination',
          name: 'examination',
          component: 'views/user/index',
          meta: { title: '报名管理', icon: 'el-icon-user' },
          hidden:false
        },
        {
          path: 'question',
          name: 'question',
          component: 'views/admin/index',
          meta: { title: '试题管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'video',
          name: 'video',
          component: 'views/admin/index',
          meta: { title: '学习视频管理', icon: 'el-icon-s-custom' },
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
          component: 'views/user/index',
          meta: { title: '用户管理', icon: 'el-icon-user' },
          hidden:false
        },
        {
          path: 'admin',
          name: 'admin',
          component: 'views/admin/index',
          meta: { title: '管理员管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'role',
          name: 'role',
          component: 'views/admin/index',
          meta: { title: '角色管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'auth',
          name: 'auth',
          component: 'views/admin/index',
          meta: { title: '权限管理', icon: 'el-icon-s-custom' },
          hidden:false
        }
      ]
    },
]
