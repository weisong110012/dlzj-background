<template>
  <div class="wrap">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="全部"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="排队中"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="已报名"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="待报道"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="培训中"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="已通过"><user-tab></user-tab></el-tab-pane>
      <el-tab-pane label="未通过"><user-tab></user-tab></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import userTab from './components/userTab'

const defaultNotice = {
  title: '',
  image: undefined,
  note: ''
}
export default {
  computed: {
    ...mapGetters(['device'])
  },
  components: {
    userTab
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
