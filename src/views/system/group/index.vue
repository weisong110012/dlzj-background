<template>
  <div class="wrap">
    <el-row style="text-align: right;padding: 10px;background: #fff;">
      <template v-if="device !== 'mobile'">
        <el-input placeholder="请输入公司名称" prefix-icon="el-icon-search" style="display: inline-block;width: 250px;margin-right: 12px;" />
      </template>
      <el-button type="primary">新增公司</el-button>
      <el-button type="danger">删除</el-button>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="panel front">
            <div class="title">雄宇集团</div>
            <div class="title">1</div>
          </div>
          <div class="panel back">
            <button class="btn">管理</button>
            <button class="btn">编辑</button>
            <button class="btn delete">删除</button>
          </div>
        </div>
      </el-col>
    </el-row>
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
  background-color: #ecf0f9;
  position: relative;

  .card-panel {
    position: relative;
    height: 400px;
    perspective: 1000px;

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
      background: url('~@/assets/images/group/group_front.png') no-repeat;
      background-size: 100% 100%;
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
