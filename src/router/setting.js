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
      path: '/demandMange',
      "component": "layout/Layout",
      redirect: '/demandMange/demand',
      name: 'demandMange',
      meta: { title: '需求管理', icon: 'el-icon-s-comment' },
      children: [
        {
          path: 'demand',
          name: 'demand',
          component: 'views/demand/index',
          meta: { title: '需求管理', icon: 'el-icon-s-comment' },
          hidden:false
        }
      ]
    },
    {
      path: '/examMange',
      "component": "layout/Layout",
      redirect: '/examMange/exam',
      name: 'examMange',
      meta: { title: '考试管理', icon: 'el-icon-notebook-1' },
      children: [
        {
          path: 'exam',
          name: 'exam',
          component: 'views/exam/index',
          meta: { title: '考试报名', icon: 'el-icon-s-claim' },
          hidden:false
        },
        {
          path: 'testquestions',
          name: 'testquestions',
          component: 'views/testquestions/index',
          meta: { title: '试题管理', icon: 'el-icon-tickets' },
          hidden:false
        }
      ]
    },
    {
      path: '/documentMange',
      "component": "layout/Layout",
      name: 'documentMange',
      meta: { title: '文档管理', icon: 'el-icon-document' },
      children: [
        {
          path: 'document',
          name: 'document',
          component: 'views/document/index',
          meta: { title: '文档管理', icon: 'el-icon-document' },
          hidden:false
        }
      ]
    },
    {
      path: '/videoMange',
      "component": "layout/Layout",
      redirect: '/videoMange/demand',
      name: 'videoMange',
      meta: { title: '视频管理', icon: 'el-icon-video-play' },
      children: [
        {
          path: 'video',
          name: 'video',
          component: 'views/video/index',
          meta: { title: '视频管理', icon: 'el-icon-video-play' },
          hidden:false
        }
      ]
    },
    {
      path: '/bannerMange',
      "component": "layout/Layout",
      redirect: '/bannerMange/demand',
      name: 'bannerMange',
      meta: { title: '轮播图管理', icon: 'el-icon-picture' },
      children: [
        {
          path: 'banner',
          name: 'banner',
          component: 'views/banner/index',
          meta: { title: '轮播图管理', icon: 'el-icon-picture' },
          hidden:false
        }
      ]
    },
    {
      path: '/groupMange',
      "component": "layout/Layout",
      redirect: '/groupMange/group',
      name: 'groupMange',
      meta: { title: '轮播图管理', icon: 'el-icon-picture' },
      children: [
        {
          path: 'group',
          name: 'group',
          component: 'views/groupMange/index',
          meta: { title: '轮播图管理', icon: 'el-icon-picture' },
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
          path: 'company',
          name: 'company',
          component: 'views/company/index',
          meta: { title: '公司管理', icon: 'el-icon-office-building' },
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
        },
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
    },
]

module.exports=routes;
