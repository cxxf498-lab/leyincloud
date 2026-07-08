<template>
  <div id="app-shell">
    <el-container>
      <el-header class="app-header">
        <div class="header-inner">
          <div class="header-left" @click="$router.push('/')">
            <AppIcons name="logo" :size="24" color="#111" />
            <span class="logo-title">乐银云选品</span>
          </div>
          <div class="header-right">
            <el-button text class="nav-link" @click="$router.push('/')">
              <AppIcons name="home" :size="18" />
              <span>首页</span>
            </el-button>
            <el-button type="primary" size="small" class="cta-btn" @click="$router.push('/survey')">
              <AppIcons name="plus" :size="16" color="#fff" />
              <span>新建调研</span>
            </el-button>
          </div>
        </div>
      </el-header>
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
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
:root {
  --c-bg:       #FAFAFA;
  --c-white:    #FFFFFF;
  --c-text:     #1A1A1A;
  --c-text2:    #888888;
  --c-text3:    #BBBBBB;
  --c-border:   #ECECEC;
  --c-primary:  #111111;
  --c-accent:   #3B82F6;
  --c-success:  #22C55E;
  --c-warning:  #F59E0B;
  --c-danger:   #EF4444;
  --radius:     6px;
  --shadow:     0 0 0 1px rgba(0,0,0,.03), 0 1px 3px rgba(0,0,0,.06);
  --shadow-hov: 0 0 0 1px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  background: var(--c-bg);
  color: var(--c-text);
  font-size: 14px;
  line-height: 1.5;
}

#app-shell { min-height: 100vh; background: var(--c-bg); }

/* Element Plus 全局重写 */
.el-card {
  border-radius: var(--radius) !important;
  border: 1px solid var(--c-border) !important;
  box-shadow: var(--shadow) !important;
  background: var(--c-white) !important;
  transition: box-shadow .2s;
}
.el-card:hover { box-shadow: var(--shadow-hov) !important; }

.el-button {
  border-radius: var(--radius) !important;
  font-weight: 500 !important;
  transition: all .15s;
}
.el-button--primary {
  background: var(--c-primary) !important;
  border-color: var(--c-primary) !important;
}
.el-button--primary:hover {
  background: #333 !important;
  border-color: #333 !important;
}
.el-button--success { background: var(--c-success) !important; border-color: var(--c-success) !important; }

.el-radio-button__inner {
  border-radius: 4px !important; margin-right: 4px !important;
  border: 1px solid var(--c-border) !important;
  font-size: 13px !important;
}
.el-radio-button__original-radio:checked + .el-radio-button__inner {
  background: var(--c-primary) !important; border-color: var(--c-primary) !important;
}
.el-radio-button:first-child .el-radio-button__inner,
.el-radio-button:last-child .el-radio-button__inner { border-radius: 4px !important; }

.el-input__wrapper {
  border-radius: var(--radius) !important; box-shadow: none !important;
  border: 1px solid var(--c-border) !important;
}
.el-input__wrapper:hover { border-color: #ccc !important; }
.el-input__wrapper.is-focus {
  border-color: var(--c-primary) !important;
  box-shadow: 0 0 0 1px var(--c-primary) !important;
}

.el-steps { --el-step-text-color: var(--c-text2); }
.el-step__title.is-process { color: var(--c-primary) !important; font-weight: 600 !important; }
.el-step__head.is-process { color: var(--c-primary) !important; border-color: var(--c-primary) !important; }

.el-divider__text { font-weight: 500 !important; color: var(--c-text2) !important; font-size: 12px !important; }

.el-alert { border-radius: var(--radius) !important; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<style scoped>
.app-header {
  background: rgba(255,255,255,.9);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--c-border);
  padding: 0; height: 52px;
  position: sticky; top: 0; z-index: 100;
}
.header-inner {
  max-width: 880px; margin: 0 auto; height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
}
.header-left { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.logo-title { font-size: 17px; font-weight: 700; color: var(--c-text); letter-spacing: -0.3px; }
.header-right { display: flex; align-items: center; gap: 6px; }
.nav-link { color: var(--c-text2) !important; font-size: 13px; gap: 5px; }
.nav-link:hover { color: var(--c-text) !important; }
.cta-btn {
  font-size: 13px !important; font-weight: 600 !important;
  padding: 5px 16px !important; height: 32px !important;
  display: inline-flex !important; align-items: center; gap: 4px;
}
.app-main { max-width: 880px; margin: 0 auto; padding: 32px 16px 80px; }
</style>
