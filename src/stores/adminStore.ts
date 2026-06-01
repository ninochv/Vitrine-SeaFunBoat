import { defineStore } from 'pinia'
import { ref } from 'vue'
import { salesSeed } from '@/data/sales'
import type { SaleBoat } from '@/data/types'

const PASS        = 'sfb2025'
const SESSION_KEY = 'SFB_ADMIN_SESSION'
const DATA_KEY    = 'SFB_ADMIN_SALES'

export const useAdminStore = defineStore('admin', () => {
  const authenticated = ref(false)

  function checkSession() {
    authenticated.value = localStorage.getItem(SESSION_KEY) === '1'
  }

  function login(password: string): boolean {
    if (password === PASS) {
      localStorage.setItem(SESSION_KEY, '1')
      authenticated.value = true
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    authenticated.value = false
  }

  function loadBoats(): SaleBoat[] {
    const raw = localStorage.getItem(DATA_KEY)
    if (raw) {
      try { return JSON.parse(raw) as SaleBoat[] } catch { /* fall through */ }
    }
    return salesSeed.map((s) => ({
      ...s,
      engine:    s.engine    ?? '',
      equipment: s.equipment ?? [],
      photos:    s.photos    ?? (s.photo ? [s.photo] : []),
    }))
  }

  function persist(boats: SaleBoat[]) {
    localStorage.setItem(DATA_KEY, JSON.stringify(boats))
  }

  function exportDataJs(boats: SaleBoat[]): string {
    return `// Sea Fun Boat — Catalogue data\n// Exporté le ${new Date().toLocaleDateString('fr-FR')} depuis admin\nwindow.SFB_SALES = ${JSON.stringify(boats, null, 2)};\n`
  }

  return { authenticated, checkSession, login, logout, loadBoats, persist, exportDataJs }
})
