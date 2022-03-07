<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input v-model="in_search" placeholder="请输入管理员名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;" @input="fetchData" />
        </template>
        <el-button type="primary" @click="handleAddClick">新增管理员</el-button>
        <el-button type="danger" :disabled="tableSelection.length==0" @click="handleHeaderDeleteClick">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column label="账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="角色">
          <template slot-scope="scope">
            <span>{{ scope.row.role?scope.row.role.role_name:'--' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
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
        <el-pagination background hide-on-single-page :page-size="pagination.pageSize" :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total" />
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? '编辑' : '新增'" :fullscreen="device == 'mobile'">
      <el-form :model="addModel" label-width="80px" label-position="left">
        <el-form-item label="账号"><el-input v-model="addModel.account" placeholder="请输入" /></el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addModel.compy_role_id" placeholder="请选择"><el-option v-for="item in roleList" :key="item.id" :label="item.role_name" :value="item.id+''" /></el-select>
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
import { getList, add, getdetail, edit, remove } from '@/api/companyadmin'
import { getList as getRoleList } from '@/api/companyrole'
import { mapGetters } from 'vuex'

const defaultModel = {
  account: '',
  compy_role_id: ''
}

export default {
  computed: {
    ...mapGetters(['device'])
  },
  data() {
    return {
      tableSelection: [],
      in_search: '',
      list: null,
      roleList: null,
      listLoading: true,
      addModel: Object.assign({}, defaultModel),
      dialogVisible: false,
      dialogType: 'add',
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created() {
    this.fetchData()
    getRoleList({is_all:1}).then(res => {
      this.roleList = res.data
    })
  },
  methods: {
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
      this.addModel = Object.assign({}, defaultModel)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEditClick(item) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      getdetail({ id: item.id }).then(res => {
        this.addModel = res.data
      })
    },
    handleDeleteClick(account) {
      remove({ id: account.join(',') }).then(response => {
        if (response.code === 200) {
          this.fetchData()
        }
      })
    },
    confirmRole() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        edit(this.addModel).then(response => {
          if (response.code === 200) {
            this.dialogVisible = false
            this.fetchData()
          }
        })
      } else {
        add(this.addModel).then(response => {
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
