<template>
  <div>
    <el-tabs type="border-card" tab-position="top">
      <el-tab-pane label="按学员">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column type="selection" width="65" align="center"></el-table-column>
          <el-table-column label="学员姓名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证" align="center">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-view" style="margin: 0 10px;">查看</el-link>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="创建时间" width="250">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" align="center" width="250">
            <template slot-scope="scope">
              <el-tag type="success">已报名</el-tag>
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
          <el-pagination
            background
            hide-on-single-page
            :page-size="pagination.pageSize"
            :current-page="pagination.pageNum"
            layout="prev, pager, next"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按创建人">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column type="selection" width="65" align="center"></el-table-column>
          <el-table-column label="创建人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人姓名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" align="center">
            <template slot-scope="scope">
              17237431213
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="创建时间" width="250">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="人数" align="center" width="250">
            <template slot-scope="scope">
              <el-tag type="success">323</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-view" style="margin: 0 10px;">查看</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
