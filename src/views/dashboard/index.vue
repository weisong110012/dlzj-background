<template>
  <div class="wrap">
    <topPanel></topPanel>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>欢迎使用吊篮百事通管理平台</span>
          </div>
          <div>
            <el-row style="display: flex;">
              <el-col :xs="12" :sm="12" :lg="12" style="display: flex;align-items: center;">
                <img style="width: 100%;" src="@/assets/images/home/use-guide-card-retina.png">
              </el-col>
              <el-col :xs="12" :sm="12" :lg="12"
                style="line-height: 24px;padding-left:10px;color: #182b50;font-size: 14px;margin-bottom: 30px;">
                <p>
                  你好, {{name}}!
                </p>
                <el-divider></el-divider>
                <p>
                  吊篮百事通管理平台是一款集请假审批、系统管理、APP和小程序管理一体的综合管理平台。
                </p>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="box-card" v-if='!!(filterRoutes.length)'>
          <div slot="header" class="clearfix">
            <span>常用功能</span>
          </div>
          <div>
            <ul class="changyong_wrap">
              <li class="changyong_item" v-for='(item,index) in filterRoutes' :key='index'>
                <p class="item_icon" style="color: #1890ff;">
                  <template v-if="item.meta.icon.includes('el-icon')">
                    <i :class='item.meta.icon' />
                  </template>
                  <template v-else>
                    <svg-icon :icon-class="item.meta.icon"></svg-icon>
                  </template>
                </p>
                <p class="item_name">
                  {{item.meta.title}}
                </p>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>版本迭代</span>
          </div>
          <div>
            <el-timeline>
              <el-timeline-item timestamp="2022/3/1" placement="top">
                <el-card>
                  <h4>发布管理平台v1.0.0</h4>
                  <p>优化考试报名模块</p>
                  <p>优化公告管理模块</p>
                  <p>增加用户权限模块</p>
                  <p>优化系统管理模块</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/4/1" placement="top">
                <el-card>
                  <h4>发布管理平台v1.1.0</h4>
                  <p>优化管理后台</p>
                  <p>增加组织架构管理模块</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import topPanel from './components/topPanel'
  import {
    mapGetters
  } from 'vuex'
  let changyongList = [{
    path: '/notice'
  }, {
    path: '/system'
  }, {
    path: '/kaoshi'
  }, {
    path: '/system'
  }]

  export default {
    components: {
      topPanel
    },
    computed: {
      ...mapGetters([
        'name',
        'permission_routes'
      ]),
      filterRoutes() {
        let that = this
        let result = []
        that.permission_routes.forEach(item => {
          that.changyongList.forEach(i => {
            if (item.path == i.path) {
              result.push({
                path: i.path,
                meta: item.meta
              })
            }
          })
        })
        return result
      }
    },
    data() {
      return {
        changyongList: changyongList
      };
    }
  };
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .box-card{
      margin-top: 20px;
    }
    .changyong_wrap {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;

      .changyong_item {
        width: 90px;
        height: 100px;
        // background: #f9f9f9;
        cursor: pointer;
        margin-top: 10px;
        margin-left: 10px;

        .item_icon {
          font-size: 30px;
          margin: 0;
          margin-top: 20px;
        }

        .item_name {
          font-size: 13px;
          color: #2D2B57;
        }
      }
    }
  }
</style>
