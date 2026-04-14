/**
 * API base: empty in dev uses Vite proxy `/api` → backend.
 * In production set `VITE_API_URL=https://api.yoursite.com` if API is on another host.
 */
export function getApiBase() {
  const base = import.meta.env.VITE_API_URL
  if (base === undefined || base === '') return ''
  return String(base).replace(/\/$/, '')
}

export async function postContact(payload) {
  const base = getApiBase()
  const res = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error || res.statusText || 'Request failed'
    throw new Error(msg)
  }
  return data
}
