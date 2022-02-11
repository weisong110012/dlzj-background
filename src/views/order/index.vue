<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input v-model="in_search" placeholder="请输入订单名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;" @input="fetchData" />
        </template>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="发布类型">
          <template slot-scope="scope">
            <span>{{ scope.row.issue_type }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="订单类型">
          <template slot-scope="scope">
            <span>{{ scope.row.order_type }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="订单状态">
          <template slot-scope="scope">
            <span>{{ scope.row.order_status }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="订单接取人">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建人">
          <template slot-scope="scope">
            <span>{{ scope.row.create_user }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="接取时间">
          <template slot-scope="scope">
            <span>{{ scope.row.take_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="danger" :underline="false" icon="el-icon-delete" @click="handleDeleteClick([scope.row.order_id])">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background hide-on-single-page :page-size="pagination.pageSize" :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total" @current-change="currentChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList, add, getdetail, edit, remove } from '@/api/order'
import { mapGetters } from 'vuex'

const defaultModel = {
  account: '',
  role_id: ''
}

export default {
  computed: {
    ...mapGetters(['device'])
  },
  data() {
    return {
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
  },
  methods: {
    currentChange(curren) {
      this.pagination.pageNum = curren
      this.fetchData()
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
    handleDeleteClick(order_id) {
      remove({ order_id: order_id.join(',') }).then(response => {
        if (response.code != 200) {
          Message({
            message: res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          this.fetchData()
        }
      })
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
