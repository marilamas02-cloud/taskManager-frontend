export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function isOverdue(dateStr) {
  if (!dateStr) return false
  const due = new Date(dateStr)
  due.setHours(23, 59, 59, 999)
  return due < new Date()
}

export function toInputDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toISOString().split('T')[0]
}
