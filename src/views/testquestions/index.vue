<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device!=='mobile'">
          <el-input v-model="searchName" placeholder="请输入试题名称" prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;">
          </el-input>
        </template>
        <el-button @click='handleAddClick' type="primary">新增试题</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column type="selection" width="65" align="center">
        </el-table-column>
        <el-table-column class-name="status-col" label="试题名称" align="center">
          <template slot-scope="scope">
            <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
              党的十八大对未来我国道德建设也做出了重要部署。强调要坚持依法治国和以德治国相结合，加强社会公德、职业道德、家庭美德、个人品德教育，弘扬中华传统美德，弘扬时代新风，指出了道德修养的（  ）性。
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="试题种类" width="150">
          <template slot-scope="scope">
            单选题
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="试题类型" align="center" width="150">
          <template slot-scope="scope">
            <el-tag type="success">操作工</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" icon="el-icon-edit" style='margin: 0 10px;'>编辑</el-link>
            <el-link type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background hide-on-single-page :page-size='pagination.pageSize'
          :current-page='pagination.pageNum' layout="prev, pager, next" :total="pagination.total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑公告':'新增公告'" :fullscreen="device=='mobile'">
      <el-form :model="noticeModel" label-width="80px" label-position="right">
        <el-form-item label="试题">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :auto-upload="false" :on-change="changeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{width:device=='mobile'?'50vw':'30vw'}">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="noticeModel.title"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input type="textarea" v-model="noticeModel.note" :autosize='{ minRows: 6, maxRows: 6 }'></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getList
  } from '@/api/table'
  import {
    mapGetters
  } from 'vuex'


  const defaultNotice = {
    title: '',
    image:undefined,
    note: ''
  }
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
        listLoading: true,
        searchName: '',
        noticeModel: Object.assign({}, defaultNotice),
        imageUrl:'http://dl.chi86.com/uploads/public/notice.jpg',
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
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      handleAddClick() {
        this.noticeModel = Object.assign({}, defaultNotice)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      changeUpload(file){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.noticeModel.image=file.raw
      },
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 20px;
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
      border-color: #409EFF;
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
      width:30vw;
      height: 200px;
      display: block;
    }
</style>
