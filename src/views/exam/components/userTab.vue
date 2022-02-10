<template>
  <div>
    <el-tabs type="border-card" tab-position="top" :value="type" @tab-click='toggleType'>
      <el-tab-pane label="按学员">
        <el-row style="text-align: right;padding-bottom: 18px;">
          <el-date-picker v-model="exam_time" type="date" placeholder="筛选考试日期" style="margin-right: 10px;" @change='fetchData'>
          </el-date-picker>
          <el-button size="medium" type="success">开班</el-button>
          <el-button size="medium" type="primary">设置</el-button>
          <el-button size="medium" type="warning">导出</el-button>
          <el-button size="medium" type="danger">删除</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column type="selection" width="65" align="center"></el-table-column>
          <el-table-column label="学员姓名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.contacts }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.contacts_phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证" align="center">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-view" style="margin: 0 10px;">查看</el-link>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="创建时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" align="center" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusTypeFilter">{{scope.row.status | statusFilter}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-edit" style="margin: 0 10px;">编辑</el-link>
              <el-link type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background hide-on-single-page :page-size="pagination.pageSize"
            :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按创建人">
        <el-row style="text-align: right;padding-bottom: 18px;">
          <el-date-picker v-model="exam_time" type="date" placeholder="筛选考试日期" style="margin-right: 10px;" @change='fetchData'>
          </el-date-picker>
          <el-button size="medium" type="success">开班</el-button>
          <el-button size="medium" type="primary">设置</el-button>
          <el-button size="medium" type="warning">导出</el-button>
          <el-button size="medium" type="danger">删除</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column type="selection" width="65" align="center"></el-table-column>
          <el-table-column label="创建人昵称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人姓名" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.real_info?scope.row.real_info.Name:'--' }}</span>
            </template>.N
          </el-table-column>
          <el-table-column label="联系电话" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="人数" align="center">
            <template slot-scope="scope">
              {{scope.row.examination?scope.row.examination.length:'--'}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-view" style="margin: 0 10px;">查看</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background hide-on-single-page :page-size="pagination.pageSize"
            :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    getList,
    getCreateList
  } from '@/api/exam'
  import {
    mapGetters
  } from 'vuex'

  const defaultNotice = {
    title: '',
    image: undefined,
    note: ''
  }
  export default {
    computed: {
      ...mapGetters(['device'])
    },
    props: ['status'],
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '排队中',
          1: '已报名',
          2: '待报道',
          3: '已报道',
          4: '已通过',
          5: '未通过'
        }
        return statusMap[status]
      },
      statusTypeFilter(status) {
        const statusMap = {
          0: 'info',
          1: 'gray',
          2: 'warning',
          3: 'info',
          4: 'success',
          5: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        type: '0',
        listLoading: true,
        exam_time: '',
        noticeModel: Object.assign({}, defaultNotice),
        dialogVisible: false,
        dialogType: 'add',
        pagination: {
          total: 0,
          pageSize: 10,
          pageNum: 0
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      toggleType(t) {
        this.type = t.index
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        if (this.type == '0') {
          getList({
            status: this.status,
            exam_time:this.exam_time
          }).then(response => {
            this.list = response.data.data
            this.listLoading = false
          })
        } else {
          getCreateList({
            status: this.status,
            exam_time:this.exam_time
          }).then(response => {
            this.list = response.data.data
            this.listLoading = false
          })
        }

      },
      handleAddClick() {
        this.noticeModel = Object.assign({}, defaultNotice)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      changeUpload(file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.noticeModel.image = file.raw
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 30vw;
    height: 200px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 30vw;
    height: 200px;
    display: block;
  }
</style>
