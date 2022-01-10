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
                    <img style="width: 100%;" src="@/assets/images/home/use-guide-card-retina.png" >
                  </el-col>
                  <el-col :xs="12" :sm="12" :lg="12" style="line-height: 24px;padding-left:10px;color: #182b50;font-size: 14px;margin-bottom: 30px;">
                    <p>
                      你好, {{name}}!
                    </p>
                    <p>
                      吊篮百事通管理平台是一款集请假审批、系统管理、APP和小程序管理一体的综合管理平台。
                    </p>
                  </el-col>
               </el-row>
            </div>
          </el-card>

          <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
              <span>常用功能</span>
            </div>
            <div>
              <ul class="changyong_wrap">
                <li class="changyong_item">
                  <p class="item_icon" style="color: #1890ff;">
                    <svg-icon icon-class="baoming"></svg-icon>
                  </p>
                  <p class="item_name">
                     报名管理
                  </p>
                </li>
                <li class="changyong_item">
                  <p class="item_icon" style="color: #1890ff;">
                    <svg-icon icon-class="baoming"></svg-icon>
                  </p>
                  <p class="item_name">
                     报名管理
                  </p>
                </li>
                <li class="changyong_item">
                  <p class="item_icon" style="color: #1890ff;">
                      <svg-icon icon-class="baoming"></svg-icon>
                  </p>
                  <p class="item_name">
                     报名管理
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
                      <p>优化管理后台</p>
                      <p>增加用户权限模块</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2022/4/1" placement="top">
                    <el-card>
                      <h4>发布管理平台v1.1.0</h4>
                      <p>优化管理后台</p>
                      <p>增加组织架构管理模块</p>
                      <p>优化考试管理模块</p>
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
  import { mapGetters } from 'vuex'
  export default {
    components:{
      topPanel
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {

      };
    }
  };
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .changyong_wrap{
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content:space-between;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      .changyong_item{
        width: 100px;
        height: 100px;
        background: #f9f9f9;
        cursor: pointer;
        margin-top: 10px;
        .item_icon{
          font-size: 30px;
          margin: 0;
          margin-top: 20px;
        }
        .item_name{
          font-size: 13px;
          color: #2D2B57;
        }
      }
    }
  }
</style>
