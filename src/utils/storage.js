const HISTORY_KEY = 'survey_history'

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch { return [] }
}

export function saveToHistory(entry) {
  const list = loadHistory()
  list.unshift(entry)
  // 最多保留 50 条
  if (list.length > 50) list.length = 50
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}

export function deleteHistory(id) {
  const list = loadHistory().filter(e => e.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
  return list
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export function formatId() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}
