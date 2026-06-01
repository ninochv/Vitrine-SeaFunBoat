<template>
  <article class="sale-card">
    <!-- Photo / Carousel -->
    <div style="aspect-ratio:4/3; min-height:180px; position:relative; overflow:hidden; border-radius:var(--radius-lg);">
      <SaleCarousel :photos="photoList">
        <div class="photo-slot__corner">{{ parseFloat(boat.length.toString()).toFixed(1) }} m · {{ boat.power }} CV</div>
        <div class="photo-slot__cap">{{ boat.model }}</div>
        <span v-if="boat.tag" class="tag" :class="boat.condition === 'neuf' ? 'tag-teal' : 'tag-rust'" style="position:absolute; top:14px; left:14px;">{{ boat.tag }}</span>
      </SaleCarousel>
    </div>

    <!-- Details -->
    <div class="flex flex-col">
      <div class="flex items-baseline gap-3 flex-wrap">
        <span class="tag" :class="boat.condition === 'neuf' ? 'tag-teal' : ''">{{ boat.condition === 'neuf' ? 'Neuf' : 'Occasion' }}</span>
        <span class="kicker">{{ boat.builder }} · {{ boat.year }}</span>
      </div>
      <h3 class="serif" style="font-size:30px; line-height:1.05; margin-top:6px;">{{ boat.model }}</h3>
      <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6; max-width:60ch;">{{ boat.desc }}</p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-1" style="margin-top:14px;">
        <div class="spec-row" style="border:0; padding:6px 0;"><span>Coque</span><span>{{ boat.hull === 'rigide' ? 'Rigide' : 'Semi-rigide' }}</span></div>
        <div class="spec-row" style="border:0; padding:6px 0;"><span>Longueur</span><span>{{ parseFloat(boat.length.toString()).toFixed(2) }} m</span></div>
        <div class="spec-row" style="border:0; padding:6px 0;"><span>Motorisation</span><span>{{ boat.engine || boat.power + ' CV' }}</span></div>
        <div class="spec-row" style="border:0; padding:6px 0;">
          <span>{{ boat.condition === 'neuf' ? 'Délai' : 'Heures' }}</span>
          <span>{{ boat.condition === 'neuf' ? (boat.hours === 0 ? 'Stock' : '6 sem.') : boat.hours + ' h' }}</span>
        </div>
      </div>

      <!-- Equipment -->
      <div v-if="boat.equipment?.length" style="margin-top:14px;">
        <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:8px;">Équipements</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <span v-for="eq in boat.equipment" :key="eq" style="background:var(--sky); border-radius:999px; padding:3px 11px; font-size:12px;">{{ eq }}</span>
        </div>
      </div>

      <div class="dot-rule" style="margin:18px 0 14px;"></div>

      <div class="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">PRIX TTC</div>
          <div class="serif tnum" style="font-size:34px; line-height:1;">{{ fmt(boat.price) }} €</div>
        </div>
        <div class="flex gap-2">
          <RouterLink :to="{ name: 'contact' }" class="btn btn-ghost">Plus d'infos</RouterLink>
          <RouterLink :to="{ name: 'contact' }" class="btn btn-rust">Visiter</RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SaleBoat } from '@/data/types'
import SaleCarousel from './SaleCarousel.vue'

const props = defineProps<{ boat: SaleBoat }>()

const photoList = computed(() =>
  props.boat.photos?.length ? props.boat.photos : (props.boat.photo ? [props.boat.photo] : [])
)

function fmt(n: number) { return n.toLocaleString('fr-FR') }
</script>

<style scoped>
.sale-card { display:grid; grid-template-columns:240px 1fr; gap:24px; padding:22px 0; border-bottom:1px solid var(--rule); }
@media (max-width:768px) { .sale-card { grid-template-columns:1fr; } }
</style>
