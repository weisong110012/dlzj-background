<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input v-model="in_search" placeholder="请输入角色名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;" @input="fetchData" />
        </template>
        <el-button type="primary" @click="handleAddClick">新增角色</el-button>
        <el-button type="danger" :disabled="tableSelection.length==0" @click="handleHeaderDeleteClick">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column label="角色id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.role_name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建人">
          <template slot-scope="scope">
            <span>{{ scope.row.create_user }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template v-if="scope.row.id!=1" slot-scope="scope">
            <el-link type="primary" :underline="false" icon="el-icon-edit" style="margin: 0 10px;" @click="handleEditClick(scope.row)">编辑</el-link>
            <el-popconfirm
              title="确定要删除吗？"
              confirm-button-text="删除"
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDeleteClick([scope.row.id])"
            >
              <el-link slot="reference" type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background hide-on-single-page :page-size="pagination.pageSize" :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total" @current-change="currentChange"/>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? '编辑角色' : '新增角色'" :fullscreen="device == 'mobile'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称"><el-input v-model="role.role_name" placeholder="请输入角色名称" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="role.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入角色备注" /></el-form-item>
        <el-form-item label="权限">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getList, add, getdetail, edit, remove } from '@/api/companyrole'
import { mapGetters } from 'vuex'

import Routes from '@/router/grouproutes.js'

const defaultRole = {
  role_name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      tableSelection: [],
      in_search: '',
      list: null,
      listLoading: true,
      role: Object.assign({}, defaultRole),
      dialogVisible: false,
      checkStrictly: false,
      routesData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      dialogType: 'add',
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 0
      }
    }
  },
  computed: {
    ...mapGetters(['device'])
  },
  created() {
    this.fetchData()
    this.routesData = this.generateRoutes(Routes)
  },
  methods: {
    currentChange(curren) {
      this.pagination.pageNum = curren
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.tableSelection = val
    },
    handleHeaderDeleteClick() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.id)
      })
      this.handleDeleteClick(ids)
    },
    generateRoutes(routes, basePath = '/') {
      const res = []
      for (let route of routes) {
        if (route.hidden) {
          continue
        }
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }
        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }
      if (showingChildren.length === 0) {
        onlyOneChild = {
          ...parent,
          path: '',
          noShowingChildren: true
        }
        return onlyOneChild
      }
      return false
    },
    fetchData() {
      this.listLoading = true
      getList({ in_search: this.in_search, page: this.pagination.pageNum, page_size: this.pagination.pageSize }).then(response => {
        this.list = response.data.data
        this.pagination.total = response.data.total
        this.pagination.pageNum = response.data.current_page
        this.listLoading = false
      })
    },
    handleAddClick() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEditClick(item) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      getdetail({ id: item.id }).then(res => {
        this.role = res.data
        this.$nextTick(() => {
          const routes = this.generateRoutes(JSON.parse(res.data.permission))
          this.$refs.tree.setCheckedNodes(this.generateArr(routes))
          this.checkStrictly = false
        })
      })
    },
    handleDeleteClick(ids) {
      remove({ id: ids.join(',') }).then(response => {
        if (response.code === 200) {
          this.fetchData()
        }
      })
    },
    confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(Routes), '/', checkedKeys)
      if (isEdit) {
        const role = this.role
        const data = {
          id: role.id,
          role_name: role.role_name,
          description: role.description,
          permission: JSON.stringify(role.routes)
        }
        edit(data).then(response => {
          if (response.code === 200) {
            this.dialogVisible = false
            this.fetchData()
          }
        })
      } else {
        const role = this.role
        const data = {
          role_name: role.role_name,
          description: role.description,
          permission: JSON.stringify(role.routes)
        }
        add(data).then(response => {
          if (response.code === 200) {
            this.dialogVisible = false
            this.fetchData()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
