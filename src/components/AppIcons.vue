<template>
  <!-- 统一的 SVG 图标组件，通过 name prop 切换图标 -->
  <svg v-if="name === 'logo'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" :fill="color"/>
    <path d="M6 12a4 4 0 0 1 3-3.8l.6 1A3 3 0 0 0 8 12c0 1.2.7 2.3 1.8 2.8L9 16a5 5 0 0 1-3-4z" fill="white"/>
    <circle cx="12" cy="12" r="1.8" fill="white"/>
    <path d="M15 9.2l-.6-1A4 4 0 0 1 16 12c0 1.2-.5 2.3-1.4 3.1l-.6-.8c.6-.5 1-1.3 1-2.3 0-.9-.4-1.7-1-2.2z" fill="white"/>
  </svg>

  <svg v-else-if="name === 'cloud'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 19A4.5 4.5 0 0 1 6 10.1 7 7 0 0 1 18 9a4.5 4.5 0 0 1 1 8.9" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'server'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="8" rx="2" :stroke="color" stroke-width="1.5"/>
    <rect x="2" y="14" width="20" height="8" rx="2" :stroke="color" stroke-width="1.5"/>
    <circle cx="6" cy="6" r="1" :fill="color"/>
    <circle cx="6" cy="18" r="1" :fill="color"/>
  </svg>

  <svg v-else-if="name === 'harddrive'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" :stroke="color" stroke-width="1.5"/>
    <circle cx="7" cy="12" r="1.5" :fill="color"/>
    <path d="M10 12h7" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'database'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" :stroke="color" stroke-width="1.5"/>
    <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" :stroke="color" stroke-width="1.5"/>
    <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" :stroke="color" stroke-width="1.5"/>
  </svg>

  <svg v-else-if="name === 'shield'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7v5c0 5.5 4 9.5 9 10 5-.5 9-4.5 9-10V7l-9-5z" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 12l2 2 4-4" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'video'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="14" height="14" rx="2" :stroke="color" stroke-width="1.5"/>
    <path d="M16 10l5-3v10l-5-3" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'package'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'dollar'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v20m5-15.5A4 4 0 0 0 8.3 5M7 15.5A4 4 0 0 0 15.7 16" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'clipboard'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="16" height="19" rx="2" :stroke="color" stroke-width="1.5"/>
    <path d="M8 3v-.5A1.5 1.5 0 0 1 9.5 1h5A1.5 1.5 0 0 1 16 2.5V3" :stroke="color" stroke-width="1.5"/>
    <path d="M8 11h8M8 15h5" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'brain'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3a3 3 0 0 0-3 3v3a5 5 0 0 0-1 3.5V15a3 3 0 0 0 6 0v-3m4-9a3 3 0 0 1 3 3v3a5 5 0 0 1 1 3.5V15a3 3 0 0 1-6 0v-3" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9 9a3 3 0 1 1 6 0" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 9v3" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'steps'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h3l2-4h8l2 4h3v2H3V6zM5 8v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="8" y="11" width="3" height="3" rx=".5" :stroke="color" stroke-width="1.5"/>
    <rect x="13" y="11" width="3" height="3" rx=".5" :stroke="color" stroke-width="1.5"/>
  </svg>

  <svg v-else-if="name === 'copy'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="12" height="16" rx="2" :stroke="color" stroke-width="1.5"/>
    <path d="M4 6v14a2 2 0 0 0 2 2h10" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'edit'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M18.5 2.5a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'arrow-right'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M12 5l7 7-7 7" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'arrow-left'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M12 19l-7-7 7-7" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'check'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17l-5-5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'home'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12l9-9 9 9" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 10v10a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V10" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'refresh'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4v6h6M23 20v-6h-6" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.5 9A9 9 0 0 0 5.6 5.6L1 10m22 4l-4.6 4.4A9 9 0 0 1 3.5 15" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'zap'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" :stroke="color" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>

  <svg v-else-if="name === 'plus'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'info'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" :stroke="color" stroke-width="1.5"/>
    <path d="M12 16v-4M12 8h.01" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <svg v-else-if="name === 'chevrondown'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 22 },
  color: { type: String, default: 'currentColor' },
})
</script>
