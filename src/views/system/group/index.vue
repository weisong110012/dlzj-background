<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row style="text-align: right;padding-bottom: 18px;">
        <template v-if="device !== 'mobile'">
          <el-input
            placeholder="请输入公司名称"
            prefix-icon="el-icon-search"
            style="display: inline-block;width: 250px;margin-right: 12px;"
          ></el-input>
        </template>
        <el-button type="primary">新增公司</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>

      <el-row>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="panel front">
              2
            </div>
            <div class="panel back">
              1
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'

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
      listLoading: true
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
    height: 400px;
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
    }
    .front {
      background-size: 100% 100%;
    }
    .back {
      background: url('~@/assets/images/group/group_back.png') no-repeat;
      background-size: 100% 100%;
      transform: rotateY(-180deg);
    }
  }
  .card-panel:hover .front{
    transform: rotateY(180deg);
  }
  .card-panel:hover .back{
    transform: rotateY(0deg);
  }
}
</style>
