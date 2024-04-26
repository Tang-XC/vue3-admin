<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="formData"
      :rules="formRules"
      ref="formRef"
    >
      <div class="title-container">
        <h3 class="title"><SvgIcon icon="admin" /> USER LOGIN</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          placeholder="Please input username"
          prefix-icon="user"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          placeholder="Please input password"
          prefix-icon="lock"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #suffix>
            <div class="show-pwd" @click="handleShowPassword">
              <el-icon v-if="!showPassword"><View /></el-icon>
              <el-icon v-else><Hide /></el-icon>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleLogin">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon'
import { validatePassword } from '@/utils/validate'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const formRef = ref(null)
const formData = ref({
  username: '',
  password: ''
})
const formRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: 'username is required'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
const showPassword = ref(false)
const loading = ref(false)
const store = useStore()
const handleLogin = async () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', formData.value)
      .then(() => {
        ElMessage.success('login success')
      })
      .catch((err) => {
        ElMessage.error(err)
      })
      .finally(() => {
        loading.value = false
      })
  })
}
const handleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input__wrapper {
      background: transparent;
      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
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
    }
  }

  .show-pwd {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
