<template>
  <el-form>
    <el-form-item label="角色">
      <el-input v-model.trim="user.name" :disabled="true" />
    </el-form-item>
    <el-form-item label="旧密码">
      <el-input v-model.trim="model.old_password" type="password" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="model.new_password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  editPassword
} from '@/api/admin'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data() {
    return {
      model: {
        old_password: '',
        new_password: ''
      }
    }
  },
  methods: {
    submit() {
      editPassword(this.model).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '更新成功！',
            type: 'success',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>
