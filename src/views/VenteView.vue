<template>
  <!-- PAGE HEAD -->
  <section style="padding-top:32px; padding-bottom:32px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Vente</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°02 · Vente · Neuf & occasion</div>
          <h1 class="display-1" style="margin-top:14px;">Le bateau qui<br/><em>vous ressemble</em>.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Concessionnaire Selva, Marlin Boat et Protagon. Bateaux neufs configurables et occasions vérifiées en chantier — toutes les annonces ci-dessous.</p>
        </div>
      </div>
      <div class="rule" style="margin-top:36px;"></div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6" style="padding-top:24px;">
        <div><div class="serif tnum" style="font-size:44px; line-height:1;">{{ store.stats.total }}</div><div class="kicker" style="margin-top:6px;">Annonces actives</div></div>
        <div><div class="serif tnum" style="font-size:44px; line-height:1;">{{ store.stats.neuf }}</div><div class="kicker" style="margin-top:6px;">Neufs disponibles</div></div>
        <div><div class="serif tnum" style="font-size:44px; line-height:1;">{{ store.stats.occasion }}</div><div class="kicker" style="margin-top:6px;">Occasions</div></div>
        <div><div class="serif tnum" style="font-size:44px; line-height:1;">03</div><div class="kicker" style="margin-top:6px;">Marques officielles</div></div>
      </div>
    </div>
  </section>

  <!-- LIST + SIDEBAR -->
  <section style="padding-top:32px; padding-bottom:64px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8">

        <!-- SIDEBAR -->
        <aside class="col-span-12 md:col-span-4 lg:col-span-3">
          <div class="card" style="padding:24px; position:sticky; top:110px;">
            <div class="flex items-center justify-between">
              <h2 class="kicker">Critères</h2>
              <button @click="store.resetFilters(); priceVal = 250000; lengthVal = 4; powerVal = 0; yearVal = 2010;" class="mono" style="font-size:11px; color:var(--rust); letter-spacing:0.1em; text-transform:uppercase; background:none; border:none; cursor:pointer;">Réinitialiser</button>
            </div>

            <!-- État -->
            <div class="filter-group">
              <div class="field-label">État</div>
              <div class="flex flex-wrap gap-2">
                <button v-for="opt in conditionOpts" :key="opt.v" class="chip" :class="{ 'is-active': store.filters.condition === opt.v }" @click="store.setFilter('condition', opt.v)">{{ opt.l }}</button>
              </div>
            </div>

            <!-- Coque -->
            <div class="filter-group">
              <div class="field-label">Type de coque</div>
              <div class="flex flex-wrap gap-2">
                <button v-for="opt in hullOpts" :key="opt.v" class="chip" :class="{ 'is-active': store.filters.hull === opt.v }" @click="store.setFilter('hull', opt.v)">{{ opt.l }}</button>
              </div>
            </div>

            <!-- Marque -->
            <div class="filter-group">
              <div class="field-label">Marque</div>
              <div class="flex flex-wrap gap-2">
                <button class="chip" :class="{ 'is-active': store.filters.brand === 'all' }" @click="store.setFilter('brand', 'all')">Toutes</button>
                <button v-for="b in store.brands" :key="b" class="chip" :class="{ 'is-active': store.filters.brand === b }" @click="store.setFilter('brand', b)">{{ b }}</button>
              </div>
            </div>

            <!-- Prix -->
            <div class="filter-group">
              <div class="flex items-baseline justify-between">
                <div class="field-label" style="margin-bottom:0;">Prix maximum</div>
                <div class="mono tnum" style="font-size:13px; color:var(--ink-2);">{{ fmt(priceVal) }} €</div>
              </div>
              <div class="range-line"><input type="range" min="10000" max="250000" step="5000" v-model.number="priceVal" @input="store.setFilter('maxPrice', priceVal)"/></div>
              <div class="flex justify-between mono" style="font-size:10px; color:var(--ink-soft); letter-spacing:0.1em;"><span>10 000 €</span><span>250 000 €</span></div>
            </div>

            <!-- Longueur -->
            <div class="filter-group">
              <div class="flex items-baseline justify-between">
                <div class="field-label" style="margin-bottom:0;">Longueur min.</div>
                <div class="mono tnum" style="font-size:13px; color:var(--ink-2);">{{ lengthVal.toFixed(1) }} m</div>
              </div>
              <div class="range-line"><input type="range" min="4" max="9" step="0.5" v-model.number="lengthVal" @input="store.setFilter('minLength', lengthVal)"/></div>
              <div class="flex justify-between mono" style="font-size:10px; color:var(--ink-soft); letter-spacing:0.1em;"><span>4 m</span><span>9 m</span></div>
            </div>

            <!-- Puissance -->
            <div class="filter-group">
              <div class="flex items-baseline justify-between">
                <div class="field-label" style="margin-bottom:0;">Puissance min.</div>
                <div class="mono tnum" style="font-size:13px; color:var(--ink-2);">{{ powerVal }} CV</div>
              </div>
              <div class="range-line"><input type="range" min="0" max="300" step="10" v-model.number="powerVal" @input="store.setFilter('minPower', powerVal)"/></div>
              <div class="flex justify-between mono" style="font-size:10px; color:var(--ink-soft); letter-spacing:0.1em;"><span>0 CV</span><span>300 CV</span></div>
            </div>

            <!-- Année -->
            <div class="filter-group">
              <div class="flex items-baseline justify-between">
                <div class="field-label" style="margin-bottom:0;">Année min.</div>
                <div class="mono tnum" style="font-size:13px; color:var(--ink-2);">{{ yearVal }}</div>
              </div>
              <div class="range-line"><input type="range" min="2010" max="2026" step="1" v-model.number="yearVal" @input="store.setFilter('minYear', yearVal)"/></div>
              <div class="flex justify-between mono" style="font-size:10px; color:var(--ink-soft); letter-spacing:0.1em;"><span>2010</span><span>2026</span></div>
            </div>
          </div>
        </aside>

        <!-- LIST -->
        <section class="col-span-12 md:col-span-8 lg:col-span-9">
          <div class="flex flex-wrap items-baseline justify-between gap-3" style="margin-bottom:16px;">
            <div class="kicker">{{ store.filteredBoats.length }} annonce{{ store.filteredBoats.length > 1 ? 's' : '' }} sur {{ store.stats.total }}</div>
            <div class="flex items-center gap-2">
              <label class="mono" style="font-size:11px; letter-spacing:0.12em; color:var(--ink-soft); text-transform:uppercase;">Trier</label>
              <select class="field" style="padding:8px 12px; width:auto;" @change="store.setSortBy(($event.target as HTMLSelectElement).value as any)">
                <option value="default">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="year-desc">Plus récent</option>
                <option value="length">Plus grand</option>
              </select>
            </div>
          </div>

          <div v-if="store.filteredBoats.length">
            <SaleCard v-for="boat in store.filteredBoats" :key="boat.id" :boat="boat" />
          </div>
          <div v-else style="padding:80px 0; text-align:center; color:var(--ink-soft);">
            Aucune annonce ne correspond à vos critères.
            <button @click="resetAll" class="btn-link" style="margin-left:8px;">Tout réinitialiser</button>
          </div>
        </section>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section style="padding-top:64px;">
    <div class="container-x">
      <div style="background:var(--paper); border:1px solid var(--rule); padding:48px;">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 md:col-span-8">
            <div class="section-num">N°03 · Sur mesure</div>
            <h2 class="display-3" style="margin-top:14px;">Vous ne trouvez pas votre bateau ?</h2>
            <p style="margin-top:14px; max-width:50ch; color:var(--ink-2); line-height:1.6;">On le cherche pour vous. Décrivez-nous votre projet — programme, budget, équipage — et nous vous proposons trois options sous une semaine.</p>
          </div>
          <div class="col-span-12 md:col-span-4 md:text-right">
            <RouterLink :to="{ name: 'contact' }" class="btn btn-navy">Décrire mon projet</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSalesStore } from '@/stores/salesStore'
import SaleCard from '@/components/sales/SaleCard.vue'

const store = useSalesStore()
onMounted(() => store.loadFromStorage())

const priceVal  = ref(250000)
const lengthVal = ref(4)
const powerVal  = ref(0)
const yearVal   = ref(2010)

const conditionOpts = [
  { v: 'all' as const,      l: 'Tous' },
  { v: 'neuf' as const,     l: 'Neuf' },
  { v: 'occasion' as const, l: 'Occasion' },
]
const hullOpts = [
  { v: 'all' as const,          l: 'Tous' },
  { v: 'rigide' as const,       l: 'Rigide' },
  { v: 'semi-rigide' as const,  l: 'Semi-rigide' },
]

function fmt(n: number) { return n.toLocaleString('fr-FR') }

function resetAll() {
  store.resetFilters()
  priceVal.value = 250000; lengthVal.value = 4; powerVal.value = 0; yearVal.value = 2010
}
</script>

<style scoped>
.filter-group + .filter-group { margin-top:24px; padding-top:24px; border-top:1px solid var(--rule-soft); }
.range-line { position:relative; padding-top:6px; padding-bottom:6px; }
.range-line input[type="range"] { width:100%; appearance:none; -webkit-appearance:none; height:2px; background:var(--rule); outline:none; }
.range-line input[type="range"]::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:16px; height:16px; background:var(--ink); border-radius:50%; cursor:pointer; }
.range-line input[type="range"]::-moz-range-thumb { width:16px; height:16px; background:var(--ink); border-radius:50%; cursor:pointer; border:0; }
</style>
