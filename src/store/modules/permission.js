import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import Layout from '@/layout'
const _import = require('@/utils/_import_' + process.env.NODE_ENV)

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(permission) {
  let res = permission.filter(route => {
    if (route.component) {
      if (route.component === 'layout/Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })
  return res
}


const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({
    commit
  }, {
    permission
  }) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(permission)
      let Route404=[{
        path: '*',
        redirect: '/404',
        hidden: true
      }]
      accessedRoutes=accessedRoutes.concat(Route404)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
