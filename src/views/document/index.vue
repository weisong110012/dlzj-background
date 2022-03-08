<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="上传时间">
          <template slot-scope="scope">
            <span>{{ scope.row.upload_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" style="margin: 0 10px;" icon="el-icon-edit"
              @click="handleEditClick(scope.row)">编辑</el-link>
            <el-link type="success" :underline="false" icon="el-icon-download" :href='scope.row.file_path'>下载</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background hide-on-single-page :page-size="pagination.pageSize"
          :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total" />
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? '编辑' : '新增'"
      :fullscreen="device == 'mobile'">
      <el-form :model="addModel" label-width="80px" label-position="right">
        <el-form-item label="文件名称">
          <el-input v-model="addModel.title" />
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload ref="upload" class="avatar-uploader" :data="addModel" :headers="headers" accept='application/pdf'
            :action="APiBefore+'/document/edit'" :show-file-list="false" :auto-upload="false" :on-change="changeUpload">
            <span>
              {{addModel.file_name}}
            </span>
          </el-upload>
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
  import {
    getList,
    add,
    getdetail,
    edit,
    remove
  } from '@/api/document'
  import {
    mapGetters
  } from 'vuex'
  import {
    getToken
  } from '@/utils/auth'

  const defaultModel = {
    title: '',
    id: '',
    file: ''
  }

  export default {
    computed: {
      ...mapGetters(['device'])
    },
    data() {
      return {
        in_search: '',
        headers: {
          'X-Token': getToken()
        },
        APiBefore:process.env.VUE_APP_BASE_API,
        list: null,
        roleList: null,
        listLoading: true,
        addModel: Object.assign({}, defaultModel),
        dialogVisible: false,
        dialogType: 'edit',
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
      fetchData() {
        this.listLoading = true
        getList({
          in_search: this.in_search,
          page: this.pagination.pageNum,
          page_size: this.pagination.pageSize
        }).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      changeUpload(file) {
        this.addModel.file_name = file.name
        this.addModel.file = file.name
      },
      handleEditClick(item) {
        this.addModel = item
        this.dialogVisible=true
        this.addModel.file = null
        this.dialogType='edit'
      },
      confirmRole() {
        if (this.addModel.file) {
          this.$refs.upload.submit()
          this.dialogVisible = false
          this.fetchData()
        } else {
          edit(this.addModel).then(response => {
            if (response.code != 200) {
              Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
              })
            } else {
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
