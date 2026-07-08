<template>
  <div class="result">
    <div class="result-header">
      <h2>推荐方案</h2>
      <p class="subtitle">根据需求自动匹配的腾讯云产品配置</p>
      <p class="summary" v-if="result.summary">{{ result.summary }}</p>
    </div>

    <!-- CVM -->
    <div class="product-card">
      <div class="pc-header">
        <AppIcons name="server" :size="20" />
        <span>云服务器 CVM</span>
        <span class="pc-tag">{{ result.cvm.series }}</span>
      </div>
      <div class="pc-body">
        <dl>
          <dt>产品系列</dt><dd>{{ result.cvm.series }}</dd>
          <dt>系列说明</dt><dd>{{ result.cvm.seriesNote }}</dd>
          <dt>CPU</dt><dd>{{ result.cvm.cpu }}</dd>
          <dt>内存</dt><dd>{{ result.cvm.memory }}</dd>
          <dt>数量</dt><dd>{{ result.cvm.count }}</dd>
        </dl>
        <p class="pc-reason">{{ result.cvm.reason }}</p>
      </div>
    </div>

    <!-- CBS -->
    <div class="product-card">
      <div class="pc-header">
        <AppIcons name="harddrive" :size="20" />
        <span>云硬盘 CBS</span>
      </div>
      <div class="pc-body">
        <dl>
          <dt>类型</dt><dd>{{ result.cbs.type }}</dd>
          <dt>容量</dt><dd>{{ result.cbs.size }}</dd>
        </dl>
        <p class="pc-reason">{{ result.cbs.reason }}</p>
      </div>
    </div>

    <!-- MySQL -->
    <div v-if="result.mysql" class="product-card">
      <div class="pc-header">
        <AppIcons name="database" :size="20" />
        <span>云数据库 MySQL</span>
        <span class="pc-tag">{{ result.mysql.arch }}</span>
      </div>
      <div class="pc-body">
        <dl>
          <dt>架构</dt><dd>{{ result.mysql.arch }}</dd>
          <dt>CPU</dt><dd>{{ result.mysql.cpu }}</dd>
          <dt>内存</dt><dd>{{ result.mysql.memory }}</dd>
          <dt>存储</dt><dd>{{ result.mysql.storage }}</dd>
        </dl>
        <p class="pc-reason">{{ result.mysql.reason }}</p>
      </div>
    </div>
    <div v-else-if="result.mysqlReason" class="skip-msg">
      <AppIcons name="info" :size="16" color="#888" />
      {{ result.mysqlReason }}
    </div>

    <!-- 安全产品 -->
    <div v-if="result.security && result.security.items.length" class="product-card">
      <div class="pc-header">
        <AppIcons name="shield" :size="20" />
        <span>安全产品</span>
      </div>
      <div class="pc-body">
        <div class="tag-list">
          <span v-for="item in result.security.items" :key="item.name" class="stag">{{ item.name }}</span>
        </div>
        <p class="pc-reason">{{ result.security.reason }}</p>
      </div>
    </div>

    <!-- TRTC -->
    <div v-if="result.trtc" class="product-card">
      <div class="pc-header">
        <AppIcons name="video" :size="20" />
        <span>实时音视频 TRTC</span>
        <span class="pc-tag">{{ result.trtc.tier }}</span>
      </div>
      <div class="pc-body">
        <dl>
          <dt>版本</dt><dd>{{ result.trtc.tier }}</dd>
        </dl>
        <p class="pc-reason">{{ result.trtc.reason }}</p>
      </div>
    </div>

    <!-- 额外产品 -->
    <div v-if="result.extra && result.extra.items.length" class="product-card">
      <div class="pc-header">
        <AppIcons name="package" :size="20" />
        <span>建议搭配</span>
      </div>
      <div class="pc-body">
        <div class="tag-list">
          <span v-for="item in result.extra.items" :key="item.name" class="stag alt">{{ item.name }}</span>
        </div>
        <p class="pc-reason">{{ result.extra.reason }}</p>
      </div>
    </div>

    <!-- 计费 -->
    <div class="product-card">
      <div class="pc-header">
        <AppIcons name="dollar" :size="20" />
        <span>计费建议</span>
      </div>
      <div class="pc-body">
        <p class="billing">{{ result.billing }}</p>
        <p class="pc-reason" v-if="result.note">{{ result.note }}</p>
      </div>
    </div>

    <!-- 温馨提示 -->
    <div class="reminder">
      <AppIcons name="zap" :size="16" color="#22C55E" />
      <span>{{ result.reminder }}</span>
    </div>

    <!-- 操作 -->
    <div class="actions">
      <el-button @click="goBack"><AppIcons name="arrow-left" :size="16" /> 返回修改</el-button>
      <el-button type="primary" @click="newSurvey"><AppIcons name="refresh" :size="16" color="#fff" /> 新建调研</el-button>
      <el-button type="success" @click="copyResult"><AppIcons name="copy" :size="16" color="#fff" /> 复制方案</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { matchRecommendation } from '../engine/matcher.js'

const router = useRouter()
const result = ref({
  summary: '',
  cvm: { series: '', seriesNote: '', cpu: '', memory: '', count: '', reason: '' },
  cbs: { type: '', typeNote: '', size: '', reason: '' },
  mysql: null, mysqlReason: '',
  security: { items: [], reason: '' },
  trtc: null,
  extra: { items: [], reason: '' },
  billing: '', note: '', reminder: ''
})

onMounted(() => {
  const stored = sessionStorage.getItem('survey_result')
  if (!stored) { router.replace('/survey'); return }
  try { result.value = matchRecommendation(JSON.parse(stored)) }
  catch { router.replace('/survey') }
})

function goBack() { router.back() }
function newSurvey() { sessionStorage.removeItem('survey_result'); router.push('/survey') }

function copyResult() {
  const r = result.value
  let t = '【腾讯云产品配置推荐方案】\n\n'
  if (r.summary) t += `${r.summary}\n\n`
  t += `云服务器 CVM\n  ${r.cvm.series} / CPU ${r.cvm.cpu} / 内存 ${r.cvm.memory} / ${r.cvm.count}\n\n`
  t += `云硬盘 CBS\n  ${r.cbs.type} / ${r.cbs.size}\n\n`
  if (r.mysql) t += `云数据库 MySQL\n  ${r.mysql.arch} / ${r.mysql.cpu} / ${r.mysql.memory} / ${r.mysql.storage}\n\n`
  if (r.security?.items.length) {
    t += `安全产品\n`
    r.security.items.forEach(i => t += `  - ${i.name}\n`)
    t += '\n'
  }
  if (r.trtc) t += `实时音视频 TRTC\n  ${r.trtc.tier}\n\n`
  if (r.extra?.items.length) {
    t += `建议搭配\n`
    r.extra.items.forEach(i => t += `  - ${i.name}\n`)
    t += '\n'
  }
  t += `计费建议：${r.billing}\n\n💡 ${r.reminder}\n`
  navigator.clipboard.writeText(t).then(
    () => ElMessage.success('方案已复制，可直接发送给客户'),
    () => ElMessage.warning('复制失败，请手动选择文本')
  )
}
</script>

<style scoped>
.result { max-width: 640px; margin: 0 auto; }

.result-header { text-align: center; margin-bottom: 36px; }
.result-header h2 { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
.result-header .subtitle { font-size: 13px; color: var(--c-text2); }
.result-header .summary { margin-top: 12px; font-size: 12px; color: var(--c-text2); background: var(--c-bg); padding: 6px 14px; border-radius: 20px; display: inline-block; }

.product-card { background: var(--c-white); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 14px; overflow: hidden; }
.pc-header { display: flex; align-items: center; gap: 8px; padding: 14px 20px; background: #F9FAFB; border-bottom: 1px solid var(--c-border); font-size: 14px; font-weight: 600; }
.pc-tag { margin-left: auto; font-size: 11px; font-weight: 500; color: var(--c-text2); background: var(--c-bg); padding: 2px 8px; border-radius: 3px; }
.pc-body { padding: 16px 20px; }

dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; margin-bottom: 10px; }
dt { font-size: 12px; color: var(--c-text2); }
dd { font-size: 13px; font-weight: 500; }

.pc-reason { font-size: 12px; color: var(--c-text3); margin-top: 8px; line-height: 1.6; }

.tag-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.stag { font-size: 12px; font-weight: 500; background: #FEF2F2; color: #DC2626; padding: 3px 10px; border-radius: 4px; }
.stag.alt { background: var(--c-bg); color: var(--c-text2); }

.billing { font-size: 15px; font-weight: 600; color: var(--c-warning); }

.skip-msg { display: flex; align-items: center; gap: 8px; padding: 14px 20px; font-size: 13px; color: var(--c-text2); background: var(--c-white); border: 1px solid var(--c-border); border-radius: var(--radius); margin-bottom: 14px; }

.reminder { display: flex; align-items: flex-start; gap: 10px; margin: 24px 0; padding: 16px 20px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius); font-size: 13px; color: #166534; line-height: 1.6; }

.actions { display: flex; justify-content: center; gap: 10px; margin-top: 12px; }
.actions .el-button { display: inline-flex !important; align-items: center; gap: 5px; font-weight: 500; }
</style>
