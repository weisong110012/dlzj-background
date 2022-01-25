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
        <el-button type="primary">新增公司</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col" v-for='i in 10' :key='i'>
          <div class="card-panel">
            <div class="panel front">
              <div class="header"><div class="title">无锡雄宇重工有限公司</div></div>
              <div class="footer">
                <ul class="group-info">
                  <li class="title">
                    公司信息
                  </li>
                  <li class="info">
                    <span>
                      名称:
                    </span>
                    <span>
                      无锡雄宇重工有限公司
                    </span>
                  </li>
                  <li class="info">
                    <span>
                      地址:
                    </span>
                    <span>
                      江苏省无锡市滨湖区小园三村66号
                    </span>
                  </li>
                  <li class="info">
                    <span>
                      创建人:
                    </span>
                    <span>
                      沈斌
                    </span>
                  </li>
                  <li class="info">
                    <span>
                      创建时间:
                    </span>
                    <span>
                      2022-01-21
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="panel back">
              <button class="btn">管理</button>
              <button class="btn">编辑</button>
              <button class="btn delete">删除</button>
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
      box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0px 6px 18px 0 rgba(0, 0, 0, 0.19);
    }

    .front {
      background: #fff;
      background-size: 100% 100%;
      .header {
        height: 200px;
        background: linear-gradient(135deg, rgb(53, 138, 255), rgb(60, 108, 254));
        .title {
          font-size: 22px;
          color: #fff;
          text-shadow: 0px 0px 5px #fff;
          text-align: center;
          line-height: 200px;
          white-space: nowrap;
        }
      }
      .footer{
        padding: 10px;
        .group-info{
          list-style: none;
          text-align: left;
          margin: 0;
          padding: 0;
          .title{
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .info{
            margin-top: 14px;
            font-size: 14px;
            color:#666;
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
