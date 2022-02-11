<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input v-model="in_search" placeholder="请输入订单名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;" @input="fetchData" />
        </template>
        <el-button type="danger" @click="handleHeaderDeleteClick">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column label="供需内容" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.info }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="供需类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="吊篮数量">
          <template slot-scope="scope">
            <span>{{ scope.row.basket_count }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="吊篮单价">
          <template slot-scope="scope">
            <span>{{ scope.row.basket_price }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="是否面议">
          <template slot-scope="scope">
            <span>{{ scope.row.is_discuss?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="联系人">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="联系电话" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts_phone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建人">
          <template slot-scope="scope">
            <span>{{ scope.row.createuser.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="danger" :underline="false" icon="el-icon-delete" @click="handleDeleteClick([scope.row.demand_id])">删除</el-link>
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
import { getList, add, getdetail, edit, remove } from '@/api/demand'
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
  },
  methods: {
    handleSelectionChange(val) {
      this.tableSelection = val
    },
    handleHeaderDeleteClick() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.demand_id)
      })
      this.handleDeleteClick(ids)
    },
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
    handleDeleteClick(demand_id) {
      remove({ demand_id: demand_id.join(',') }).then(response => {
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
