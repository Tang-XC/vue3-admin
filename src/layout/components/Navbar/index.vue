<template>
  <div class="navbar">
    <div class="left-wrap">
      <Hamburger />
      <BreadCrumb />
    </div>
    <div class="right-menu">
      <Screenfull />
      <Theme />
      <Local />
      <el-dropdown placement="bottom-end">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="store.getters.userInfo.avatar"
          />
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <el-dropdown-item>课程主页</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import store from '@/store'
import { ElMessage } from 'element-plus'
import Hamburger from './components/Hamburger'
import BreadCrumb from './components/BreadCrumb'
import Theme from './components/Theme'
import Local from './components/Local'
import Screenfull from './components/Screenfull'

const logout = () => {
  store.dispatch('user/logout')
  ElMessage.success('logout success')
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
.navbar {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-wrap {
    display: flex;
    align-items: center;
  }
}
.right-menu {
  display: flex;
  align-items: center;
  float: right;
  padding-right: 16px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  .el-avatar {
    --el-avatar-background-color: none;
    margin-right: 12px;
  }
}
</style>
