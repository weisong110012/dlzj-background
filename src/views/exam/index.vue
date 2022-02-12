<template>
  <div class="wrap">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane v-for="item in tabList" :key="item.value">
        <div slot="label" style="text-align: center;">
          {{ item.label }} <span v-if="item.value>-1" style="color: rgb(64, 158, 255);">({{ tabCount[item.value] }})</span>
        </div>
        <user-tab ref="mychild" :status="item.value" @fetchData="fetchData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getList
} from '@/api/exam'
import {
  mapGetters
} from 'vuex'
import userTab from './components/userTab'

export default {
  computed: {
    ...mapGetters(['device'])
  },
  components: {
    userTab
  },
  data() {
    return {
      tabCount: [0, 0, 0, 0, 0, 0],
      tabList: [{
        label: '全部',
        value: '-1'
      },
      {
        label: '排队中',
        value: '0'
      },
      {
        label: '已报名',
        value: '1'
      },
      {
        label: '待报道',
        value: '2'
      },
      {
        label: '培训中',
        value: '3'
      },
      {
        label: '已通过',
        value: '4'
      },
      {
        label: '未通过',
        value: '5'
      }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$nextTick(() => {
        this.$refs.mychild.forEach(item => {
          item.fetchData()
        })
      })
      const that = this
      getList({
        status: -1,
        exam_time: ''
      }).then(res => {
        if (res.data.count) {
          res.data.count.forEach((item) => {
            that.tabCount[item.status] = item.count
          })
          this.$forceUpdate()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 10px;
    background-color: #fff;
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
