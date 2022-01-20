<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device!=='mobile'">
          <el-input placeholder="请输入公司名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;">
          </el-input>
        </template>
        <el-button type="primary">新增公司</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column type="selection" width="65" align="center">
        </el-table-column>
        <el-table-column label="公司名称" align="center">
          <template slot-scope="scope">
            <span>雄宇集团</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建人"  width="250">
          <template slot-scope="scope">
            <span>测试人员</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="创建时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" icon='el-icon-view'>查看公司</el-link>
            <el-link type="primary" :underline="false" icon="el-icon-edit" style='margin: 0 10px;'>编辑</el-link>
            <el-link type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="text-align: center;margin-top: 10px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div> -->
    </el-card>


  </div>
</template>

<script>
  import {
    getList
  } from '@/api/table'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
        ...mapGetters([
          'device'
        ])
      },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
</style>
