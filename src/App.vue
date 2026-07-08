<template>
  <div id="app-shell">
    <el-container>
      <el-header class="app-header">
        <div class="header-left" @click="$router.push('/')">
          <span class="logo">☁️ 选品</span>
          <span class="logo-sub">腾讯云产品推荐</span>
        </div>
        <div class="header-right">
          <el-button text @click="$router.push('/')">首页</el-button>
          <el-button text @click="$router.push('/survey')">新建调研</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style>
#app-shell {
  min-height: 100vh;
  background: #f5f7fa;
}
.app-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.logo {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
}
.logo-sub {
  font-size: 13px;
  color: #909399;
}
</style>
