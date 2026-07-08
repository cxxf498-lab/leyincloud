<template>
  <div class="history">
    <div class="history-header">
      <h2>历史记录</h2>
      <el-button v-if="list.length" text type="danger" size="small" @click="handleClear">
        <AppIcons name="refresh" :size="14" /> 清空全部
      </el-button>
    </div>

    <!-- 空状态 -->
    <div v-if="list.length === 0" class="empty">
      <AppIcons name="clipboard" :size="40" color="#ccc" />
      <p>暂无调研记录</p>
      <el-button type="primary" size="small" @click="$router.push('/survey')">
        <AppIcons name="plus" :size="14" color="#fff" /> 开始调研
      </el-button>
    </div>

    <!-- 记录列表 -->
    <div v-else class="list">
      <div v-for="item in list" :key="item.id" class="record-card">
        <div class="rc-header" @click="item._open = !item._open">
          <div class="rc-main">
            <span class="rc-company">{{ item.companyName || '未填公司名' }}</span>
            <span class="rc-type">{{ item.businessType || '未填业务类型' }}</span>
          </div>
          <div class="rc-meta">
            <span class="rc-price">¥{{ item.totalOffer?.toLocaleString() }}/月</span>
            <span class="rc-time">{{ item.createdAt }}</span>
            <span class="rc-arrow" :class="{ open: item._open }">
              <AppIcons name="chevrondown" :size="16" />
            </span>
          </div>
        </div>
        <div v-if="item._open" class="rc-body">
          <template v-if="item.recommendation">
            <div class="rc-summary" v-if="item.recommendation.summary">{{ item.recommendation.summary }}</div>
            <table class="rc-table">
              <thead>
                <tr><th>产品</th><th>规格</th><th class="num">月付</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in item.pricing?.items" :key="p.product">
                  <td>{{ p.product }}</td>
                  <td>{{ p.spec }}</td>
                  <td class="num">¥{{ p.offer.toLocaleString() }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr><td colspan="2" class="total-label">合计</td><td class="num total">¥{{ item.totalOffer?.toLocaleString() }}/月</td></tr>
              </tfoot>
            </table>
            <div class="rc-actions">
              <el-button size="small" @click="handleDelete(item.id)" text type="danger">删除</el-button>
              <el-button size="small" type="primary" @click="handleView(item)">查看完整方案</el-button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { loadHistory, deleteHistory, clearHistory } from '../utils/storage.js'

const router = useRouter()
const list = ref([])

onMounted(() => {
  list.value = loadHistory()
})

function handleDelete(id) {
  ElMessageBox.confirm('确定删除这条记录？', '确认', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' })
    .then(() => { list.value = deleteHistory(id) })
    .catch(() => {})
}

function handleClear() {
  ElMessageBox.confirm('确定清空所有历史记录？此操作不可恢复。', '确认清空', { type: 'warning', confirmButtonText: '清空', cancelButtonText: '取消' })
    .then(() => { clearHistory(); list.value = [] })
    .catch(() => {})
}

function handleView(item) {
  sessionStorage.setItem('survey_result', JSON.stringify(item.formData))
  sessionStorage.setItem('result_saved', '1')
  router.push('/result')
}
</script>

<style scoped>
.history { max-width: 640px; margin: 0 auto; }
.history-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.history-header h2 { font-size: 22px; font-weight: 700; }

.empty { text-align: center; padding: 80px 0; color: var(--c-text2); }
.empty p { margin: 16px 0 20px; font-size: 14px; }

.list { display: flex; flex-direction: column; gap: 10px; }
.record-card { background: var(--c-white); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.rc-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; cursor: pointer; user-select: none; transition: background .15s; }
.rc-header:hover { background: #F9FAFB; }
.rc-main { display: flex; align-items: center; gap: 10px; min-width: 0; }
.rc-company { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rc-type { font-size: 11px; color: var(--c-text2); background: var(--c-bg); padding: 2px 8px; border-radius: 3px; white-space: nowrap; }
.rc-meta { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.rc-price { font-size: 14px; font-weight: 600; color: var(--c-primary); }
.rc-time { font-size: 12px; color: var(--c-text3); }
.rc-arrow { transition: transform .2s; display: flex; }
.rc-arrow.open { transform: rotate(180deg); }

.rc-body { padding: 0 20px 18px; border-top: 1px solid var(--c-border); }
.rc-summary { font-size: 12px; color: var(--c-text2); padding: 12px 0 8px; }
.rc-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 10px; }
.rc-table th, .rc-table td { padding: 6px 8px; text-align: left; border-bottom: 1px solid var(--c-border); }
.rc-table th { font-size: 11px; color: var(--c-text2); }
.rc-table .num { text-align: right; white-space: nowrap; }
.rc-table tfoot td { border-bottom: none; font-weight: 600; }
.rc-table .total { color: var(--c-primary); }
.rc-actions { display: flex; justify-content: flex-end; gap: 8px; }
</style>
