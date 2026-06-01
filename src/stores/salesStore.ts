import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { dataApi } from '@/services/dataApi'
import type { SaleBoat, HullType, Condition } from '@/data/types'

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'year-desc' | 'length'

interface Filters {
  condition: 'all' | Condition
  hull:      'all' | HullType
  brand:     string
  maxPrice:  number
  minLength: number
  minPower:  number
  minYear:   number
}

export const useSalesStore = defineStore('sales', () => {
  const boats   = ref<SaleBoat[]>([])
  const loading = ref(false)
  const sortBy  = ref<SortKey>('default')
  const filters = reactive<Filters>({
    condition: 'all',
    hull:      'all',
    brand:     'all',
    maxPrice:  250000,
    minLength: 4,
    minPower:  0,
    minYear:   2010,
  })

  async function loadFromStorage() {
    loading.value = true
    boats.value   = await dataApi.getSales()
    loading.value = false
  }

  const brands = computed(() =>
    Array.from(new Set(boats.value.map((b) => b.builder))).sort()
  )

  const stats = computed(() => ({
    total:    boats.value.length,
    neuf:     boats.value.filter((b) => b.condition === 'neuf').length,
    occasion: boats.value.filter((b) => b.condition === 'occasion').length,
  }))

  const filteredBoats = computed(() => {
    let result = boats.value.slice()
    if (filters.condition !== 'all') result = result.filter((b) => b.condition === filters.condition)
    if (filters.hull      !== 'all') result = result.filter((b) => b.hull === filters.hull)
    if (filters.brand     !== 'all') result = result.filter((b) => b.builder === filters.brand)
    result = result.filter(
      (b) => b.price  <= filters.maxPrice
          && b.length >= filters.minLength
          && b.power  >= filters.minPower
          && b.year   >= filters.minYear
    )
    if (sortBy.value === 'price-asc')  result.sort((a, b) => a.price  - b.price)
    if (sortBy.value === 'price-desc') result.sort((a, b) => b.price  - a.price)
    if (sortBy.value === 'year-desc')  result.sort((a, b) => b.year   - a.year)
    if (sortBy.value === 'length')     result.sort((a, b) => b.length - a.length)
    return result
  })

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    filters[key] = value
  }

  function setSortBy(value: SortKey) { sortBy.value = value }

  function resetFilters() {
    filters.condition = 'all'
    filters.hull      = 'all'
    filters.brand     = 'all'
    filters.maxPrice  = 250000
    filters.minLength = 4
    filters.minPower  = 0
    filters.minYear   = 2010
  }

  function _persist() { void dataApi.saveSales(boats.value) }

  function addBoat(boat: SaleBoat) {
    boats.value = [...boats.value, boat]
    _persist()
  }

  function updateBoat(id: string, patch: SaleBoat) {
    const idx = boats.value.findIndex((b) => b.id === id)
    if (idx !== -1) {
      const next = [...boats.value]
      next[idx] = patch
      boats.value = next
      _persist()
    }
  }

  function deleteBoat(id: string) {
    boats.value = boats.value.filter((b) => b.id !== id)
    _persist()
  }

  return {
    boats, loading, sortBy, filters,
    brands, stats, filteredBoats,
    loadFromStorage, setFilter, setSortBy, resetFilters,
    addBoat, updateBoat, deleteBoat,
  }
})
