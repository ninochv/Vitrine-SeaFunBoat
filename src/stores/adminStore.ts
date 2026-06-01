import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SaleBoat } from '@/data/types'

const PASS        = 'sfb2025'
const SESSION_KEY = 'SFB_ADMIN_SESSION'

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

  function exportDataJs(boats: SaleBoat[]): string {
    return `// Sea Fun Boat — Catalogue data\n// Exporté le ${new Date().toLocaleDateString('fr-FR')} depuis admin\nwindow.SFB_SALES = ${JSON.stringify(boats, null, 2)};\n`
  }

  return { authenticated, checkSession, login, logout, exportDataJs }
})
