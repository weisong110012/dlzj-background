const routes=[
    {
      path: '/groupMange',
      "component": "layout/Layout",
      name: 'groupMange',
      meta: { title: '部门管理', icon: 'el-icon-postcard' },
      children: [
        {
          path: 'group',
          name: 'group',
          component: 'views/group/index',
          meta: { title: '部门管理', icon: 'el-icon-postcard' },
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
          path: 'groupadmin',
          name: 'groupadmin',
          component: 'views/system/groupadmin/index',
          meta: { title: '管理员管理', icon: 'el-icon-s-custom' },
          hidden:false
        },
        {
          path: 'grouprole',
          name: 'grouprole',
          component: 'views/system/grouprole/index',
          meta: { title: '角色管理', icon: 'el-icon-s-custom' },
          hidden:false
        }
      ]
    }
]

module.exports=routes;
