const routes=[
    {
      path: '/noticeMange',
      "component": "layout/Layout",
      redirect: '/noticeMange/notice',
      name: 'noticeMange',
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
    {
      path: '/orderMange',
      "component": "layout/Layout",
      redirect: '/orderMange/order',
      name: 'orderMange',
      meta: { title: '订单管理', icon: 'el-icon-s-order' },
      children: [
        {
          path: 'order',
          name: 'order',
          component: 'views/order/index',
          meta: { title: '订单管理', icon: 'el-icon-s-order' },
          hidden:false
        }
      ]
    },
    {
      path: '/user',
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
