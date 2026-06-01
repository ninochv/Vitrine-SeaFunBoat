<template>
  <form @submit.prevent="submit">
    <div class="form-grid">
      <div class="full">
        <label class="lbl">Nom du modèle *</label>
        <input v-model="f.model" class="field" type="text" placeholder="ex : MARLIN 298" required />
      </div>
      <div>
        <label class="lbl">État *</label>
        <select v-model="f.condition" class="field" required>
          <option value="occasion">Occasion</option>
          <option value="neuf">Neuf</option>
        </select>
      </div>
      <div>
        <label class="lbl">Type de coque *</label>
        <select v-model="f.hull" class="field" required>
          <option value="rigide">Rigide</option>
          <option value="semi-rigide">Semi-rigide</option>
        </select>
      </div>
      <div>
        <label class="lbl">Marque *</label>
        <input v-model="f.builder" class="field" type="text" placeholder="ex : Marlin" required />
      </div>
      <div>
        <label class="lbl">Année *</label>
        <input v-model.number="f.year" class="field" type="number" min="2000" max="2030" placeholder="2023" required />
      </div>
      <div>
        <label class="lbl">Longueur (m) *</label>
        <input v-model.number="f.length" class="field" type="number" step="0.01" min="0.01" placeholder="ex: 8.06" required />
      </div>
      <div>
        <label class="lbl">Prix TTC (€) *</label>
        <input v-model.number="f.price" class="field" type="number" min="0" placeholder="175000" required />
      </div>
      <div>
        <label class="lbl">Motorisation</label>
        <input v-model="f.engine" class="field" type="text" placeholder="ex : 2x 200 CV XSR Selva" />
      </div>
      <div>
        <label class="lbl">Heures moteur</label>
        <input v-model.number="f.hours" class="field" type="number" min="0" placeholder="136" />
      </div>
      <div>
        <label class="lbl">Puissance totale (CV)</label>
        <input v-model.number="f.power" class="field" type="number" min="0" placeholder="400" />
      </div>
      <div>
        <label class="lbl">Tag (optionnel)</label>
        <input v-model="f.tag" class="field" type="text" placeholder="ex : Coup de cœur" />
      </div>
      <div class="full">
        <label class="lbl">Description courte</label>
        <textarea v-model="f.desc" class="field" rows="3" placeholder="Description affichée dans la liste des annonces…"></textarea>
      </div>
    </div>

    <!-- Équipements -->
    <div style="margin-top:24px;">
      <label class="lbl">Équipements</label>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <input v-model="eqInput" class="field" type="text" placeholder="ex : Guindeau" style="flex:1;" @keydown.enter.prevent="addEq" />
        <button type="button" @click="addEq" class="btn btn-ghost">Ajouter</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
        <span v-for="(eq, i) in f.equipment" :key="i" class="eq-tag">
          {{ eq }}
          <button type="button" @click="removeEq(i)">×</button>
        </span>
      </div>
    </div>

    <!-- Photos -->
    <div style="margin-top:24px;">
      <AdminPhotoUpload v-model="photos" />
    </div>

    <!-- Actions -->
    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:32px; padding-top:24px; border-top:1px solid var(--rule);">
      <button type="button" @click="$emit('cancelled')" class="btn btn-ghost">Annuler</button>
      <button type="submit" class="btn btn-rust">Enregistrer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { SaleBoat } from '@/data/types'
import AdminPhotoUpload, { type PhotoEntry } from './AdminPhotoUpload.vue'

const props = defineProps<{ boat: SaleBoat | null }>()
const emit = defineEmits<{
  saved: [boat: SaleBoat]
  cancelled: []
}>()

function blank() {
  return {
    id: '', model: '', builder: '', year: new Date().getFullYear(),
    condition: 'occasion' as const, hull: 'rigide' as const,
    length: null as unknown as number,
    price:  null as unknown as number,
    engine: '', hours: 0, power: 0,
    tag: '', desc: '', equipment: [] as string[],
  }
}

const f = reactive(blank())
const photos = ref<PhotoEntry[]>([])
const eqInput = ref('')

function loadBoat(b: SaleBoat | null) {
  Object.assign(f, b ? {
    id: b.id, model: b.model, builder: b.builder, year: b.year,
    condition: b.condition, hull: b.hull, length: b.length, price: b.price,
    engine: b.engine ?? '', hours: b.hours, power: b.power,
    tag: b.tag ?? '', desc: b.desc, equipment: [...(b.equipment ?? [])],
  } : blank())
  photos.value = b?.photos?.map((src, i) => ({ src, name: `photo-${i + 1}` })) ?? []
}

watch(() => props.boat, loadBoat, { immediate: true })

function addEq() {
  const v = eqInput.value.trim()
  if (v) { f.equipment.push(v); eqInput.value = '' }
}
function removeEq(i: number) { f.equipment.splice(i, 1) }

function submit() {
  const slug = f.model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const boat: SaleBoat = {
    id:        f.id || `${slug}-${Date.now()}`,
    model:     f.model.trim(),
    builder:   f.builder.trim(),
    year:      Number(f.year)   || new Date().getFullYear(),
    condition: f.condition,
    hull:      f.hull,
    length:    Number(f.length) || 0,
    price:     Number(f.price)  || 0,
    engine:    f.engine.trim(),
    hours:     Number(f.hours)  || 0,
    power:     Number(f.power)  || 0,
    tag:       f.tag?.trim() || null,
    desc:      f.desc.trim(),
    equipment: [...f.equipment],
    photos:    photos.value.map(p => p.src),
    photo:     photos.value[0]?.src ?? '',
  }
  emit('saved', boat)
}
</script>

<style scoped>
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.form-grid .full { grid-column:1/-1; }
.lbl { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:6px; }
.eq-tag { display:inline-flex; align-items:center; gap:6px; background:var(--sky); border-radius:999px; padding:4px 12px; font-size:13px; }
.eq-tag button { background:none; border:none; cursor:pointer; color:var(--rust); font-size:16px; line-height:1; padding:0; }
</style>
