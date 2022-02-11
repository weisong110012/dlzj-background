<template>
  <div>
    <el-tabs type="border-card" tab-position="top" :value="type" @tab-click="toggleType">
      <el-tab-pane label="按学员">
        <el-row style="text-align: right;padding-bottom: 18px;">
          <template v-if="device !== 'mobile'">
            <el-date-picker
              v-model="exam_time"
              type="date"
              placeholder="筛选考试日期"
              style="margin-right: 10px;"
              @change="fetchData"
            />
          </template>
          <el-button size="medium" type="primary" style="margin: 5px;" @click="handelSetting">设置</el-button>
          <el-button
            v-if="status==0"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handelAllClick"
          >报名</el-button>
          <el-button
            v-if="status==1"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >开班</el-button>
          <el-button
            v-if="status==2"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >延期</el-button>
          <el-button
            v-if="status==2"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handelAllClick"
          >报道</el-button>
          <el-button
            v-if="status==3"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >通过</el-button>
          <el-button
            v-if="status==3"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >未通过</el-button>
          <el-button
            v-if="status==5"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >重新报名</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="warning"
            style="margin: 5px;"
            @click="handelExport"
          >导出excel</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="warning"
            style="margin: 5px;"
            @click="handelExportCard"
          >导出身份证</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="danger"
            style="margin: 5px;"
            @click="handleHeaderDeleteClick"
          >删除</el-button>
        </el-row>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="65" align="center" />
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
              <el-tag v-if="!scope.row.isEdit" :type="scope.row.status | statusTypeFilter">
                {{ scope.row.status | statusFilter }}
              </el-tag>
              <el-select
                v-if="scope.row.isEdit"
                v-model="scope.row.status"
                placeholder="请选择"
                @change="editType(scope.row)"
              >
                <el-option key="0" label="排队中" value="0" />
                <el-option key="1" label="已报名" value="1" />
                <el-option key="2" label="待报道" value="2" />
                <el-option key="3" label="已报道" value="3" />
                <el-option key="4" label="已通过" value="4" />
                <el-option key="5" label="未通过" value="5" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                icon="el-icon-edit"
                style="margin: 0 10px;"
                :disabled="scope.row.isEdit"
                @click="scope.row.isEdit=true"
              >编辑状态</el-link>
              <el-link
                type="danger"
                :underline="false"
                icon="el-icon-delete"
                @click="handleDeleteClick([scope.row.exam_id])"
              >删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination
            background
            hide-on-single-page
            :page-size="pagination.pageSize"
            :current-page="pagination.pageNum"
            layout="prev, pager, next"
            :total="pagination.total"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="按创建人">
        <el-row style="text-align: right;padding-bottom: 18px;">
          <template v-if="device !== 'mobile'">
            <el-date-picker
              v-model="exam_time"
              type="date"
              placeholder="筛选考试日期"
              style="margin-right: 10px;"
              @change="fetchData"
            />
          </template>
          <el-button size="medium" type="primary" style="margin: 5px;" @click="handelSetting">设置</el-button>
          <el-button
            v-if="status==0"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handelAllClick"
          >报名</el-button>
          <el-button
            v-if="status==1"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >开班</el-button>
          <el-button
            v-if="status==2"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >延期</el-button>
          <el-button
            v-if="status==2"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handelAllClick"
          >报道</el-button>
          <el-button
            v-if="status==3"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >通过</el-button>
          <el-button
            v-if="status==3"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >未通过</el-button>
          <el-button
            v-if="status==5"
            v-show="tableSelection.length!=0"
            size="medium"
            type="success"
            style="margin: 5px;"
            @click="handleAddExamClick"
          >重新报名</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="warning"
            style="margin: 5px;"
            @click="handelExport"
          >导出excel</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="warning"
            style="margin: 5px;"
            @click="handelExportCard"
          >导出身份证</el-button>
          <el-button
            v-show="tableSelection.length!=0"
            size="medium"
            type="danger"
            style="margin: 5px;"
            @click="handleHeaderDeleteClick"
          >删除</el-button>
        </el-row>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="65" align="center" />
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
              {{ scope.row.examination?scope.row.examination.length:'--' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-view" style="margin: 0 10px;">查看</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination
            background
            hide-on-single-page
            :page-size="pagination.pageSize"
            :current-page="pagination.pageNum"
            layout="prev, pager, next"
            :total="pagination.total"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" title="一键开班" :fullscreen="device == 'mobile'">
      <el-form :model="examModel" label-width="80px" label-position="left">
        <el-form-item label="考试时间">
          <el-date-picker
            v-model="examModel.exam_time"
            type="date"
            placeholder="请输入学员考试时间"
            style="margin-right: 10px;"
          />
        </el-form-item>
        <el-form-item label="发送内容">
          <el-input v-model="examModel.send_value" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExam">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleSetting" title="设置" :fullscreen="device == 'mobile'">
      <el-form :model="settingModel" label-width="100px" label-position="right">
        <el-form-item label="提醒手机号">
          <el-input v-model="settingModel.exam_send_phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="提醒阈值">
          <el-input-number v-model="settingModel.send_count" :min="1" label="" />
        </el-form-item>
        <el-form-item label="排队阈值">
          <el-input-number v-model="settingModel.exam_send_count" :min="1" label="排队阈值" />
        </el-form-item>
        <el-form-item label="考试次数限制">
          <el-input-number v-model="settingModel.exam_count" :min="1" label="考试次数限制" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSetting">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getCreateList,
  edit,
  exportExcel,
  remove,
  exportExcelCard,
  sendExamTime,
  setPhone,
  setSign,
  setReport,
  sendAdopt,
  sendUnadopt
} from '@/api/exam'
import {
  mapGetters
} from 'vuex'

const defaultExam = {
  exam_time: '',
  send_value: '雄宇集团提醒您，请携带好身份证原件，于2021年12月15日到雄宇重工集团2楼雄宇学堂上课培训----。'
}
const defaultSetting = {
  exam_send_phone: '+8613961845850',
  exam_send_count: 50,
  send_count: 50,
  exam_count: 2
}
export default {
  computed: {
    ...mapGetters(['device'])
  },
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
  props: ['status'],
  data() {
    return {
      tableSelection: [],
      list: null,
      type: '0',
      listLoading: true,
      exam_time: '',
      examModel: Object.assign({}, defaultExam),
      settingModel: Object.assign({}, defaultSetting),
      dialogVisible: false,
      dialogVisibleSetting: false,
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
    handelExport() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.exam_id)
      })
      exportExcel({
        exam_id: ids.join(',')
      }).then(response => {
        if (response.code === 200) {
          window.open(response.data.url)
        }
      })
    },
    handelAllClick() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.exam_id)
      })
      if (this.status == 0) {
        setSign({
          exam_id: ids.join(',')
        }).then(response => {
          if (response.code === 200) {
            this.fetchData()
            this.$message({
              message: '报名成功！',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
      } else {
        setReport({
          exam_id: ids.join(',')
        }).then(response => {
          if (response.code === 200) {
            this.fetchData()
            this.$message({
              message: '报道成功！',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
      }
    },
    handelExportCard() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.exam_id)
      })
      exportExcelCard({
        exam_id: ids.join(',')
      }).then(response => {
        if (response.code === 200) {
          window.open(response.data.url)
        }
      })
    },
    handleSelectionChange(val) {
      this.tableSelection = val
    },
    handleHeaderDeleteClick() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.exam_id)
      })
      this.handleDeleteClick(ids)
    },
    toggleType(t) {
      this.type = t.index
      this.fetchData()
    },
    handleDeleteClick(ids) {
      remove({
        exam_id: ids.join(',')
      }).then(response => {
        if (response.code === 200) {
          this.fetchData()
        }
      })
    },
    fetchData() {
      this.listLoading = true
      if (this.type == '0') {
        getList({
          status: this.status,
          exam_time: this.exam_time
        }).then(response => {
          this.list = response.data.data
          if (this.list && this.list.length > 0) {
            this.list.forEach(item => {
              item.isEdit = false
            })
          }
          this.listLoading = false
        })
      } else {
        getCreateList({
          status: this.status,
          exam_time: this.exam_time
        }).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      }
    },
    editType(item) {
      edit({
        exam_id: item.exam_id,
        status: item.status
      }).then(res => {
        this.list.forEach(i => {
          if (i.exam_id == item.exam_id) {
            i.isEdit = false
          }
        })
      })
      this.fetchData()
    },
    handelSetting() {
      this.settingModel = Object.assign({}, defaultSetting)
      this.dialogVisibleSetting = true
    },
    handleAddExamClick() {
      this.examModel = Object.assign({}, defaultExam)
      this.dialogVisible = true
    },
    confirmSetting() {
      setPhone(this.settingModel).then(response => {
        if (response.code === 200) {
          this.dialogVisibleSetting = false
        }
      })
    },
    confirmExam() {
      const ids = []
      this.tableSelection.forEach(item => {
        ids.push(item.exam_id)
      })
      sendExamTime({
        exam_id: ids.join(','),
        send_value: this.examModel.send_value,
        exam_time: this.examModel.exam_time
      }).then(response => {
        if (response.code === 200) {
          this.dialogVisible = false
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
