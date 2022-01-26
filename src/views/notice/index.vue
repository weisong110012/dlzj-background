<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input
            v-model="searchName"
            placeholder="请输入公告名称"
            prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;"
          ></el-input>
        </template>
        <el-button @click="handleAddClick" type="primary">新增公告</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col" v-for='i in 3' :key='i'>
          <div class="card-panel">
            <div class="header">
              <el-image
                class="header-img"
                :preview-src-list="['http://dl.chi86.com/uploads/20210826/85ef2802eee97996dbf22cd46306a377.jpg']"
                src="http://dl.chi86.com/uploads/20210826/85ef2802eee97996dbf22cd46306a377.jpg"
                fit="fill"
              ></el-image>
            </div>
            <div class="body">
              <div class="title">通知公告</div>
              <div class="body">
                雄宇使命：追求全体员工物质幸福和精神幸福的同时，用心创造最满意的产品和水平的服务；雄宇愿景：树国际品牌，立行业标杆，做百年企业
              </div>
              <div class="foot">
                <div class="time">2021-02-04</div>
                <div class="user">未松松</div>
              </div>
            </div>
            <div class="footer">
              <div class="btn" @click="handleAddClick">编辑</div>
              <div class="btn delete">删除</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination
          background
          hide-on-single-page
          :page-size="pagination.pageSize"
          :current-page="pagination.pageNum"
          layout="prev, pager, next"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑公告' : '新增公告'"
      :fullscreen="device == 'mobile'"
    >
      <el-form :model="noticeModel" label-width="80px" label-position="right">
        <el-form-item label="公告封面">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="changeUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              :style="{ width: device == 'mobile' ? '50vw' : '30vw' }"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="公告名称"><el-input v-model="noticeModel.title"></el-input></el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="noticeModel.note" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'

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
      list: null,
      listLoading: true,
      searchName: '',
      noticeModel: Object.assign({}, defaultNotice),
      imageUrl: 'http://dl.chi86.com/uploads/public/notice.jpg',
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
  .card-panel {
    position: relative;
    height: 350px;
    box-shadow: 0px 5px 10px #ccc;
    border-radius: 6px;
    overflow: hidden;
    margin: 10px;
    .header {
      .header-img {
        width: 100%;
        height: 150px;
      }
    }
    .body {
      margin-bottom: 8px;
      .title {
        font-size: 16px;
        font-weight: bold;
        padding: 5px 10px;
        border-bottom: 1px dashed #ddd;
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
      border-top: 1px dashed #ccc;
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
