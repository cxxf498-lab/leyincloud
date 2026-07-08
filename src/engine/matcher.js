import {
  RECOMMENDATION_RULES,
  PRODUCT_SERIES,
  BUDGET_LEVELS,
  recommendCBSBySpeed,
  recommendMySQLArch,
} from './rules.js'

/**
 * 核心匹配函数：输入客户调研数据，输出推荐方案
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
      debugReasons.push(`命中规则: ${rule.name}`)
      break
    }
  }

  // 兜底
  if (!matchedRule) {
    matchedRule = sortedRules.find(r => r.id === 'smb_website_oa')
    debugReasons.push('未命中特定规则，使用兜底规则：中小企业官网')
  }

  const ruleResult = matchedRule.recommend(data)

  // 用户跳过安全产品时，清除安全推荐
  if (data.skipSecurity) {
    ruleResult.security = []
    ruleResult.securityReason = '用户选择不需要安全产品'
  }

  // 用户跳过TRTC时，清除TRTC推荐
  if (data.skipTrtc) {
    ruleResult.trtc = null
  }

  const result = buildResult(data, ruleResult, matchedRule.name)

  return {
    ...result,
    debugReasons,
    ruleName: matchedRule.name,
  }
}

function normalizeData(formData) {
  const p1 = formData.part1 || {}
  const p2 = formData.part2 || {}
  const p3 = formData.part3 || {}
  const p4 = formData.part4 || {}
  const p5 = formData.part5 || {}
  const p6 = formData.part6 || {}
  const p7 = formData.part7 || {}
  const p8 = formData.part8 || {}

  return {
    companyName: p1.companyName || '',
    contact: p1.contact || '',
    phone: p1.phone || '',
    budget: p1.budget || '',
    urgent: p1.urgent || '',
    currentDeploy: p1.currentDeploy || '',

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

    skipSecurity: p6.skipSecurity || false,
    ddosAttacked: p6.ddosAttacked || '',
    ddosEasyTarget: p6.ddosEasyTarget || '',
    ddosIpCount: p6.ddosIpCount || 1,
    hasWeb: p6.hasWeb || '',
    hasTransaction: p6.hasTransaction || '',
    multiVpc: p6.multiVpc || '',
    needCompliance: p6.needCompliance || '',

    skipTrtc: p7.skipTrtc || false,
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

function buildResult(data, ruleResult, ruleName) {
  const result = {
    summary: buildSummary(data),
    ruleName,

    cvm: buildCVMResult(ruleResult.cvm),

    cbs: buildCBSResult(data, ruleResult.cbs),

    mysql: null,
    mysqlReason: '',

    security: buildSecurityResult(ruleResult.security, ruleResult.securityReason),

    trtc: null,

    extra: buildExtraResult(ruleResult.extra, ruleResult.extraReason),

    billing: ruleResult.billing || '包年包月',
    note: ruleResult.note || '',
    reminder: 'CVM支持在线升降配，CPU、内存、硬盘、带宽都可以随时调整——选小了随时能升，选大了也不用一直付冤枉钱。',
  }

  // MySQL推荐
  if (data.useMySQL !== '否（用其他' && data.useMySQL !== '不确定' && ruleResult.mysql) {
    result.mysql = buildMySQLResult(data, ruleResult.mysql)
  } else if (data.useMySQL === '否（用其他') {
    result.mysqlReason = '客户不使用MySQL，已跳过'
  }

  // TRTC推荐
  if (data.needsTrtc && data.needsTrtc !== '否' && !data.skipTrtc && ruleResult.trtc) {
    result.trtc = buildTRTCResult(ruleResult.trtc)
  }

  return result
}

function buildSummary(data) {
  const parts = []
  if (data.companyName) parts.push(`公司：${data.companyName}`)
  if (data.businessType) parts.push(`业务类型：${data.businessType}`)
  if (data.dau && data.dau !== '0') parts.push(`日活：${data.dau}`)
  if (data.budget) {
    const info = BUDGET_LEVELS[data.budget]
    parts.push(`预算：${info ? info.name : data.budget}`)
  }
  return parts.join('  |  ') || '未填写关键信息'
}

function buildCVMResult(cvmRule) {
  const series = PRODUCT_SERIES.cvm[cvmRule.series]
  return {
    series: series.name,
    seriesNote: series.note,
    cpu: cvmRule.cpu,
    memory: cvmRule.memory,
    bandwidth: cvmRule.bandwidth,
    count: cvmRule.count,
    reason: cvmRule.reason,
  }
}

function buildCBSResult(data, cbsRule) {
  let cbsType = cbsRule.type
  if (data.speedRequirement) {
    const override = recommendCBSBySpeed(data.speedRequirement)
    if (override) cbsType = override
  }
  const cbsInfo = PRODUCT_SERIES.cbs[cbsType]
  const size = data.storageSize && data.storageSize !== '100' ? `${data.storageSize}GB` : cbsRule.size
  return {
    type: cbsInfo.name,
    typeNote: cbsInfo.note,
    size,
    reason: cbsRule.reason,
  }
}

function buildMySQLResult(data, mysqlRule) {
  let arch = mysqlRule.arch
  if (data.dbAvailability) {
    const override = recommendMySQLArch(data.dbAvailability)
    if (override) arch = override
  }
  const archInfo = PRODUCT_SERIES.mysql[arch]
  return {
    arch: archInfo.name,
    archNote: archInfo.note,
    cpu: mysqlRule.cpu,
    memory: mysqlRule.memory,
    storage: mysqlRule.storage,
    reason: mysqlRule.reason,
  }
}

function buildSecurityResult(securityList, reason) {
  if (!securityList || securityList.length === 0) {
    return { skipped: false, items: [], reason: reason || '暂无安全产品推荐' }
  }
  const items = securityList.map(key => {
    const info = PRODUCT_SERIES.security[key]
    return info || { name: key }
  })
  return { skipped: false, items, reason: reason || '' }
}

function buildExtraResult(extraList, reason) {
  if (!extraList || extraList.length === 0) {
    return { items: [], reason: reason || '' }
  }
  const items = extraList.map(key => {
    const info = PRODUCT_SERIES.extra[key]
    return info || { name: key }
  })
  return { items, reason: reason || '' }
}

function buildTRTCResult(trtcRule) {
  if (!trtcRule) return null
  const tierInfo = PRODUCT_SERIES.trtc[trtcRule.tier]
  return {
    tier: tierInfo.name,
    tierNote: tierInfo.note,
    reason: trtcRule.reason,
  }
}
