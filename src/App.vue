<template>
  <div id="app-shell">
    <el-container>
      <el-header class="app-header">
        <div class="header-inner">
          <div class="header-left" @click="$router.push('/')">
            <div class="logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#1677FF"/>
                <path d="M7 14C7 11.5 8.5 9 11 8L12 9.5C10.2 10.3 9 12 9 14C9 16 10.2 17.7 12 18.5L11 20C8.5 19 7 16.5 7 14Z" fill="white"/>
                <path d="M11 14C11 12.3 12.3 11 14 11C15.7 11 17 12.3 17 14C17 15.7 15.7 17 14 17C12.3 17 11 15.7 11 14Z" fill="white"/>
                <path d="M17 9.5L16 8C18.5 9 20 11.5 20 14C20 16.5 18.5 19 16 20L17 18.5C18.8 17.7 20 16 20 14C20 12 18.8 10.3 17 9.5Z" fill="white"/>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-title">选品</span>
              <span class="logo-sub">Cloud Matcher</span>
            </div>
          </div>
          <div class="header-right">
            <el-button text class="nav-btn" @click="$router.push('/')">
              <span>首页</span>
            </el-button>
            <el-button type="primary" size="small" round class="cta-btn" @click="$router.push('/survey')">
              新建调研
            </el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style>
/* === 全局设计变量 === */
:root {
  --primary: #1677FF;
  --primary-dark: #0958D9;
  --primary-light: #E8F3FF;
  --success: #52C41A;
  --warning: #FA8C16;
  --danger: #FF4D4F;
  --bg: #F0F2F5;
  --bg-white: #FFFFFF;
  --text-primary: #1D2129;
  --text-secondary: #86909C;
  --text-tertiary: #C9CDD4;
  --border: #E5E6EB;
  --border-light: #F2F3F5;
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px -4px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px -6px rgba(0,0,0,0.12);
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --transition: 0.2s ease;
}

/* === 全局样式覆盖 === */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg);
  color: var(--text-primary);
}

#app-shell {
  min-height: 100vh;
  background: var(--bg);
}

/* Element Plus 全局覆盖 */
.el-card {
  border-radius: var(--radius-lg) !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow-sm) !important;
  transition: box-shadow var(--transition);
}
.el-card:hover {
  box-shadow: var(--shadow-md) !important;
}

.el-button--primary {
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  border-radius: var(--radius-sm) !important;
  font-weight: 500 !important;
  transition: all var(--transition);
}
.el-button--primary:hover {
  background: var(--primary-dark) !important;
  border-color: var(--primary-dark) !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(22,119,255,0.35);
}

.el-button--success {
  border-radius: var(--radius-sm) !important;
  font-weight: 500 !important;
}

.el-radio-button__inner {
  border-radius: 4px !important;
  margin-right: 4px !important;
  border: 1px solid var(--border) !important;
  transition: all var(--transition);
}
.el-radio-button__original-radio:checked + .el-radio-button__inner {
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  box-shadow: none !important;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px !important;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 4px !important;
}

.el-input__wrapper {
  border-radius: var(--radius-sm) !important;
  box-shadow: none !important;
  border: 1px solid var(--border) !important;
  transition: all var(--transition);
}
.el-input__wrapper:hover {
  border-color: var(--primary) !important;
}
.el-input__wrapper.is-focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 2px rgba(22,119,255,0.1) !important;
}

.el-steps {
  --el-step-text-color: var(--text-secondary);
}
.el-step__title.is-process {
  color: var(--primary) !important;
  font-weight: 600 !important;
}
.el-step__head.is-process {
  color: var(--primary) !important;
  border-color: var(--primary) !important;
}

.el-divider__text {
  font-weight: 600 !important;
  color: var(--text-secondary) !important;
}

/* === 页面过渡动画 === */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<style scoped>
.app-header {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}
.logo-icon {
  display: flex;
  align-items: center;
}
.logo-text {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.logo-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}
.logo-sub {
  font-size: 11px;
  color: var(--text-tertiary);
  font-weight: 500;
  letter-spacing: 0.5px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-btn {
  color: var(--text-secondary) !important;
  font-size: 14px;
  font-weight: 500;
  transition: color var(--transition);
}
.nav-btn:hover {
  color: var(--primary) !important;
}
.cta-btn {
  font-weight: 600 !important;
  padding: 6px 20px !important;
  height: 34px !important;
}
</style>
