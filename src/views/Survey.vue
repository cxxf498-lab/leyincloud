<template>
  <div class="survey-container">
    <!-- 顶部标题 -->
    <div class="survey-header">
      <h2>腾讯云产品配置需求调研</h2>
      <p class="subtitle">请根据客户情况填写，答不出的标注"未知"即可，预计 5-10 分钟完成</p>
    </div>

    <!-- 步骤条 -->
    <el-steps :active="currentStep" align-center finish-status="success" class="steps-nav">
      <el-step title="基础信息" />
      <el-step title="业务场景" />
      <el-step title="CVM算力" />
      <el-step title="CBS存储" />
      <el-step title="数据库" />
      <el-step title="安全产品" />
      <el-step title="音视频" />
      <el-step title="其他需求" />
    </el-steps>

    <!-- 表单区域 -->
    <div class="form-area">
      <el-card>
        <!-- 步骤1：基础信息 -->
        <div v-show="currentStep === 0">
          <h3 class="step-title">第一部分：基础信息</h3>
          <el-form :model="formData.part1" label-position="top" size="large">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="公司名称">
                  <el-input v-model="formData.part1.companyName" placeholder="请输入公司名称" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input v-model="formData.part1.contact" placeholder="请输入联系人" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.part1.phone" placeholder="请输入联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="本次采购预算（年）">
              <el-radio-group v-model="formData.part1.budget">
                <el-radio-button value="5,000元以下">5,000元以下</el-radio-button>
                <el-radio-button value="5,000-2万">5,000-2万</el-radio-button>
                <el-radio-button value="2-10万">2-10万</el-radio-button>
                <el-radio-button value="10-50万">10-50万</el-radio-button>
                <el-radio-button value="50万以上">50万以上</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否有紧急上线时间要求？">
              <el-radio-group v-model="formData.part1.urgent">
                <el-radio value="是，___月内上线">是，___月内上线</el-radio>
                <el-radio value="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="目前业务部署在哪里？">
              <el-radio-group v-model="formData.part1.currentDeploy">
                <el-radio value="自建机房">自建机房</el-radio>
                <el-radio value="其他云厂商（哪家：____）">其他云厂商（哪家：____）</el-radio>
                <el-radio value="从未上云">从未上云</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <!-- 步骤2：业务场景 -->
        <div v-show="currentStep === 1">
          <h3 class="step-title">第二部分：业务场景（最重要）</h3>
          <el-form :model="formData.part2" label-position="top" size="large">
            <el-form-item label="请简要描述您的业务">
              <el-input v-model="formData.part2.businessDesc" type="textarea" :rows="2"
                placeholder="示例：一个面向中小企业的电商网站，售卖办公用品，预计日活用户500人左右。" />
            </el-form-item>
            <el-form-item label="业务类型是什么？">
              <el-radio-group v-model="formData.part2.businessType">
                <el-radio-button value="企业官网/展示型网站">企业官网</el-radio-button>
                <el-radio-button value="电商平台">电商平台</el-radio-button>
                <el-radio-button value="社交/社区App">社交/社区</el-radio-button>
                <el-radio-button value="在线教育">在线教育</el-radio-button>
                <el-radio-button value="游戏">游戏</el-radio-button>
                <el-radio-button value="直播/音视频">直播/音视频</el-radio-button>
                <el-radio-button value="企业OA/ERP">企业OA/ERP</el-radio-button>
                <el-radio-button value="大数据/AI训练">大数据/AI训练</el-radio-button>
                <el-radio-button value="其他">其他</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="预计日活跃用户（DAU）或日均访问量？">
              <el-input v-model="formData.part2.dau" placeholder="例如：500" style="width: 240px">
                <template #append>人/天</template>
              </el-input>
            </el-form-item>
            <el-form-item label="业务高峰时段？">
              <el-radio-group v-model="formData.part2.peakTime">
                <el-radio value="工作日白天">工作日白天</el-radio>
                <el-radio value="晚上/周末">晚上/周末</el-radio>
                <el-radio value="大促期间（如618、双11）">大促期间</el-radio>
                <el-radio value="均匀分布">均匀分布</el-radio>
                <el-radio value="未知">未知</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="业务是否有明显的流量波动？">
              <el-radio-group v-model="formData.part2.trafficPattern">
                <el-radio value="平稳无波动">平稳无波动</el-radio>
                <el-radio value="有周期性波动（如大促）">有周期性波动</el-radio>
                <el-radio value="波动剧烈不可预测">波动剧烈不可预测</el-radio>
                <el-radio value="未知">未知</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="目标用户主要分布在哪些地区？">
              <el-radio-group v-model="formData.part2.userRegion">
                <el-radio value="中国大陆">中国大陆</el-radio>
                <el-radio value="海外">海外</el-radio>
                <el-radio value="全球">全球</el-radio>
                <el-radio value="未知">未知</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <!-- 步骤3：CVM -->
        <div v-show="currentStep === 2">
          <h3 class="step-title">第三部分：云服务器 CVM（算力需求）</h3>
          <el-form :model="formData.part3" label-position="top" size="large">
            <el-divider content-position="left">CPU / 内存需求</el-divider>
            <el-form-item label="预计需要多少核CPU？">
              <el-radio-group v-model="formData.part3.cpuCores">
                <el-radio-button value="1-2核">1-2核</el-radio-button>
                <el-radio-button value="4-8核">4-8核</el-radio-button>
                <el-radio-button value="16核以上">16核以上</el-radio-button>
                <el-radio-button value="不确定">不确定</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="预计需要多少内存？">
              <el-radio-group v-model="formData.part3.memorySize">
                <el-radio-button value="1-2GB">1-2GB</el-radio-button>
                <el-radio-button value="4-8GB">4-8GB</el-radio-button>
                <el-radio-button value="16GB以上">16GB以上</el-radio-button>
                <el-radio-button value="不确定">不确定</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="对CPU性能有特殊要求吗？">
              <el-radio-group v-model="formData.part3.cpuRequirement">
                <el-radio value="无特殊要求">无特殊要求</el-radio>
                <el-radio value="需要高主频计算（视频转码/科学计算）">需要高主频计算</el-radio>
                <el-radio value="需要大量内存（数据库/缓存）">需要大量内存</el-radio>
                <el-radio value="需要GPU（AI训练/渲染）">需要GPU</el-radio>
                <el-radio value="不确定">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-divider content-position="left">计费模式偏好</el-divider>
            <el-form-item label="业务是长期稳定运行还是短期测试？">
              <el-radio-group v-model="formData.part3.billingMode">
                <el-radio value="长期稳定（建议包年包月）">长期稳定（包年包月）</el-radio>
                <el-radio value="短期/测试（建议按量计费）">短期/测试（按量计费）</el-radio>
                <el-radio value="不确定">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否可以接受【竞价实例】（价格极低但可能被回收）？">
              <el-radio-group v-model="formData.part3.spotInstance">
                <el-radio value="可以（适合无状态可中断任务）">可以</el-radio>
                <el-radio value="不可以（线上业务不能中断）">不可以</el-radio>
                <el-radio value="不确定">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <!-- 步骤4：CBS -->
        <div v-show="currentStep === 3">
          <h3 class="step-title">第四部分：云硬盘 CBS（存储需求）</h3>
          <el-form :model="formData.part4" label-position="top" size="large">
            <el-form-item label="需要多少存储空间？">
              <el-input v-model="formData.part4.storageSize" placeholder="例如：200" style="width: 240px">
                <template #append>GB</template>
              </el-input>
              <span class="field-hint">单盘最大32TB</span>
            </el-form-item>
            <el-form-item label="对读写速度有要求吗？">
              <el-radio-group v-model="formData.part4.speedRequirement">
                <el-radio value="普通就行（网站/文件存储）">普通就行</el-radio>
                <el-radio value="要求较高（数据库/交易系统）">要求较高</el-radio>
                <el-radio value="要求极高（大型数据库/高频交易）">要求极高</el-radio>
                <el-radio value="未知">未知</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="数据重要性如何？">
              <el-radio-group v-model="formData.part4.dataImportance">
                <el-radio value="丢了也没事（测试环境）">丢了也没事</el-radio>
                <el-radio value="重要但不能丢（正式业务）">重要不能丢</el-radio>
                <el-radio value="极其重要（金融/核心数据）">极其重要</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要数据备份/快照功能？">
              <el-radio-group v-model="formData.part4.needBackup">
                <el-radio value="需要">需要</el-radio>
                <el-radio value="不需要">不需要</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <!-- 步骤5：MySQL -->
        <div v-show="currentStep === 4">
          <h3 class="step-title">第五部分：云数据库 MySQL</h3>
          <el-form :model="formData.part5" label-position="top" size="large">
            <el-form-item label="是否使用MySQL数据库？">
              <el-radio-group v-model="formData.part5.useMySQL">
                <el-radio value="是">是</el-radio>
                <el-radio value="否（用其他">否（用其他数据库）</el-radio>
                <el-radio value="不确定">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="formData.part5.useMySQL === '是'">
              <el-form-item label="预计数据库并发连接数？">
                <el-input v-model="formData.part5.dbConcurrency" placeholder="例如：100" style="width: 240px" />
              </el-form-item>
              <el-form-item label="数据量预估？">
                <el-input v-model="formData.part5.dbDataSize" placeholder="例如：50" style="width: 240px">
                  <template #append>GB</template>
                </el-input>
              </el-form-item>
              <el-form-item label="对数据库可用性要求？">
                <el-radio-group v-model="formData.part5.dbAvailability">
                  <el-radio value="一般（挂了半小时能接受）">一般</el-radio>
                  <el-radio value="较高（不能超过几分钟）">较高</el-radio>
                  <el-radio value="极高（几乎不能挂）">极高</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否需要数据库读写分离？">
                <el-radio-group v-model="formData.part5.dbReadWriteSep">
                  <el-radio value="需要">需要</el-radio>
                  <el-radio value="不需要">不需要</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="预算是否敏感？">
                <el-radio-group v-model="formData.part5.dbBudgetSensitive">
                  <el-radio value="是，要最便宜的">预算敏感</el-radio>
                  <el-radio value="正常即可">正常即可</el-radio>
                  <el-radio value="预算充足，要最好的">预算充足</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-form>
        </div>

        <!-- 步骤6：安全产品 -->
        <div v-show="currentStep === 5">
          <h3 class="step-title">第六部分：安全产品</h3>
          <el-form :model="formData.part6" label-position="top" size="large">
            <el-form-item label="是否需要安全防护产品？">
              <el-radio-group v-model="formData.part6.skipSecurity">
                <el-radio :value="false">需要，继续填写</el-radio>
                <el-radio :value="true">不需要，跳过此部分</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="!formData.part6.skipSecurity">
              <el-divider content-position="left">DDoS 防护</el-divider>
              <el-form-item label="是否曾被DDoS攻击过？">
                <el-radio-group v-model="formData.part6.ddosAttacked">
                  <el-radio value="是（峰值：______ Gbps）">是</el-radio>
                  <el-radio value="否">否</el-radio>
                  <el-radio value="不清楚">不清楚</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="业务是否容易被攻击？（游戏、电商、金融是重灾区）">
                <el-radio-group v-model="formData.part6.ddosEasyTarget">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                  <el-radio value="不确定">不确定</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="需要防护多少个公网IP？">
                <el-input-number v-model="formData.part6.ddosIpCount" :min="1" :max="100" />
              </el-form-item>
              <el-divider content-position="left">Web 应用防火墙 WAF</el-divider>
              <el-form-item label="是否有网站/Web业务？">
                <el-radio-group v-model="formData.part6.hasWeb">
                  <el-radio value="是（____个域名）">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="网站是否涉及交易/支付/用户数据？">
                <el-radio-group v-model="formData.part6.hasTransaction">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-divider content-position="left">云防火墙</el-divider>
              <el-form-item label="是否有多个VPC网络需要隔离管控？">
                <el-radio-group v-model="formData.part6.multiVpc">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否需要满足等保合规要求？">
                <el-radio-group v-model="formData.part6.needCompliance">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-form>
        </div>

        <!-- 步骤7：TRTC -->
        <div v-show="currentStep === 6">
          <h3 class="step-title">第七部分：TRTC 实时音视频</h3>
          <el-form :model="formData.part7" label-position="top" size="large">
            <el-form-item label="是否需要音视频通话/直播功能？">
              <el-radio-group v-model="formData.part7.skipTrtc">
                <el-radio :value="false">需要，继续填写</el-radio>
                <el-radio :value="true">不需要，跳过此部分</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="!formData.part7.skipTrtc">
            <el-form-item label="主要应用场景？">
              <el-radio-group v-model="formData.part7.needsTrtc">
                <el-radio value="是">需要音视频</el-radio>
                <el-radio value="不确定">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="formData.part7.needsTrtc === '是'">
              <el-form-item label="主要场景是？">
                <el-radio-group v-model="formData.part7.trtcScenario">
                  <el-radio value="1v1通话">1v1通话</el-radio>
                  <el-radio value="多人会议">多人会议</el-radio>
                  <el-radio value="互动直播">互动直播</el-radio>
                  <el-radio value="在线教育">在线教育</el-radio>
                  <el-radio value="游戏语音">游戏语音</el-radio>
                  <el-radio value="其他">其他</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="预计同时在线并发用户数？">
                <el-input v-model="formData.part7.trtcConcurrency" placeholder="例如：200" style="width: 240px">
                  <template #append>人</template>
                </el-input>
              </el-form-item>
              <el-form-item label="对延迟要求？">
                <el-radio-group v-model="formData.part7.trtcLatency">
                  <el-radio value="能接受1-2秒延迟">能接受1-2秒</el-radio>
                  <el-radio value="必须<300ms（实时互动）">必须&lt;300ms</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用户分布在国内还是海外？">
                <el-radio-group v-model="formData.part7.trtcRegion">
                  <el-radio value="国内">国内</el-radio>
                  <el-radio value="海外">海外</el-radio>
                  <el-radio value="全球">全球</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            </template>
          </el-form>
        </div>

        <!-- 步骤8：其他需求 -->
        <div v-show="currentStep === 7">
          <h3 class="step-title">第八部分：其他需求</h3>
          <el-form :model="formData.part8" label-position="top" size="large">
            <el-form-item label="是否有特殊合规要求？（等保、GDPR等）">
              <el-input v-model="formData.part8.compliance" placeholder="例如：等保三级，GDPR合规" />
            </el-form-item>
            <el-form-item label="是否需要技术支持/运维服务？">
              <el-radio-group v-model="formData.part8.supportLevel">
                <el-radio value="需要全程支持">需要全程支持</el-radio>
                <el-radio value="基础支持即可">基础支持即可</el-radio>
                <el-radio value="自己搞定">自己搞定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否有其他云产品需求？">
              <el-input v-model="formData.part8.otherProducts"
                placeholder="如：CDN、对象存储COS、负载均衡CLB等" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <!-- 底部操作栏 -->
    <div class="form-actions">
      <el-button v-if="currentStep > 0" @click="prevStep" size="large">上一步</el-button>
      <el-button v-if="currentStep < 7" type="primary" @click="nextStep" size="large">
        下一步
      </el-button>
      <el-button v-if="currentStep === 7" type="success" @click="submitForm" size="large" :icon="Check">
        提交并生成方案
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Check } from '@element-plus/icons-vue'

const router = useRouter()
const currentStep = ref(0)

// 表单数据（8个部分）
const formData = reactive({
  part1: {
    companyName: '', contact: '', phone: '',
    budget: '', urgent: '', currentDeploy: ''
  },
  part2: {
    businessDesc: '', businessType: '', dau: '0',
    peakTime: '', trafficPattern: '', userRegion: ''
  },
  part3: {
    cpuCores: '', memorySize: '', cpuRequirement: '',
    billingMode: '', spotInstance: ''
  },
  part4: {
    storageSize: '100', speedRequirement: '',
    dataImportance: '', needBackup: ''
  },
  part5: {
    useMySQL: '', dbConcurrency: '', dbDataSize: '',
    dbAvailability: '', dbReadWriteSep: '', dbBudgetSensitive: ''
  },
  part6: {
    skipSecurity: false,
    ddosAttacked: '', ddosEasyTarget: '', ddosIpCount: 1,
    hasWeb: '', hasTransaction: '', multiVpc: '', needCompliance: ''
  },
  part7: {
    skipTrtc: false, needsTrtc: '', trtcScenario: '', trtcConcurrency: '',
    trtcLatency: '', trtcRegion: ''
  },
  part8: {
    compliance: '', supportLevel: '', otherProducts: ''
  }
})

// 草稿自动保存
const STORAGE_KEY = 'cloud_survey_draft'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved)
      Object.keys(data).forEach(key => {
        if (formData[key]) {
          Object.assign(formData[key], data[key])
        }
      })
    } catch { /* ignore */ }
  }
})

watch(formData, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}, { deep: true })

function nextStep() {
  if (currentStep.value < 7) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

function submitForm() {
  // 存储数据到 sessionStorage 供结果页使用
  sessionStorage.setItem('survey_result', JSON.stringify(formData))
  // 清除草稿
  localStorage.removeItem(STORAGE_KEY)
  router.push('/result')
}
</script>

<style scoped>
.survey-container { max-width: 720px; margin: 0 auto; }
.survey-header { text-align: center; margin-bottom: 40px; }
.survey-header h2 { font-size: 22px; font-weight: 700; color: var(--c-text); letter-spacing: -0.3px; margin-bottom: 6px; }
.survey-header .subtitle { color: var(--c-text2); font-size: 13px; }
.steps-nav { margin-bottom: 40px; }
.step-title { font-size: 16px; font-weight: 600; color: var(--c-text); margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--c-border); }
.form-area { margin-bottom: 32px; }
.form-area :deep(.el-card__body) { padding: 28px 32px; }
.field-hint { margin-left: 10px; color: var(--c-text2); font-size: 12px; }
.form-actions { display: flex; justify-content: center; gap: 12px; }
.form-actions .el-button { min-width: 120px; font-weight: 500; }
</style>
