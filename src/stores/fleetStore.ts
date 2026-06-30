import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchBoats, type JetBookBoat, type JetBookLocation } from '@/services/jetbook'

export interface GroupedBoat {
  name: string
  units: number
  representative: JetBookBoat
  allImages: string[]
}

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'power' | 'capacity'
type LicenseFilter = 'all' | 'avec' | 'sans'

function minPrice(boat: JetBookBoat): number {
  if (!boat.pricing.length) return 0
  return Math.min(...boat.pricing.map((p) => parseFloat(p.price)))
}

// Puissance totale = puissance unitaire × nombre de moteurs (bi-moteur compris)
function totalPower(boat: JetBookBoat): number {
  return (boat.horsepower ?? 0) * (boat.engine_count ?? 1)
}

// ──────────────────────────────────────────────────────────────────
// ORDRE PAR DÉFAUT DE LA FLOTTE (tri « Suggéré »)
// Ordre déterministe et stable : capacité décroissante, puis puissance
// décroissante, puis nom A→Z. Il ne dépend donc plus de l'ordre d'arrivée
// des données. Pour imposer un ordre précis, modifier ce comparateur
// (ou trier sur un futur champ de priorité fourni par le client).
// ──────────────────────────────────────────────────────────────────
function defaultOrder(a: JetBookBoat, b: JetBookBoat): number {
  return (
    b.capacity - a.capacity ||
    (b.horsepower ?? 0) - (a.horsepower ?? 0) ||
    a.name.localeCompare(b.name)
  )
}

export const useFleetStore = defineStore('fleet', () => {
  const boats = ref<JetBookBoat[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filterLicense = ref<LicenseFilter>('all')
  const filterLocationId = ref<number | 'all'>('all')
  const sortBy = ref<SortKey>('default')

  async function loadFleet() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchBoats()
      if (!res.success) throw new Error(res.error ?? 'Erreur inconnue')
      boats.value = res.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
      loading.value = false
    }
  }

  const uniqueLocations = computed<JetBookLocation[]>(() => {
    const seen = new Map<number, JetBookLocation>()
    for (const b of boats.value) {
      if (b.location && !seen.has(b.location.id)) seen.set(b.location.id, b.location)
    }
    return [...seen.values()]
  })

  const filteredBoats = computed(() => {
    let result = boats.value.slice()
    if (filterLocationId.value !== 'all') {
      result = result.filter((b) => b.location?.id === filterLocationId.value)
    }
    if (filterLicense.value === 'avec') result = result.filter((b) => b.license_required)
    if (filterLicense.value === 'sans') result = result.filter((b) => !b.license_required)
    if (sortBy.value === 'price-asc')  result.sort((a, b) => minPrice(a) - minPrice(b))
    if (sortBy.value === 'price-desc') result.sort((a, b) => minPrice(b) - minPrice(a))
    if (sortBy.value === 'power')      result.sort((a, b) => totalPower(b) - totalPower(a))
    if (sortBy.value === 'capacity')   result.sort((a, b) => b.capacity - a.capacity)
    if (sortBy.value === 'default')    result.sort(defaultOrder)
    return result
  })

  // Une card par modèle (groupé par boat.name)
  const groupedBoats = computed<GroupedBoat[]>(() => {
    const groups = new Map<string, JetBookBoat[]>()
    for (const b of filteredBoats.value) {
      if (!groups.has(b.name)) groups.set(b.name, [])
      groups.get(b.name)!.push(b)
    }
    return [...groups.values()].map((units) => {
      const rep = units[0]
      const imgs = [...new Set(
        units.flatMap((u) => (u.images?.length ? u.images : u.image_url ? [u.image_url] : []))
      )]
      return { name: rep.name, units: units.length, representative: rep, allImages: imgs }
    })
  })

  function setLocationFilter(value: number | 'all') { filterLocationId.value = value }
  function setLicenseFilter(value: LicenseFilter)   { filterLicense.value = value }
  function setSortBy(value: SortKey)                 { sortBy.value = value }

  return {
    boats, loading, error,
    filterLicense, filterLocationId, sortBy,
    filteredBoats, groupedBoats, uniqueLocations,
    loadFleet, setLocationFilter, setLicenseFilter, setSortBy,
  }
})
