<template>
  <article class="card" style="overflow:hidden;">
    <div class="grid grid-cols-12">

      <!-- IMAGE + CAROUSEL -->
      <div class="col-span-12 md:col-span-5" style="min-height:260px;">
        <div
          class="photo-slot photo-slot--photo"
          style="height:100%; min-height:260px; border-radius:0; background-size:cover; background-position:center;"
          :style="{ backgroundImage: currentBgImage }"
        >
          <!-- Corner : specs rapides -->
          <div class="photo-slot__corner">
            {{ group.representative.capacity }} pers<template v-if="group.representative.horsepower"> · {{ group.representative.horsepower }} CV</template>
          </div>

          <!-- Caption : nom du modèle -->
          <div class="photo-slot__cap">{{ group.name }}</div>

          <!-- Badge permis -->
          <span
            v-if="group.representative.license_required"
            class="tag tag-teal"
            style="position:absolute; top:14px; left:14px;"
          >Permis requis</span>

          <!-- Badge unités -->
          <span
            v-if="group.units > 1"
            class="tag"
            style="position:absolute; top:14px; left:14px;"
            :style="group.representative.license_required ? 'top:46px;' : ''"
          >{{ group.units }} unités</span>

          <!-- Carousel : prev / next -->
          <template v-if="group.allImages.length > 1">
            <button
              @click.stop="prev"
              style="position:absolute; left:10px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.88); border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; line-height:1;"
              aria-label="Photo précédente"
            >‹</button>
            <button
              @click.stop="next"
              style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.88); border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; line-height:1;"
              aria-label="Photo suivante"
            >›</button>
            <!-- Dots -->
            <div style="position:absolute; bottom:12px; right:14px; display:flex; gap:5px;">
              <button
                v-for="(_, i) in group.allImages"
                :key="i"
                @click.stop="currentImg = i"
                style="width:7px; height:7px; border-radius:50%; border:none; cursor:pointer; padding:0; transition:background 0.2s;"
                :style="{ background: i === currentImg ? 'white' : 'rgba(255,255,255,0.45)' }"
                :aria-label="`Photo ${i + 1}`"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- INFOS -->
      <div class="col-span-12 md:col-span-7 flex flex-col" style="padding:28px 28px 24px;">
        <div class="kicker">
          <template v-if="group.representative.brand">{{ group.representative.brand }}<template v-if="group.representative.year"> · {{ group.representative.year }}</template></template>
          <template v-else-if="group.representative.year">{{ group.representative.year }}</template>
          <template v-else>{{ group.representative.location.city }}</template>
        </div>

        <h3 class="serif" style="font-size:32px; line-height:1.05; margin-top:6px;">{{ group.name }}</h3>

        <p v-if="group.representative.description" style="margin-top:8px; font-size:15px; line-height:1.6; color:var(--ink-2); max-width:48ch;">
          {{ group.representative.description }}
        </p>

        <div style="margin-top:18px;">
          <div class="spec-row"><span>Capacité</span><span>{{ group.representative.capacity }} personnes</span></div>
          <div v-if="group.representative.horsepower" class="spec-row">
            <span>Puissance moteur</span><span>{{ group.representative.horsepower }} CV</span>
          </div>
          <div class="spec-row">
            <span>Permis</span>
            <span>{{ group.representative.license_required ? 'Permis côtier requis' : 'Aucun permis requis' }}</span>
          </div>
          <div v-if="group.representative.deposit_enabled" class="spec-row">
            <span>Caution</span>
            <span>{{ group.representative.deposit_amount ? `${parseFloat(group.representative.deposit_amount).toLocaleString('fr-FR')} €` : 'Selon prestation' }}</span>
          </div>
          <div v-if="group.representative.features.length" class="spec-row">
            <span>Équipements</span><span>{{ group.representative.features.join(', ') }}</span>
          </div>
          <div class="spec-row">
            <span>Départ</span><span>{{ group.representative.location.city }}</span>
          </div>
          <div v-if="group.units > 1" class="spec-row">
            <span>Disponibilité</span><span>{{ group.units }} unités disponibles</span>
          </div>
        </div>

        <div class="dot-rule" style="margin-top:auto; margin-bottom:14px; padding-top:18px;"></div>

        <div class="flex items-end justify-between gap-4">
          <div>
            <div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">TARIFS</div>
            <div v-if="uniquePricing.length" class="flex flex-wrap gap-x-4 gap-y-1" style="margin-top:4px;">
              <span
                v-for="tier in uniquePricing"
                :key="tier.duration_label"
                class="serif"
                style="font-size:16px; line-height:1.4;"
              >
                {{ tier.duration_label }}&nbsp;<span style="font-size:13px; color:var(--ink-soft);">—</span>&nbsp;{{ parseFloat(tier.price).toLocaleString('fr-FR') }}&nbsp;€
              </span>
            </div>
            <div v-else class="serif" style="font-size:15px; color:var(--ink-soft);">Sur devis</div>
          </div>
          <a :href="bookingUrl" target="_blank" rel="noopener" class="btn btn-rust">Réserver</a>
        </div>
      </div>

    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { GroupedBoat } from '@/stores/fleetStore'
import type { JetBookPricing } from '@/services/jetbook'

const props = defineProps<{ group: GroupedBoat }>()

const currentImg = ref(0)
function prev() { currentImg.value = (currentImg.value - 1 + props.group.allImages.length) % props.group.allImages.length }
function next() { currentImg.value = (currentImg.value + 1) % props.group.allImages.length }

const currentBgImage = computed(() => {
  const src = props.group.allImages[currentImg.value]
  if (src) return `linear-gradient(rgba(6,41,66,0.05), rgba(6,41,66,0.4)), url('${src}')`
  return ''
})

const bookingUrl = computed(() => {
  const base = (import.meta.env.VITE_JETBOOK_BASE_URL as string || 'https://trial2.seabook.pro').replace(/\/$/, '')
  return `${base}/book/?jetski_id=${props.group.representative.id}`
})

const uniquePricing = computed(() => {
  const today = new Date()
  const seen = new Map<string, JetBookPricing>()
  for (const tier of props.group.representative.pricing) {
    const start = tier.period_start ? new Date(tier.period_start) : null
    const end   = tier.period_end   ? new Date(tier.period_end)   : null
    if (start || end) {
      const active = (!start || today >= start) && (!end || today <= end)
      if (!active) continue
    }
    if (!seen.has(tier.duration_label)) seen.set(tier.duration_label, tier)
  }
  return [...seen.values()]
})
</script>
