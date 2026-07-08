import {
  CVM_PRICES, CBS_UNIT_PRICES, BANDWIDTH_UNIT_PRICE,
  MYSQL_PRICES, SECURITY_PRICES, TRTC_PRICES, EXTRA_PRICES,
} from '../data/pricing.js'

const MARKUP_RATE = 0.12   // 报价上浮 12%

/**
 * 根据推荐结果计算报价方案
 * @param {Object} recommendation - matchRecommendation 的输出结果
 * @returns {{ items: Array, total: number, totalWithMarkup: number }}
 */
export function calculatePricing(recommendation) {
  const items = []

  // 1. CVM
  const cvmItem = calcCVM(recommendation.cvm)
  if (cvmItem) items.push(cvmItem)

  // 2. CBS
  const cbsItem = calcCBS(recommendation.cbs)
  if (cbsItem) items.push(cbsItem)

  // 3. 带宽
  const bwItem = calcBandwidth(recommendation.cvm)
  if (bwItem) items.push(bwItem)

  // 4. MySQL
  const mysqlItem = calcMySQL(recommendation.mysql)
  if (mysqlItem) items.push(mysqlItem)

  // 5. 安全产品
  if (recommendation.security?.items?.length) {
    for (const sec of recommendation.security.items) {
      const price = SECURITY_PRICES[sec.name]
      if (price) items.push({ product: sec.name, spec: sec.note || '', official: price.monthly })
    }
  }

  // 6. TRTC
  if (recommendation.trtc) {
    const price = TRTC_PRICES[recommendation.trtc.tier]
    if (price) items.push({ product: recommendation.trtc.tier, spec: recommendation.trtc.tierNote || '', official: price.monthly })
  }

  // 7. 额外产品
  if (recommendation.extra?.items?.length) {
    for (const ext of recommendation.extra.items) {
      const price = EXTRA_PRICES[ext.name]
      if (price) items.push({ product: ext.name, spec: price.note || ext.note || '', official: price.monthly })
    }
  }

  const total = items.reduce((sum, i) => sum + i.official, 0)
  const totalWithMarkup = Math.round(total * (1 + MARKUP_RATE))

  return {
    items: items.map(i => ({
      ...i,
      offer: Math.round(i.official * (1 + MARKUP_RATE)),
    })),
    total,
    totalWithMarkup,
    markupRate: MARKUP_RATE,
  }
}

function parseGB(str) {
  if (!str) return 0
  const m = str.match(/(\d+)\s*GB/i)
  return m ? parseInt(m[1]) : 0
}

function parseCount(str) {
  if (!str) return 1
  const m = str.match(/(\d+)/)
  return m ? parseInt(m[1]) : 1
}

function calcCVM(cvm) {
  if (!cvm) return null
  // 尝试匹配规格
  const key = `${cvm.cpu}_${cvm.memory}`
  let official = CVM_PRICES[key]

  if (!official) {
    // 尝试用具体值匹配（如 "4核" "8GB"）
    const altKey = `${cvm.cpu}_${cvm.memory}`
    official = CVM_PRICES[altKey]
  }

  if (!official && cvm.series === '轻量应用服务器') {
    official = CVM_PRICES['lightweight_2c2g']
  }
  if (!official && cvm.series?.includes('GPU')) {
    official = CVM_PRICES['GN10Xp']
  }

  const unitPrice = official ? official.monthly : 500
  const count = parseCount(cvm.count)

  return {
    product: `云服务器 ${cvm.series}`,
    spec: `${cvm.cpu} / ${cvm.memory} × ${cvm.count}`,
    official: unitPrice * count,
  }
}

function calcCBS(cbs) {
  if (!cbs) return null
  const unitPrice = CBS_UNIT_PRICES[cbs.type] || 0.5
  const gb = parseGB(cbs.size)
  return {
    product: '云硬盘 CBS',
    spec: `${cbs.type} ${cbs.size}`,
    official: Math.round(unitPrice * gb),
  }
}

function calcBandwidth(cvm) {
  if (!cvm?.bandwidth) return null
  const mbps = parseInt(cvm.bandwidth) || 5
  return {
    product: '公网带宽',
    spec: `${cvm.bandwidth} BGP`,
    official: BANDWIDTH_UNIT_PRICE * mbps,
  }
}

function calcMySQL(mysql) {
  if (!mysql) return null
  const key = `${mysql.cpu}_${mysql.memory}_${mysql.storage}_${mysql.arch}`
  let official = MYSQL_PRICES[key]
  if (!official) official = { monthly: 1500 }
  return {
    product: '云数据库 MySQL',
    spec: `${mysql.arch} ${mysql.cpu}/${mysql.memory} ${mysql.storage}`,
    official: official.monthly,
  }
}
