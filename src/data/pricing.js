/**
 * 腾讯云产品价格参考数据库（月付原价，单位：元）
 * 基于公开定价信息整理，实际价格以官网为准
 */

// CVM 云服务器月付参考价（按规格）
export const CVM_PRICES = {
  '2核2G':   { monthly: 85 },
  '2核4G':   { monthly: 150 },
  '4核8G':   { monthly: 380 },
  '8核16G':  { monthly: 820 },
  '8核32G':  { monthly: 1350 },
  '16核32G': { monthly: 1780 },
  '8核64G':  { monthly: 2300 },
  '16核128G':{ monthly: 5200 },
  // GPU 异构型
  'GN10Xp':  { monthly: 5800 },
  // 轻量应用服务器
  'lightweight_2c2g': { monthly: 65 },
}

// CBS 云硬盘单价（元/GB/月）
export const CBS_UNIT_PRICES = {
  '高性能云硬盘': 0.35,
  'SSD云硬盘':    1.0,
  '增强型SSD':    1.5,
  '极速型SSD':    2.0,
}

// 带宽单价（元/Mbps/月）
export const BANDWIDTH_UNIT_PRICE = 23

// MySQL 云数据库月付参考价（含存储）
export const MYSQL_PRICES = {
  '2核4G_50GB_双节点':     { monthly: 420 },
  '4核16G_200GB_双节点':   { monthly: 1280 },
  '4核16G_200GB_集群版':   { monthly: 2100 },
  '8核32G_500GB_双节点':   { monthly: 2800 },
  '8核32G_500GB_集群版':   { monthly: 4500 },
  '8核32G_500GB_三节点':   { monthly: 5200 },
  '16核128G_1TB_三节点':   { monthly: 9600 },
}

// 安全产品月付参考价
export const SECURITY_PRICES = {
  'DDoS基础防护':                  { monthly: 0 },
  'DDoS高防包（普惠版）':           { monthly: 6800 },
  'DDoS高防包（企业版）':           { monthly: 26800 },
  'Web应用防火墙 WAF（基础版）':     { monthly: 1800 },
  'Web应用防火墙 WAF（企业版）':     { monthly: 6800 },
  '云防火墙':                       { monthly: 4200 },
}

// TRTC 月付参考价（基础包）
export const TRTC_PRICES = {
  'TRTC基础版':  { monthly: 1500 },
  'TRTC标准版':  { monthly: 4500 },
  'TRTC企业版':  { monthly: 12000 },
}

// 额外产品月付参考价
export const EXTRA_PRICES = {
  '内容分发网络 CDN':   { monthly: 200,   note: '按流量计费，此为月估' },
  '对象存储 COS':       { monthly: 100,   note: '按存储量+流量计费，此为月估' },
  '负载均衡 CLB':       { monthly: 60,    note: '按实例+流量计费' },
}
