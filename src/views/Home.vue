<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <h1>智能匹配云产品配置方案</h1>
      <p>根据客户业务场景，自动推荐最优产品组合，<br/>无需懂技术也能快速出方案。</p>
      <div class="hero-actions">
        <el-button type="primary" size="large" class="btn-start" @click="startSurvey">
          <AppIcons name="edit" :size="18" color="#fff" />
          开始调研
        </el-button>
        <el-button v-if="hasDraft" size="large" class="btn-draft" @click="continueSurvey">
          <AppIcons name="refresh" :size="18" />
          继续上次
        </el-button>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="feature-item" v-for="f in features" :key="f.name">
        <div class="fi-icon">
          <AppIcons :name="f.name" :size="22" color="#555" />
        </div>
        <div class="fi-text">
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>覆盖 CVM / CBS / MySQL / DDoS / WAF / 云防火墙 / TRTC / CDN / COS / CLB 等核心产品</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasDraft = ref(false)

const features = [
  { name: 'clipboard', title: '分步填写', desc: '8 个步骤分步引导，支持跳过不适用部分。' },
  { name: 'brain', title: '智能匹配', desc: '9 条规则引擎，按业务类型自动匹配最优组合。' },
  { name: 'copy', title: '一键导出', desc: '复制方案文本，直接微信发给客户。' },
]

onMounted(() => { hasDraft.value = !!localStorage.getItem('cloud_survey_draft') })
function startSurvey() { router.push('/survey') }
function continueSurvey() { router.push('/survey') }
</script>

<style scoped>
.home { max-width: 560px; margin: 0 auto; }

.hero { text-align: center; padding: 72px 0 64px; }
.hero h1 { font-size: 28px; font-weight: 700; color: var(--c-text); letter-spacing: -0.5px; margin-bottom: 12px; }
.hero p { font-size: 15px; color: var(--c-text2); line-height: 1.7; margin-bottom: 32px; }
.hero-actions { display: flex; justify-content: center; gap: 10px; }
.btn-start, .btn-draft {
  font-size: 15px !important; font-weight: 600 !important;
  padding: 12px 28px !important; height: auto !important;
  display: inline-flex !important; align-items: center; gap: 8px;
}
.btn-draft { color: var(--c-text2) !important; border-color: var(--c-border) !important; }
.btn-draft:hover { color: var(--c-text) !important; border-color: #ccc !important; }

.features { display: flex; flex-direction: column; gap: 1px; margin-bottom: 64px; }
.feature-item {
  display: flex; align-items: flex-start; gap: 16px;
  background: var(--c-white); padding: 20px 24px;
  border: 1px solid var(--c-border); border-radius: 0;
  transition: box-shadow .2s;
}
.feature-item:first-child { border-radius: var(--radius) var(--radius) 0 0; }
.feature-item:last-child { border-radius: 0 0 var(--radius) var(--radius); }
.feature-item:hover { box-shadow: var(--shadow-hov); }
.fi-icon { width: 42px; height: 42px; border-radius: var(--radius); background: var(--c-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.fi-text h3 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.fi-text p { font-size: 13px; color: var(--c-text2); line-height: 1.6; }

.footer { text-align: center; padding: 0 0 40px; }
.footer p { font-size: 12px; color: var(--c-text3); }
</style>
