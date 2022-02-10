<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input v-model="in_search" placeholder="请输入公告名称" prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;" @input="fetchData" />
        </template>
        <el-button type="primary" @click="handleAddClick">新增公告</el-button>
      </el-row>

      <el-row>
        <el-col v-for="item in list" :key="item.id" :xs="24" :sm="24" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="header">
              <el-image class="header-img" :preview-src-list="[item.image_path]" :src="item.image_path" fit="fill" />
            </div>
            <div class="body">
              <div class="title">{{ item.title }}</div>
              <div class="body">{{ item.note }}</div>
              <div class="foot">
                <div class="time">{{ item.create_time }}</div>
                <div class="user" />
              </div>
            </div>
            <div class="footer">
              <div class="btn" @click="handleEditClick(item)">编辑</div>
              <div class="btn delete" @click="handleDeleteClick(item)">删除</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background hide-on-single-page :page-size="pagination.pageSize"
          :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total"
          @current-change="currentChange" />
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? '编辑公告' : '新增公告'"
      :fullscreen="device == 'mobile'">
      <el-form :model="noticeModel" label-width="80px" label-position="right">
        <el-form-item label="公告封面">
          <el-upload ref="upload" class="avatar-uploader" :data="noticeModel" :headers="headers" name="image"
            :action="dialogType === 'edit' ?APiBefore+'/notice/edit':APiBefore+'/notice/add'" :show-file-list="false"
            :auto-upload="false" :on-change="changeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar"
              :style="{ width: device == 'mobile' ? '50vw' : '30vw' }">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="公告名称">
          <el-input v-model="noticeModel.title" />
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input v-model="noticeModel.note" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" />
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
  } from '@/api/notice'
  import {
    mapGetters
  } from 'vuex'
  import {
    getToken
  } from '@/utils/auth'
  const defaultNotice = {
    title: '',
    image: undefined,
    note: ''
  }
  export default {
    computed: {
      ...mapGetters(['device'])
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
        headers: {
          'X-Token': getToken()
        },
        list: null,
        listLoading: true,
        in_search: '',
        noticeModel: Object.assign({}, defaultNotice),
        APiBefore:process.env.VUE_APP_BASE_API,
        imageUrl: 'http://dl.chi86.com/uploads/public/notice.jpg',
        dialogVisible: false,
        dialogType: 'add',
        pagination: {
          total: 0,
          pageSize: 8,
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
        getList({
          in_search: this.in_search,
          page: this.pagination.pageNum,
          page_size: this.pagination.pageSize
        }).then(response => {
          this.list = response.data.data
          this.pagination.total = response.data.total
          this.pagination.pageNum = response.data.current_page
          this.listLoading = false
        })
      },
      handleAddClick() {
        this.noticeModel = Object.assign({}, defaultNotice)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEditClick(item) {
        this.noticeModel = item
        this.noticeModel.image = null
        this.imageUrl = item.image_path
        this.dialogType = 'edit'
        this.dialogVisible = true
      },
      handleDeleteClick(item) {
        remove({
          notice_id: item.notice_id.toString()
        }).then(response => {
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
      },
      changeUpload(file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.noticeModel.image = file
      },
      confirmRole() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          if (this.noticeModel.image) {
            this.$refs.upload.submit()
            this.dialogVisible = false
            this.fetchData()
          } else {
            edit(this.noticeModel).then(response => {
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
        } else {
          if (this.noticeModel.image) {
            this.$refs.upload.submit()
            this.dialogVisible = false
            this.fetchData()
          } else {
            add(this.noticeModel).then(response => {
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
  }
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 10px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .card-panel {
      position: relative;
      height: 350px;
      box-shadow: 0px 2px 10px #ccc;
      border-radius: 6px;
      overflow: hidden;
      margin: 10px;
      transition: all 100ms linear;

      &:hover {
        box-shadow: 0px 1px 4px #ddd;
      }

      .header {
        .header-img {
          width: 100%;
          height: 150px;
        }
      }

      .body {
        cursor: default;
        margin-bottom: 8px;

        .title {
          font-size: 16px;
          font-weight: bold;
          padding: 5px 10px;
          border-bottom: 1px dashed #eee;
          color: #555;
        }

        .body {
          // padding: 0 10px;
          margin: 20px 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          text-indent: 2em;
          font-size: 14px;
          line-height: 20px;
          color: #666;
          height: 60px;
        }

        .foot {
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #666;

          .time {
            color: rgb(235, 196, 175);
          }
        }
      }

      .footer {
        border-top: 1px dashed #eee;
        display: flex;
        padding: 7px 10px;
        justify-content: flex-end;

        .btn {
          transform: translateZ(40px);
          cursor: pointer;
          color: #fff;
          border-radius: 20px;
          border: none;
          background: linear-gradient(135deg, #1a9be6, #1a57e6);
          width: 70px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 13px;
          margin-left: 10px;

          &::before {
            transition: 300ms ease;
            position: absolute;
            display: block;
            content: '';
            transform: translateZ(-40px);
            height: calc(100% - 20px);
            width: calc(100% - 20px);
            border-radius: 100px;
            left: 8px;
            top: 10px;
            box-shadow: 0 0 8px 8px rgb(26 87 230 / 25%);
          }
        }

        .delete {
          background: linear-gradient(135deg, #e61a80, #e61a3c);

          &::before {
            box-shadow: 0 0 8px 8px rgb(230 26 60 / 25%);
          }
        }
      }
    }
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
