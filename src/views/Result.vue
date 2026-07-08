<template>
  <div class="result-container">
    <!-- 头部 -->
    <div class="result-header">
      <h2>推荐方案</h2>
      <p class="subtitle">根据您的需求，为您匹配了以下腾讯云产品配置</p>
      <p class="summary-info">{{ result.summary }}</p>
    </div>

    <!-- CVM -->
    <el-card class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">☁️</span>
          <span>云服务器 CVM</span>
          <el-tag type="primary" size="small">{{ result.cvm.series }}</el-tag>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="产品系列">{{ result.cvm.series }}</el-descriptions-item>
        <el-descriptions-item label="系列说明">{{ result.cvm.seriesNote }}</el-descriptions-item>
        <el-descriptions-item label="推荐规格">{{ result.cvm.spec }}</el-descriptions-item>
        <el-descriptions-item label="推荐数量">{{ result.cvm.count }}</el-descriptions-item>
        <el-descriptions-item label="推荐理由" :span="2">{{ result.cvm.reason }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- CBS -->
    <el-card class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">💾</span>
          <span>云硬盘 CBS</span>
          <el-tag type="warning" size="small">{{ result.cbs.type }}</el-tag>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="硬盘类型">{{ result.cbs.type }}</el-descriptions-item>
        <el-descriptions-item label="类型说明">{{ result.cbs.typeNote }}</el-descriptions-item>
        <el-descriptions-item label="推荐容量">{{ result.cbs.size }}</el-descriptions-item>
        <el-descriptions-item label="推荐理由" :span="2">{{ result.cbs.reason }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- MySQL -->
    <el-card v-if="result.mysql" class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">🗄️</span>
          <span>云数据库 MySQL</span>
          <el-tag type="success" size="small">{{ result.mysql.arch }}</el-tag>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="架构类型">{{ result.mysql.arch }}</el-descriptions-item>
        <el-descriptions-item label="架构说明">{{ result.mysql.archNote }}</el-descriptions-item>
        <el-descriptions-item label="推荐规格">{{ result.mysql.spec }}</el-descriptions-item>
        <el-descriptions-item label="推荐理由" :span="2">{{ result.mysql.reason }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div v-else-if="result.mysqlReason" class="skip-notice">
      <el-alert :title="'数据库: ' + result.mysqlReason" type="info" :closable="false" show-icon />
    </div>

    <!-- 安全产品 -->
    <el-card v-if="result.security && result.security.items.length > 0" class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">🛡️</span>
          <span>安全产品</span>
        </div>
      </template>
      <div class="security-list">
        <div v-for="item in result.security.items" :key="item.name" class="security-item">
          <el-tag type="danger" effect="dark">{{ item.name }}</el-tag>
          <span class="item-note">{{ item.note }}</span>
        </div>
      </div>
      <p class="section-reason">推荐理由：{{ result.security.reason }}</p>
    </el-card>

    <!-- TRTC -->
    <el-card v-if="result.trtc" class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">🎥</span>
          <span>实时音视频 TRTC</span>
          <el-tag type="primary" size="small">{{ result.trtc.tier }}</el-tag>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本">{{ result.trtc.tier }}</el-descriptions-item>
        <el-descriptions-item label="版本说明">{{ result.trtc.tierNote }}</el-descriptions-item>
        <el-descriptions-item label="推荐理由" :span="2">{{ result.trtc.reason }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 额外产品 -->
    <el-card v-if="result.extra && result.extra.items.length > 0" class="product-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">📦</span>
          <span>建议搭配产品</span>
        </div>
      </template>
      <div class="security-list">
        <div v-for="item in result.extra.items" :key="item.name" class="security-item">
          <el-tag type="info" effect="dark">{{ item.name }}</el-tag>
          <span class="item-note">{{ item.note }}</span>
        </div>
      </div>
      <p class="section-reason">推荐理由：{{ result.extra.reason }}</p>
    </el-card>

    <!-- 计费建议 -->
    <el-card class="product-card billing-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">💰</span>
          <span>计费建议</span>
        </div>
      </template>
      <p class="billing-text">{{ result.billing }}</p>
      <p v-if="result.note" class="billing-note">
        <el-icon><InfoFilled /></el-icon> {{ result.note }}
      </p>
    </el-card>

    <!-- 温馨提示 -->
    <el-alert
      class="reminder"
      :title="result.reminder"
      type="success"
      :closable="false"
      show-icon
    />

    <!-- 操作按钮 -->
    <div class="result-actions">
      <el-button @click="goBack" size="large">返回修改</el-button>
      <el-button type="primary" @click="newSurvey" size="large">新建调研</el-button>
      <el-button type="success" @click="copyResult" size="large" :icon="CopyDocument">一键复制方案</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CopyDocument, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { matchRecommendation } from '../engine/matcher.js'

const router = useRouter()
const result = ref({
  summary: '',
  cvm: { series: '', seriesNote: '', spec: '', count: '', reason: '' },
  cbs: { type: '', typeNote: '', size: '', reason: '' },
  mysql: null,
  mysqlReason: '',
  security: { items: [], reason: '' },
  trtc: null,
  extra: { items: [], reason: '' },
  billing: '',
  note: '',
  reminder: ''
})

onMounted(() => {
  const stored = sessionStorage.getItem('survey_result')
  if (!stored) {
    router.replace('/survey')
    return
  }
  try {
    const formData = JSON.parse(stored)
    result.value = matchRecommendation(formData)
  } catch {
    router.replace('/survey')
  }
})

function goBack() {
  router.back()
}

function newSurvey() {
  sessionStorage.removeItem('survey_result')
  router.push('/survey')
}

function copyResult() {
  const r = result.value
  let text = '【腾讯云产品配置推荐方案】\n\n'
  text += `客户概况：${r.summary}\n\n`

  text += `☁️ 云服务器 CVM\n`
  text += `  产品系列：${r.cvm.series}\n`
  text += `  推荐规格：${r.cvm.spec}\n`
  text += `  推荐数量：${r.cvm.count}\n`
  text += `  推荐理由：${r.cvm.reason}\n\n`

  text += `💾 云硬盘 CBS\n`
  text += `  硬盘类型：${r.cbs.type}\n`
  text += `  推荐容量：${r.cbs.size}\n\n`

  if (r.mysql) {
    text += `🗄️ 云数据库 MySQL\n`
    text += `  架构类型：${r.mysql.arch}\n`
    text += `  推荐规格：${r.mysql.spec}\n\n`
  }

  if (r.security && r.security.items.length > 0) {
    text += `🛡️ 安全产品\n`
    r.security.items.forEach(i => { text += `  - ${i.name}\n` })
    text += '\n'
  }

  if (r.trtc) {
    text += `🎥 实时音视频 TRTC\n`
    text += `  版本：${r.trtc.tier}\n\n`
  }

  if (r.extra && r.extra.items.length > 0) {
    text += `📦 建议搭配\n`
    r.extra.items.forEach(i => { text += `  - ${i.name}\n` })
    text += '\n'
  }

  text += `💰 计费建议：${r.billing}\n`
  text += `\n💡 温馨提示：${r.reminder}\n`

  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('方案已复制到剪贴板，可直接粘贴发送给客户')
  }).catch(() => {
    ElMessage.warning('复制失败，请手动选择文本')
  })
}
</script>

<style scoped>
.result-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px 80px;
}
.result-header {
  text-align: center;
  margin-bottom: 32px;
}
.result-header h2 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 8px;
}
.result-header .subtitle {
  color: #909399;
  font-size: 14px;
}
.summary-info {
  margin-top: 12px;
  font-size: 14px;
  color: #409eff;
  background: #ecf5ff;
  padding: 8px 16px;
  border-radius: 6px;
  display: inline-block;
}
.product-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}
.card-icon {
  font-size: 20px;
}
.skip-notice {
  margin-bottom: 20px;
}
.section-reason {
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
}
.security-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.security-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.item-note {
  color: #909399;
  font-size: 13px;
}
.billing-card .billing-text {
  font-size: 16px;
  font-weight: 600;
  color: #e6a23c;
}
.billing-note {
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.reminder {
  margin: 24px 0;
}
.result-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
}
</style>
