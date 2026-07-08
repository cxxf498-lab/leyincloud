<template>
  <div class="home-container">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-badge">腾讯云产品智能推荐</div>
      <h1>5 分钟填完问卷<br/>秒出云产品配置方案</h1>
      <p class="hero-desc">
        基于客户业务场景，智能匹配最优 CVM、CBS、MySQL、安全、音视频等云产品组合<br/>
        无需懂技术，销售也能轻松上手
      </p>
      <div class="hero-actions">
        <el-button type="primary" size="large" round class="hero-cta" @click="startSurvey">
          <span>开始调研</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left:4px">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </el-button>
        <el-button v-if="hasDraft" size="large" round class="hero-draft-btn" @click="continueSurvey">
          继续上次调研
        </el-button>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num">8</span>
          <span class="stat-label">步分步填写</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">9</span>
          <span class="stat-label">条智能规则</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">5</span>
          <span class="stat-label">分钟出方案</span>
        </div>
      </div>
    </section>

    <!-- 功能特性卡片 -->
    <section class="features">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in features" :key="item.title">
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">{{ item.icon }}</span>
            </div>
            <h3 class="feature-title">{{ item.title }}</h3>
            <p class="feature-desc">{{ item.desc }}</p>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 产品覆盖 -->
    <section class="product-scope">
      <h2>覆盖核心产品线</h2>
      <div class="scope-tags">
        <span v-for="tag in products" :key="tag" class="scope-tag">{{ tag }}</span>
      </div>
    </section>

    <!-- 底部 CTA -->
    <section class="bottom-cta">
      <h2>准备好给客户出方案了吗？</h2>
      <p>无需注册，打开即用</p>
      <el-button type="primary" size="large" round @click="startSurvey">立即开始</el-button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasDraft = ref(false)

const features = [
  {
    icon: '📋',
    title: '分步填写',
    desc: '8 个步骤分步引导，支持跳过不适用部分，降低填写压力，销售也能轻松上手。'
  },
  {
    icon: '🧠',
    title: '智能匹配',
    desc: '内置 9 条推荐规则引擎，根据业务类型、预算、流量特征自动匹配最优产品组合。'
  },
  {
    icon: '📄',
    title: '一键导出',
    desc: '生成方案后一键复制为格式化文本，可直接通过微信发送给客户，高效沟通。'
  }
]

const products = [
  'CVM 云服务器', 'CBS 云硬盘', 'MySQL 云数据库',
  'DDoS 高防', 'WAF Web防火墙', '云防火墙',
  'TRTC 音视频', 'CDN 加速', 'COS 对象存储', 'CLB 负载均衡'
]

onMounted(() => {
  hasDraft.value = !!localStorage.getItem('cloud_survey_draft')
})

function startSurvey() {
  router.push('/survey')
}

function continueSurvey() {
  router.push('/survey')
}
</script>

<style scoped>
.home-container {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

/* === Hero === */
.hero {
  text-align: center;
  padding: 64px 0 48px;
}
.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}
.hero h1 {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}
.hero-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto 32px;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
}
.hero-cta {
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 14px 32px !important;
  height: auto !important;
  display: inline-flex !important;
  align-items: center;
}
.hero-draft-btn {
  font-size: 16px !important;
  font-weight: 500 !important;
  padding: 14px 28px !important;
  height: auto !important;
  color: var(--text-secondary) !important;
  border-color: var(--border) !important;
}
.hero-draft-btn:hover {
  color: var(--primary) !important;
  border-color: var(--primary) !important;
}

/* === Stats === */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.stat-item {
  text-align: center;
}
.stat-num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

/* === Features === */
.features {
  padding: 0 0 64px;
}
.feature-card {
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-align: center;
  transition: all var(--transition);
  height: 100%;
}
.feature-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.feature-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.feature-icon {
  font-size: 24px;
  line-height: 1;
}
.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* === Product Scope === */
.product-scope {
  text-align: center;
  padding: 0 0 64px;
}
.product-scope h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
}
.scope-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}
.scope-tag {
  padding: 6px 16px;
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  transition: all var(--transition);
}
.scope-tag:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* === Bottom CTA === */
.bottom-cta {
  text-align: center;
  padding: 48px 0 32px;
}
.bottom-cta h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.bottom-cta p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
</style>
