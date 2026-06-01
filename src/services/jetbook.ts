// Pas de clé API dans le JS — ajoutée par le proxy :
// - dev  → Vite proxy (vite.config.ts, lu depuis .env local)
// - prod → nginx proxy (nginx.conf.template, lu depuis env var runtime Dokploy)
const API_ORIGIN = window.location.origin

export interface JetBookPricing {
  duration_type: string
  duration_label: string
  duration_minutes: number
  price: string
  period_start: string | null
  period_end: string | null
}

export interface JetBookLocation {
  id: number
  name: string
  city: string
  postal_code: string
  address: string
  phone: string
  email: string
  latitude: string
  longitude: string
}

export interface JetBookBoat {
  id: number
  type: string
  name: string
  display_name: string
  brand: string
  model: string
  year: number | null
  horsepower: number | null
  capacity: number
  fleet_number: string | null
  is_active: boolean
  status: string
  license_required: boolean
  deposit_enabled: boolean
  deposit_amount: string | null
  image_url: string | null
  images: string[]
  features: string[]
  description: string
  location: JetBookLocation
  pricing: JetBookPricing[]
}

export interface JetBookResponse<T> {
  success: boolean
  count: number
  filters: Record<string, unknown>
  data: T[]
  error?: string
}

async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<JetBookResponse<T>> {
  const url = new URL(`${API_ORIGIN}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Erreur API : ${res.status}`)
  return res.json()
}

export function fetchBoats(params?: Record<string, string>) {
  return apiFetch<JetBookBoat>('/api/vitrine/jetskis/', { status: 'active', ...params })
}
