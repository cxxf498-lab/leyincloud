<template>
  <div class="home-container">
    <div class="home-hero">
      <h1>腾讯云产品配置推荐系统</h1>
      <p class="hero-desc">
        根据客户业务需求，智能匹配最优云产品方案。<br/>
        只需 5-10 分钟填写调研问卷，即可生成定制化配置推荐。
      </p>
    </div>

    <div class="feature-cards">
      <el-row :gutter="24">
        <el-col :span="8" v-for="item in features" :key="item.title">
          <el-card shadow="hover" class="feature-card">
            <div class="feature-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="home-actions">
      <el-button type="primary" size="large" @click="startSurvey" :icon="Edit">
        开始调研
      </el-button>
      <el-button size="large" @click="continueSurvey" v-if="hasDraft" :icon="Document">
        继续上次调研
      </el-button>
    </div>

    <div class="product-scope">
      <h3>覆盖产品线</h3>
      <div class="scope-tags">
        <el-tag v-for="tag in products" :key="tag" size="large" effect="plain" round>
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Edit, Document } from '@element-plus/icons-vue'

const router = useRouter()
const hasDraft = ref(false)

const features = [
  {
    icon: '📋',
    title: '分步填写',
    desc: '8 个步骤分步完成，支持跳过不适用的部分，降低填写压力。'
  },
  {
    icon: '🧠',
    title: '智能推荐',
    desc: '内置推荐规则引擎，根据业务类型、预算、流量特征精准匹配产品。'
  },
  {
    icon: '📄',
    title: '一键导出',
    desc: '生成方案后一键复制为文本，可直接通过微信发送给客户。'
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
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 16px;
  text-align: center;
}
.home-hero {
  margin-bottom: 48px;
}
.home-hero h1 {
  font-size: 32px;
  color: #303133;
  margin-bottom: 16px;
}
.hero-desc {
  color: #606266;
  font-size: 16px;
  line-height: 1.8;
}
.feature-cards {
  margin-bottom: 40px;
}
.feature-card {
  text-align: center;
  height: 100%;
}
.feature-icon {
  font-size: 36px;
  margin-bottom: 12px;
}
.feature-card h3 {
  font-size: 16px;
  color: #303133;
  margin-bottom: 8px;
}
.feature-card p {
  color: #909399;
  font-size: 14px;
  line-height: 1.6;
}
.home-actions {
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  gap: 16px;
}
.product-scope h3 {
  font-size: 16px;
  color: #606266;
  margin-bottom: 16px;
}
.scope-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
</style>
