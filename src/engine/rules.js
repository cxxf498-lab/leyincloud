/**
 * 推荐规则引擎 - 规则定义
 * 优先级自上而下递减，匹配到即停止
 */

// 产品系列定义（用于推荐时输出产品名称和规格）
export const PRODUCT_SERIES = {
  cvm: {
    lightweight: { name: '轻量应用服务器', note: '适合个人博客、测试环境' },
    bf1: { name: '蜂驰型 BF1', note: '预算敏感型，通用均衡' },
    s_series: { name: '标准型 S系列', note: '均衡型，适合大多数业务' },
    c_series: { name: '计算型 C系列', note: 'CPU密集型，适合高并发计算' },
    m_series: { name: '内存型 M系列', note: '大内存，适合数据库/缓存' },
    flagship: { name: '旗舰型', note: '高性能，适合金融/政务等高要求场景' },
    gn_series: { name: 'GPU异构型 GN系列', note: 'GPU计算，适合AI训练/渲染' },
  },
  cbs: {
    high_performance: { name: '高性能云硬盘', note: '普通IO需求' },
    ssd: { name: 'SSD云硬盘', note: '较高IOPS，适合数据库' },
    enhanced_ssd: { name: '增强型SSD', note: '高IOPS，适合计算密集' },
    extreme_ssd: { name: '极速型SSD', note: '极高IOPS，适合大型数据库/高频交易' },
  },
  mysql: {
    single: { name: '单节点', note: '测试/开发环境' },
    dual: { name: '双节点（主备）', note: '生产环境高可用' },
    triple: { name: '三节点（一主两备）', note: '金融级高可用' },
    cluster: { name: '集群版', note: '读写分离，高并发' },
    cloud_disk: { name: '云盘版', note: '最高可用性，自动故障转移' },
  },
  security: {
    ddos_basic: { name: 'DDoS基础防护', note: '免费，2Gbps基础防护' },
    ddos_standard: { name: 'DDoS高防包（普惠版）', note: '适用于普通电商/企业' },
    ddos_enterprise: { name: 'DDoS高防包（企业版）', note: '适用于游戏/金融等高风险行业' },
    waf_basic: { name: 'Web应用防火墙 WAF（基础版）', note: '基础Web安全防护' },
    waf_enterprise: { name: 'Web应用防火墙 WAF（企业版）', note: '高级规则+bot管理' },
    cfw: { name: '云防火墙', note: 'VPC间网络隔离管控' },
  },
  trtc: {
    basic: { name: 'TRTC基础版', note: '支持1v1通话/小规模会议' },
    standard: { name: 'TRTC标准版', note: '支持多人会议/互动直播' },
    enterprise: { name: 'TRTC企业版', note: '支持大规模并发/全球覆盖' },
  },
  extra: {
    cdn: { name: '内容分发网络 CDN', note: '加速静态资源分发' },
    cos: { name: '对象存储 COS', note: '海量文件存储' },
    clb: { name: '负载均衡 CLB', note: '多台CVM流量分发' },
  }
}

/**
 * 核心推荐规则（按优先级排列）
 * 每条规则包含：条件判断函数 + 推荐结果
 * cvm: { series, cpu, memory, count, reason }
 * cbs: { type, size, reason }
 * mysql: { arch, cpu, memory, storage, reason }
 */
export const RECOMMENDATION_RULES = [
  // === 1. 金融/政务（最高优先级） ===
  {
    id: 'finance_gov',
    name: '金融/政务场景',
    priority: 100,
    condition: (data) => {
      return data.businessType === '金融' ||
        data.compliance?.includes('等保') ||
        data.compliance?.includes('GDPR')
    },
    recommend: () => ({
      cvm: {
        series: 'flagship',
        cpu: '8核',
        memory: '32GB',
        count: '2台',
        reason: '金融/政务要求高安全、高可靠，旗舰型提供最佳性能和稳定性'
      },
      cbs: { type: 'extreme_ssd', size: '500GB', reason: '金融级业务需要极高IOPS，极速型SSD提供最低延迟' },
      mysql: {
        arch: 'triple',
        cpu: '8核',
        memory: '32GB',
        storage: '500GB',
        reason: '核心数据不能丢，三节点架构提供金融级高可用'
      },
      security: ['ddos_enterprise', 'waf_enterprise', 'cfw'],
      securityReason: '金融/政务是攻击重灾区，需要全套安全防护满足等保合规',
      billing: '包年包月（长期稳定运行）',
      note: '建议采用跨可用区部署，进一步提升容灾能力。'
    })
  },

  // === 2. AI训练/渲染 ===
  {
    id: 'ai_render',
    name: 'AI训练/渲染',
    priority: 90,
    condition: (data) => {
      return data.businessType === '大数据/AI训练' ||
        data.cpuRequirement === '需要GPU（AI训练/渲染）'
    },
    recommend: () => ({
      cvm: {
        series: 'gn_series',
        cpu: 'GN10Xp',
        memory: 'V100 / T4 / A100 GPU',
        count: '1台',
        reason: 'GPU异构计算是AI训练和渲染的唯一选择'
      },
      cbs: { type: 'extreme_ssd', size: '1TB', reason: '训练数据读写量大，需要极高吞吐' },
      mysql: {
        arch: 'dual',
        cpu: '4核',
        memory: '16GB',
        storage: '200GB',
        reason: '训练任务管理数据库，双节点即可'
      },
      security: ['ddos_standard', 'waf_basic'],
      securityReason: '基础安全防护即可',
      billing: '包年包月（训练任务长期占用）',
      note: '如需大规模分布式训练，可搭配TKE容器服务管理GPU集群。'
    })
  },

  // === 3. 游戏/直播/社交（音视频+高并发） ===
  {
    id: 'game_live_social',
    name: '游戏/直播/社交',
    priority: 80,
    condition: (data) => {
      const types = ['游戏', '直播/音视频', '社交/社区App']
      return types.includes(data.businessType)
    },
    recommend: (data) => ({
      cvm: {
        series: 'c_series',
        cpu: '8核',
        memory: '16GB',
        count: '2台',
        reason: '高并发场景需要计算型实例，CPU性能优先'
      },
      cbs: { type: 'ssd', size: '500GB', reason: 'SSD云盘保证数据库和应用IO性能' },
      mysql: {
        arch: 'cluster',
        cpu: '8核',
        memory: '32GB',
        storage: '500GB',
        reason: '高并发数据库需要集群版支持读写分离'
      },
      security: ['ddos_enterprise', 'waf_enterprise'],
      securityReason: '游戏/直播行业是DDoS攻击重灾区，企业级防护必不可少',
      trtc: { tier: 'enterprise', reason: '大规模并发音视频，需要企业版TRTC全球节点覆盖' },
      extra: ['cdn', 'clb'],
      extraReason: 'CDN加速内容分发，CLB实现多台CVM负载均衡',
      billing: '包年包月 + 弹性按量（应对突发流量）',
      note: '建议搭配弹性伸缩AS，大促/活动期间自动扩容。'
    })
  },

  // === 4. 电商平台 ===
  {
    id: 'ecommerce',
    name: '电商平台',
    priority: 70,
    condition: (data) => {
      return data.businessType === '电商平台'
    },
    recommend: (data) => {
      const dau = parseInt(data.dau) || 0
      const isLarge = dau > 10000 || (data.budget && data.budget.includes('10-50万') || data.budget && data.budget.includes('50万以上'))
      return {
        cvm: {
          series: 's_series',
          cpu: isLarge ? '8核' : '4核',
          memory: isLarge ? '16GB' : '8GB',
          count: isLarge ? '4台' : '2台',
          reason: '电商业务均衡型实例最合适，性价比最高'
        },
        cbs: { type: isLarge ? 'enhanced_ssd' : 'ssd', size: '500GB', reason: '商品图片、订单数据需要高可靠性存储' },
        mysql: {
          arch: isLarge ? 'cluster' : 'dual',
          cpu: isLarge ? '8核' : '4核',
          memory: isLarge ? '32GB' : '16GB',
          storage: isLarge ? '500GB' : '200GB',
          reason: '订单/用户数据必须高可用，双节点起步'
        },
        security: ['ddos_standard', 'waf_enterprise'],
        securityReason: '电商涉及支付和用户数据，WAF企业版+高防是必选项',
        extra: ['cdn', 'clb', 'cos'],
        extraReason: 'CDN加速商品图片，COS存静态资源，CLB分发流量',
        billing: '包年包月（基础）+ 按量计费（大促弹性）',
        note: '大促前提前升配，结束后降配，利用CVM升降配特性节省成本。'
      }
    }
  },

  // === 5. 高并发/计算密集型 ===
  {
    id: 'high_compute',
    name: '高并发/计算密集型',
    priority: 60,
    condition: (data) => {
      return data.cpuRequirement === '需要高主频计算（视频转码/科学计算）' ||
        data.cpuRequirement === '需要GPU（AI训练/渲染）' ||
        (parseInt(data.dau) > 50000)
    },
    recommend: () => ({
      cvm: {
        series: 'c_series',
        cpu: '16核',
        memory: '32GB',
        count: '2台',
        reason: '计算密集型必须选择计算型C系列，CPU主频更高'
      },
      cbs: { type: 'enhanced_ssd', size: '500GB', reason: '高IO场景需要增强型SSD保证吞吐' },
      mysql: {
        arch: 'cluster',
        cpu: '8核',
        memory: '32GB',
        storage: '500GB',
        reason: '高并发数据库需要集群版'
      },
      security: ['ddos_standard', 'waf_basic'],
      securityReason: '基础安全防护',
      billing: '包年包月',
      note: ''
    })
  },

  // === 6. 数据库/缓存为主 ===
  {
    id: 'database_heavy',
    name: '数据库/缓存为主',
    priority: 50,
    condition: (data) => {
      return data.cpuRequirement === '需要大量内存（数据库/缓存）'
    },
    recommend: () => ({
      cvm: {
        series: 'm_series',
        cpu: '8核',
        memory: '64GB',
        count: '1台',
        reason: '大内存场景，内存型M系列性价比最高'
      },
      cbs: { type: 'extreme_ssd', size: '1TB', reason: '数据库需要极低延迟的存储' },
      mysql: {
        arch: 'triple',
        cpu: '16核',
        memory: '128GB',
        storage: '1TB',
        reason: '数据库为核心业务，必须三节点最高可用'
      },
      security: ['ddos_standard', 'waf_basic'],
      securityReason: '基础安全防护，数据库建议放在私有网络VPC内',
      billing: '包年包月',
      note: '建议搭配Redis缓存，减轻数据库压力。'
    })
  },

  // === 7. 中小企业官网/OA系统 ===
  {
    id: 'smb_website_oa',
    name: '中小企业官网/OA',
    priority: 40,
    condition: (data) => {
      const types = ['企业官网/展示型网站', '企业OA/ERP']
      return types.includes(data.businessType)
    },
    recommend: (data) => {
      const lowBudget = data.budget && data.budget.includes('5,000元以下')
      return {
        cvm: {
          series: lowBudget ? 'bf1' : 's_series',
          cpu: lowBudget ? '2核' : '4核',
          memory: lowBudget ? '4GB' : '8GB',
          count: '1台',
          reason: lowBudget ? '预算有限，蜂驰型BF1性价比最高' : '标准型S系列均衡够用，适合企业官网/OA'
        },
        cbs: { type: 'high_performance', size: '100GB', reason: '官网/OA对IO要求不高，高性能云盘足够' },
        mysql: {
          arch: 'dual',
          cpu: '2核',
          memory: '4GB',
          storage: '50GB',
          reason: 'OA数据需要高可用，双节点即可满足'
        },
        security: ['waf_basic'],
        securityReason: '有Web业务就需要基础WAF防护',
        extra: data.businessType === '企业官网/展示型网站' ? ['cdn'] : [],
        extraReason: 'CDN加速网站访问',
        billing: '包年包月',
        note: ''
      }
    }
  },

  // === 8. 在线教育 ===
  {
    id: 'online_edu',
    name: '在线教育',
    priority: 35,
    condition: (data) => {
      return data.businessType === '在线教育'
    },
    recommend: (data) => {
      const dau = parseInt(data.dau) || 0
      const isLarge = dau > 5000
      return {
        cvm: {
          series: isLarge ? 'c_series' : 's_series',
          cpu: isLarge ? '8核' : '4核',
          memory: isLarge ? '16GB' : '8GB',
          count: isLarge ? '2台' : '1台',
          reason: '在线教育需要稳定的计算和网络性能'
        },
        cbs: { type: 'ssd', size: '200GB', reason: '课程视频和课件需要较好的IO性能' },
        mysql: {
          arch: 'dual',
          cpu: '4核',
          memory: '16GB',
          storage: '200GB',
          reason: '学员数据和课程数据需要高可用'
        },
        security: ['ddos_standard', 'waf_enterprise'],
        securityReason: '教育平台涉及用户数据，需要WAF企业级防护',
        trtc: data.needsTrtc ? { tier: 'standard', reason: '在线课堂需要实时音视频互动' } : null,
        extra: ['cdn', 'cos'],
        extraReason: 'CDN加速课程视频分发，COS存储课件资源',
        billing: '包年包月',
        note: ''
      }
    }
  },

  // === 9. 个人博客/测试环境（最低优先级） ===
  {
    id: 'personal_blog_test',
    name: '个人博客/测试环境',
    priority: 10,
    condition: (data) => {
      const lowBudget = data.budget && data.budget.includes('5,000元以下')
      return lowBudget ||
        (data.businessType && data.businessType.includes('其他') && parseInt(data.dau) < 1000)
    },
    recommend: () => ({
      cvm: {
        series: 'lightweight',
        cpu: '2核',
        memory: '2GB',
        count: '1台',
        reason: '轻量应用服务器开箱即用，适合个人站点和测试环境，性价比最高'
      },
      cbs: { type: 'high_performance', size: '50GB', reason: '基本够用' },
      mysql: null,
      mysqlReason: '轻量应用服务器自带数据库或使用SQLite即可',
      security: [],
      securityReason: '个人站点无需额外安全产品',
      billing: '包年包月（轻量服务器年付更优惠）',
      note: '也可以选择CVM蜂驰型BF1 2核4G，比轻量更灵活，价格相近。'
    })
  },
]

/**
 * 预算等级映射
 */
export const BUDGET_LEVELS = {
  '5,000元以下': { level: 1, name: '低预算' },
  '5,000-2万': { level: 2, name: '中等预算' },
  '2-10万': { level: 3, name: '较高预算' },
  '10-50万': { level: 4, name: '高预算' },
  '50万以上': { level: 5, name: '超高预算' },
}

/**
 * 根据存储读写需求推荐CBS类型
 */
export function recommendCBSBySpeed(speedRequirement) {
  switch (speedRequirement) {
    case '普通就行（网站/文件存储）': return 'high_performance'
    case '要求较高（数据库/交易系统）': return 'ssd'
    case '要求极高（大型数据库/高频交易）': return 'extreme_ssd'
    default: return 'high_performance'
  }
}

/**
 * 根据数据库可用性需求推荐MySQL架构
 */
export function recommendMySQLArch(availability) {
  switch (availability) {
    case '一般（挂了半小时能接受）': return 'single'
    case '较高（不能超过几分钟）': return 'dual'
    case '极高（几乎不能挂）': return 'triple'
    default: return 'dual'
  }
}
