<template>
  <div class="login-container">
    <div class="login-box">
      <div class="box-wrap">
        <div class="login-left">
          <img src="@/assets/images/login/loginleft.png">
        </div>
        <div class="login-right">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title"> <img src="@/assets/images/login/logo.png">吊篮百事通公司管理系统</h3>
            </div>
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
            >公司管理员登录</el-button>
            <div class="tips">
              <span>
                <router-link :to="'login'">
                  吊篮百事通管理 >>
                </router-link>
              </span>
            </div>
            <!-- <div class="tips">
            <span style="margin-right:20px;">账号: admin</span>
            <span> 密码: any</span>
          </div> -->

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码最少6位！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'XBfF8Y',
        password: '123456'
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/grouplogin', this.loginForm).then(() => {
            this.$router.push({
              path: this.redirect || '/'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('用户名或密码错误!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-box {
      background: $bg;
      margin: auto;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .box-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(25,28,55);
        border-radius: 18px;
        max-width: 100%;
      }
    }
    .login-left {
      height: 640px;
      border-radius: 15px;
      overflow: hidden;
    }
    .login-right {
      display: flex;
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 90%;
      padding: 0px 35px;
      margin: 0 auto;
      float: right;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      text-align: right;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
        line-height: 40px;
        img{
          width: 40px;
          vertical-align: bottom;
          margin-right: 6px;
        }
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  @media screen and (max-width: 600px) {
      .login-left{
        display: none;
      }
      .box-wrap{
        background: $bg !important;
      }
      .login-right {
        width: 100%;
      }
      .login-container .login-form {
        position: relative;
        max-width: 100%;
        padding: 0px 10px;
        margin: 0 auto;
        overflow: hidden;
      }
  }
</style>
