<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <!-- Top stripe -->
    <div class="hidden md:block" style="background:var(--ink); color:var(--cream);">
      <div class="container-x flex items-center justify-between" style="height:34px; font-size:12px;">
        <div class="flex items-center gap-5" style="font-family:var(--font-mono); letter-spacing:0.04em;">
          <span>Port de San Peire · Les Issambres · Sainte-Maxime</span>
        </div>
        <div class="flex items-center gap-5" style="font-family:var(--font-mono); letter-spacing:0.04em;">
          <span>Lun – Sam · 9h00 → 18h30</span>
          <a href="tel:0494494466" class="flex items-center gap-1.5 hover:text-[var(--teal-light)]">
            <span class="w-3 h-3 inline-block" v-html="icons.phone"></span>
            04 94 49 44 66
          </a>
        </div>
      </div>
    </div>

    <div class="container-x">
      <div class="flex items-center justify-between" style="height:78px;">
        <RouterLink :to="{ name: 'home' }" class="flex items-baseline gap-3 group">
          <div style="font-family:var(--font-serif); font-size:26px; line-height:1; color:var(--ink); letter-spacing:-0.02em;">
            Sea Fun Boat
          </div>
        </RouterLink>

        <nav class="hidden lg:flex items-center" style="gap:28px; font-size:14px; font-weight:500;">
          <template v-for="item in NAV" :key="item.key">
            <div v-if="item.sub" class="nav-group">
              <RouterLink
                :to="{ name: item.key }"
                class="nav-link flex items-center gap-1"
                :style="isActive(item.key) ? 'color:var(--rust)' : ''"
              >
                {{ item.label }}
                <span class="w-3 h-3 inline-block" v-html="icons.chevron"></span>
              </RouterLink>
              <div class="nav-dropdown">
                <RouterLink v-for="sub in item.sub" :key="sub.name" :to="{ name: sub.name }">
                  {{ sub.label }}
                </RouterLink>
              </div>
            </div>
            <RouterLink
              v-else
              :to="{ name: item.key }"
              class="nav-link"
              :style="isActive(item.key) ? 'color:var(--rust)' : ''"
            >
              {{ item.label }}
            </RouterLink>
          </template>
        </nav>

        <div class="flex items-center gap-2">
          <a
            href="https://seafunboat.seabook.pro"
            target="_blank"
            rel="noopener"
            class="btn btn-rust hidden sm:inline-flex"
          >
            Réserver
            <span class="w-4 h-4 inline-block" v-html="icons.arrow"></span>
          </a>
          <button class="lg:hidden p-2" aria-label="Menu" @click="mobileOpen = !mobileOpen">
            <span class="w-6 h-6 inline-block" style="color:var(--ink);" v-html="mobileOpen ? icons.close : icons.menu"></span>
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div class="mobile-nav lg:hidden" :class="{ hidden: !mobileOpen }">
        <template v-for="item in NAV" :key="item.key">
          <details v-if="item.sub">
            <summary>{{ item.label }}</summary>
            <div style="padding-bottom:10px;">
              <RouterLink :to="{ name: item.key }" @click="mobileOpen = false">Vue d'ensemble</RouterLink>
              <RouterLink v-for="sub in item.sub" :key="sub.name" :to="{ name: sub.name }" @click="mobileOpen = false">
                {{ sub.label }}
              </RouterLink>
            </div>
          </details>
          <RouterLink v-else :to="{ name: item.key }" @click="mobileOpen = false">{{ item.label }}</RouterLink>
        </template>
        <a href="tel:0494494466" style="color:var(--rust);">04 94 49 44 66</a>
        <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust w-full justify-center" style="margin-top:14px;">
          Réserver une sortie
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled    = ref(false)
const mobileOpen  = ref(false)

const NAV = [
  { key: 'location', label: 'Location', sub: null },
  { key: 'vente',    label: 'Vente',    sub: null },
  {
    key: 'chantier', label: 'Chantier naval',
    sub: [
      { label: 'Hivernage',   name: 'hivernage' },
      { label: 'Maintenance', name: 'maintenance' },
    ],
  },
  {
    key: 'permis', label: 'Permis bateau',
    sub: [
      { label: 'Permis Côtier',       name: 'permis-cotier' },
      { label: 'Extension Hauturier', name: 'permis-hauturier' },
      { label: 'Extension Fluviale',  name: 'permis-fluvial' },
    ],
  },
  { key: 'contact', label: 'Contact', sub: null },
]

function isActive(key: string) {
  const name = route.name as string | undefined
  if (!name) return false
  return name === key || name.startsWith(key + '-')
}

const icons = {
  arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
  menu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
}

function onScroll() { scrolled.value = window.scrollY > 30 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
