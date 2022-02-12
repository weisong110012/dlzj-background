<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input
            v-model="in_search"
            placeholder="请输入题目"
            prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;"
            @input="fetchData"
          />
        </template>
        <el-button type="primary" @click="handleAddClick">新增</el-button>
        <el-button :disabled="tableSelection.length==0" type="danger" @click="handleHeaderDeleteClick">删除</el-button>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column label="题目" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="试题种类">
          <template slot-scope="scope">
            <span>{{ scope.row.question_type | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="试题类型">
          <span>操作工</span>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              icon="el-icon-edit"
              style="margin: 0 10px;"
              @click="handleEditClick(scope.row)"
            >编辑</el-link>
            <el-popconfirm
              title="确定要删除吗？"
              confirm-button-text="删除"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="handleDeleteClick([scope.row.id])"
            >
              <el-link slot="reference" type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
            </el-popconfirm>
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
          @current-change="currentChange"
        />
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑' : '新增'"
      :fullscreen="device == 'mobile'"
    >
      <el-form :model="addModel" label-width="80px" label-position="left">
        <el-form-item label="题目类型">
          <el-select v-model="addModel.type" placeholder="请选择" :disabled="true">
            <el-option key="1" label="操作工" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目种类">
          <el-select v-model="addModel.question_type" placeholder="请选择" @change="typeChange">
            <el-option key="1" label="判断题" value="1" />
            <el-option key="2" label="单选题" value="2" />
            <el-option key="4" label="简答题" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="addModel.title" placeholder="请输入" />
        </el-form-item>
        <template v-if="addModel.question_type==2">
          <el-form-item label="选项A">
            <el-input v-model="addModel.option_list[0].content" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="选项B">
            <el-input v-model="addModel.option_list[1].content" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="选项C">
            <el-input v-model="addModel.option_list[2].content" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="选项D">
            <el-input v-model="addModel.option_list[3].content" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="答案">
            <el-select v-model="addModel.answer" placeholder="请选择">
              <el-option key="A" label="A" value="A" />
              <el-option key="B" label="B" value="B" />
              <el-option key="C" label="C" value="C" />
              <el-option key="D" label="D" value="D" />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="addModel.question_type==1">
          <el-form-item label="答案">
            <el-radio v-model="addModel.answer" label="A">正确</el-radio>
            <el-radio v-model="addModel.answer" label="B">错误</el-radio>
          </el-form-item>
        </template>
        <template v-if="addModel.question_type==4">
          <el-form-item label="答案">
            <el-input v-model="addModel.answer" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" />
          </el-form-item>
        </template>
        <el-form-item label="说明">
          <el-input v-model="addModel.explain" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" />
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
  edit,
  remove
} from '@/api/question'
import {
  mapGetters
} from 'vuex'

const defaultModel = {
  type: '1',
  title: '',
  option_list: [{
    'id': 'A',
    'content': '正确'
  }, {
    'id': 'B',
    'content': '错误'
  }],
  answer: '',
  explain: '',
  question_type: '1'
}

export default {
  computed: {
    ...mapGetters(['device'])
  },
  filters: {
    typeFilter(type) {
      const statusMap = {
        1: '判断题',
        2: '单选题',
        3: '判断题',
        4: '简答题'
      }
      return statusMap[type]
    }
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
        ids.push(item.id)
      })
      this.handleDeleteClick(ids)
    },
    currentChange(curren) {
      this.pagination.pageNum = curren
      this.fetchData()
    },
    typeChange() {
      if (this.addModel.question_type === '1') {
        this.addModel.option_list = [{
          'id': 'A',
          'content': '正确'
        }, {
          'id': 'B',
          'content': '错误'
        }]
      } else if (this.addModel.question_type === '2') {
        this.addModel.option_list = [{
          'id': 'A',
          'content': ''
        }, {
          'id': 'B',
          'content': ''
        }, {
          'id': 'C',
          'content': ''
        }, {
          'id': 'D',
          'content': ''
        }]
      }
      this.$forceUpdate()
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
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.addModel = item
    },
    handleDeleteClick(ids) {
      remove({
        id: ids.join(',')
      }).then(response => {
        if (response.code === 200) {
          this.fetchData()
        }
      })
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
    background-color: rgb(240, 242, 245);
    position: relative;
  }
</style>
