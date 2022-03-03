<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input
            placeholder="请输入公司名称"
            prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;"
          />
        </template>
        <el-button type="primary" @click="handleAddClick">新增公司</el-button>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col" v-for="(item, index) in list" :key="index">
          <div class="card-panel">
            <div class="panel front">
              <div class="header">
                <div class="title">{{ item.name }}</div>
              </div>
              <div class="footer">
                <ul class="group-info">
                  <li class="title">公司信息</li>
                  <li class="info">
                    <span>名称:</span>
                    <span>{{ item.name }}</span>
                  </li>
                  <li class="info">
                    <span>地址:</span>
                    <span>{{ item.address }}</span>
                  </li>
                  <li class="info">
                    <span>创建人:</span>
                    <span>{{ item.contact }}</span>
                  </li>
                  <li class="info">
                    <span>创建时间:</span>
                    <span>{{ item.create_time }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="panel back">
              <button class="btn">管理</button>
              <button class="btn" @click="handleEditClick(item)">编辑</button>
              <el-button slot="reference" class="btn delete" @click='deleteVisible=true;addModel=item'>删除</el-button>
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
          @current-change="currentChange"
        />
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑公司' : '新增公司'"
      :fullscreen="device == 'mobile'"
    >
      <el-form :model="addModel" label-width="80px" label-position="right">
        <el-form-item label="公司名称"><el-input v-model="addModel.name" /></el-form-item>
        <el-form-item label="联系人"><el-input v-model="addModel.contact" /></el-form-item>
        <el-form-item label="联系电话"><el-input type="Number" v-model="addModel.contact_phone" /></el-form-item>
        <el-form-item label="公司地址">
          <el-input placeholder="请选取地址" v-model="addModel.address" class="input-with-select" :disabled="true">
            <el-button slot="append" type="primary" icon="el-icon-position" @click="mapVisible = true">
              选取地址
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="公司描述">
          <el-input v-model="addModel.description" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="mapVisible" :fullscreen="true">
      <iframe
        style="position: fixed;left: 0;top: 40px;bottom: 0;right: 0;z-index: 9999;"
        id="mapPage"
        width="100%"
        height="100%"
        frameborder="0"
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=ZXMBZ-2GZCK-RCJJ2-ACECV-W3VBZ-WCBIN&referer=myapp"
      ></iframe>
    </el-dialog>
    <el-dialog
      title="确定删除此公司吗？"
      :visible.sync="deleteVisible"
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteClick(addModel);deleteVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, add, edit, remove } from '@/api/company'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

const defaultModel = {
  name: '',
  contact: '',
  contact_phone: '',
  address: '',
  description: '',
  image: '',
  gps_x: '',
  gpx_y: ''
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
      addModel: Object.assign({}, defaultModel),
      APiBefore: process.env.VUE_APP_BASE_API,
      imageUrl: 'http://dl.chi86.com/uploads/public/notice.jpg',
      dialogVisible: false,
      mapVisible: false,
      deleteVisible:false,
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
    this.listen()
  },
  methods: {
    listen() {
      let that = this
      window.addEventListener(
        'message',
        function(event) {
          var loc = event.data
          if (loc && loc.module == 'locationPicker') {
            that.addModel.address = loc.poiaddress
            that.addModel.gps_x = loc.latlng.lng
            that.addModel.gpx_y = loc.latlng.lat
            that.mapVisible = false
          }
          return false
        },
        false
      )
    },
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
      this.addModel = Object.assign({}, defaultModel)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEditClick(item) {
      this.addModel = item
      this.addModel.image = null
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleDeleteClick(item) {
      remove({
        id: item.id.toString()
      }).then(response => {
        if (response.code === 200) {
          this.pagination.pageNum = 1
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
  background-color: #ecf0f9;
  position: relative;

  .card-panel {
    position: relative;
    height: 350px;
    perspective: 1000px;
    cursor: pointer;
    .panel {
      position: absolute;
      left: 10px;
      top: 10px;
      right: 10px;
      bottom: 10px;
      backface-visibility: hidden;
      transition: ease-in-out 600ms;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0px 6px 18px 0 rgba(0, 0, 0, 0.19);
    }

    .front {
      background: #fff;
      background-size: 100% 100%;
      .header {
        height: 150px;
        background: linear-gradient(135deg, rgb(53, 138, 255), rgb(60, 108, 254));
        .title {
          font-size: 22px;
          color: #fff;
          text-shadow: 0px 0px 5px #fff;
          text-align: center;
          line-height: 150px;
          white-space: nowrap;
        }
      }
      .footer {
        padding: 10px;
        .group-info {
          list-style: none;
          text-align: left;
          margin: 0;
          padding: 0;
          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .info {
            margin-top: 14px;
            font-size: 14px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .back {
      background: #fff;
      background-size: 100% 100%;
      transform: rotateY(-180deg);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 60px 0;
      .btn {
        transform: translateZ(40px);
        cursor: pointer;
        font-weight: bold;
        color: #fff;
        padding: 0.75em 1em;
        border-radius: 100px;
        font: inherit;
        border: none;
        position: relative;
        transform-style: preserve-3d;
        transition: 300ms ease;
        background: linear-gradient(135deg, #1a9be6, #1a57e6);
        width: 60%;
        &::before {
          transition: 300ms ease;
          position: absolute;
          display: block;
          content: '';
          transform: translateZ(-40px);
          height: calc(100% - 20px);
          width: calc(100% - 20px);
          border-radius: 100px;
          left: 10px;
          top: 16px;
          box-shadow: 0 0 10px 10px rgb(26 87 230 / 25%);
        }
      }
      .delete {
        background: linear-gradient(135deg, #e61a80, #e61a3c);
        &::before {
          box-shadow: 0 0 10px 10px rgb(230 26 60 / 25%);
        }
      }
    }
  }

  .card-panel:hover .front {
    transform: rotateY(180deg);
  }

  .card-panel:hover .back {
    transform: rotateY(0deg);
  }
}
</style>
