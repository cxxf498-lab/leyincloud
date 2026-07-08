import {
  RECOMMENDATION_RULES,
  PRODUCT_SERIES,
  BUDGET_LEVELS,
  recommendCBSBySpeed,
  recommendMySQLArch,
} from './rules.js'

/**
 * 核心匹配函数：输入客户调研数据，输出推荐方案
 * @param {Object} formData - 客户填写的调研数据
 * @returns {Object} 推荐方案
 */
export function matchRecommendation(formData) {
  const data = normalizeData(formData)
  const debugReasons = []

  // 1. 按优先级尝试匹配业务规则
  const sortedRules = [...RECOMMENDATION_RULES].sort((a, b) => b.priority - a.priority)
  let matchedRule = null

  for (const rule of sortedRules) {
    if (rule.condition(data)) {
      matchedRule = rule
      debugReasons.push(`命中规则: ${rule.name}（优先级 ${rule.priority}）`)
      break
    }
  }

  // 兜底：使用第一条通用规则（中小企业官网）
  if (!matchedRule) {
    matchedRule = sortedRules.find(r => r.id === 'smb_website_oa')
    debugReasons.push('未命中特定规则，使用兜底规则：中小企业官网')
  }

  const ruleResult = matchedRule.recommend(data)

  // 2. 构建完整输出结构
  const result = buildResult(data, ruleResult, matchedRule.name)

  return {
    ...result,
    debugReasons,
    ruleName: matchedRule.name,
  }
}

/**
 * 数据标准化：将表单数据转为引擎需要的格式
 */
function normalizeData(formData) {
  const p = formData.part1 || {}   // 基础信息
  const p2 = formData.part2 || {}  // 业务场景
  const p3 = formData.part3 || {}  // CVM
  const p4 = formData.part4 || {}  // CBS
  const p5 = formData.part5 || {}  // MySQL
  const p6 = formData.part6 || {}  // 安全
  const p7 = formData.part7 || {}  // TRTC
  const p8 = formData.part8 || {}  // 其他

  return {
    companyName: p.companyName || '',
    contact: p.contact || '',
    phone: p.phone || '',
    budget: p.budget || '',
    urgent: p.urgent || '',
    currentDeploy: p.currentDeploy || '',

    businessType: p2.businessType || '',
    dau: p2.dau || '0',
    peakTime: p2.peakTime || '',
    trafficPattern: p2.trafficPattern || '',
    userRegion: p2.userRegion || '',

    cpuRequirement: p3.cpuRequirement || '',
    cpuCores: p3.cpuCores || '',
    memorySize: p3.memorySize || '',
    billingMode: p3.billingMode || '',
    spotInstance: p3.spotInstance || '',

    storageSize: p4.storageSize || '100',
    speedRequirement: p4.speedRequirement || '',
    dataImportance: p4.dataImportance || '',
    needBackup: p4.needBackup || '',

    useMySQL: p5.useMySQL || '',
    dbConcurrency: p5.dbConcurrency || '',
    dbDataSize: p5.dbDataSize || '',
    dbAvailability: p5.dbAvailability || '',
    dbReadWriteSep: p5.dbReadWriteSep || '',
    dbBudgetSensitive: p5.dbBudgetSensitive || '',

    ddosAttacked: p6.ddosAttacked || '',
    ddosEasyTarget: p6.ddosEasyTarget || '',
    ddosIpCount: p6.ddosIpCount || 1,
    hasWeb: p6.hasWeb || '',
    hasTransaction: p6.hasTransaction || '',
    multiVpc: p6.multiVpc || '',
    needCompliance: p6.needCompliance || '',

    needsTrtc: p7.needsTrtc || '',
    trtcScenario: p7.trtcScenario || '',
    trtcConcurrency: p7.trtcConcurrency || '',
    trtcLatency: p7.trtcLatency || '',
    trtcRegion: p7.trtcRegion || '',

    compliance: p8.compliance || '',
    supportLevel: p8.supportLevel || '',
    otherProducts: p8.otherProducts || '',
  }
}

/**
 * 构建完整输出结果
 */
function buildResult(data, ruleResult, ruleName) {
  const result = {
    // 客户信息摘要
    summary: buildSummary(data),

    // 匹配规则名称
    ruleName,

    // CVM推荐
    cvm: buildCVMResult(data, ruleResult.cvm),

    // CBS推荐
    cbs: buildCBSResult(data, ruleResult.cbs),

    // MySQL推荐
    mysql: null,
    mysqlReason: '',

    // 安全产品推荐
    security: buildSecurityResult(data, ruleResult.security, ruleResult.securityReason),

    // TRTC推荐
    trtc: null,

    // 额外产品
    extra: buildExtraResult(data, ruleResult.extra, ruleResult.extraReason),

    // 计费建议
    billing: ruleResult.billing || '包年包月',

    // 备注
    note: ruleResult.note || '',

    // 温馨提示
    reminder: 'CVM支持在线升降配，CPU、内存、硬盘、带宽都可以随时调整——选小了随时能升，选大了也不用一直付冤枉钱。',
  }

  // MySQL推荐
  if (data.useMySQL !== '否（用其他' && data.useMySQL !== '不确定' && ruleResult.mysql) {
    result.mysql = buildMySQLResult(data, ruleResult.mysql)
    result.mysqlReason = ruleResult.mysql.reason || ''
  } else if (data.useMySQL === '否（用其他') {
    result.mysqlReason = '客户不使用MySQL，已跳过'
  }

  // TRTC推荐
  if (data.needsTrtc && data.needsTrtc !== '否') {
    result.trtc = buildTRTCResult(data, ruleResult.trtc)
  }

  return result
}

function buildSummary(data) {
  const parts = []
  if (data.companyName) parts.push(`公司：${data.companyName}`)
  if (data.businessType) parts.push(`业务类型：${data.businessType}`)
  if (data.dau && data.dau !== '0') parts.push(`日活：${data.dau}`)
  if (data.budget) {
    const budgetInfo = BUDGET_LEVELS[data.budget]
    parts.push(`预算：${budgetInfo ? budgetInfo.name : data.budget}`)
  }
  return parts.join('  |  ') || '未填写关键信息'
}

function buildCVMResult(data, cvmRule) {
  const series = PRODUCT_SERIES.cvm[cvmRule.series]
  // 用户填写的CPU/内存需求可覆写规则
  let spec = cvmRule.spec
  if (data.cpuCores && data.memorySize) {
    spec = `${data.cpuCores} / ${data.memorySize}`
  }
  return {
    series: series.name,
    seriesNote: series.note,
    spec,
    count: cvmRule.count,
    reason: cvmRule.reason,
  }
}

function buildCBSResult(data, cbsRule) {
  // 用户填写的速度要求可以覆写规则
  let cbsType = cbsRule.type
  if (data.speedRequirement) {
    const override = recommendCBSBySpeed(data.speedRequirement)
    if (override) cbsType = override
  }
  const cbsInfo = PRODUCT_SERIES.cbs[cbsType]
  const size = data.storageSize && data.storageSize !== '100' ? data.storageSize : cbsRule.size
  return {
    type: cbsInfo.name,
    typeNote: cbsInfo.note,
    size: `${size}GB`,
    reason: cbsRule.reason,
  }
}

function buildMySQLResult(data, mysqlRule) {
  // 用户填写的可用性需求可以覆写规则
  let arch = mysqlRule.arch
  if (data.dbAvailability) {
    const override = recommendMySQLArch(data.dbAvailability)
    if (override) arch = override
  }
  const archInfo = PRODUCT_SERIES.mysql[arch]
  return {
    arch: archInfo.name,
    archNote: archInfo.note,
    spec: mysqlRule.spec,
    reason: mysqlRule.reason,
  }
}

function buildSecurityResult(data, securityList, reason) {
  if (!securityList || securityList.length === 0) {
    return { items: [], reason: reason || '暂无安全产品推荐' }
  }
  const items = securityList.map(key => {
    const info = PRODUCT_SERIES.security[key]
    return info || { name: key }
  })
  return { items, reason: reason || '' }
}

function buildExtraResult(data, extraList, reason) {
  if (!extraList || extraList.length === 0) {
    return { items: [], reason: reason || '' }
  }
  const items = extraList.map(key => {
    const info = PRODUCT_SERIES.extra[key]
    return info || { name: key }
  })
  return { items, reason: reason || '' }
}

function buildTRTCResult(data, trtcRule) {
  if (!trtcRule) return null
  const tierInfo = PRODUCT_SERIES.trtc[trtcRule.tier]
  return {
    tier: tierInfo.name,
    tierNote: tierInfo.note,
    reason: trtcRule.reason,
  }
}
