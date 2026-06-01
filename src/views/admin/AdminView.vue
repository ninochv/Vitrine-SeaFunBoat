<template>
  <!-- LOGIN -->
  <div v-if="!admin.authenticated" class="login-wrap">
    <div class="login-box">
      <div style="font-family:var(--font-serif); font-size:30px; color:var(--ink); line-height:1;">Sea Fun Boat</div>
      <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.18em; color:var(--ink-soft); margin-top:6px; text-transform:uppercase;">Espace administration</div>
      <div style="margin-top:32px;">
        <input v-model="pwd" type="password" class="field" placeholder="Mot de passe" style="text-align:center; font-size:18px; letter-spacing:0.2em;" @keydown.enter="doLogin" />
        <div v-if="loginError" style="color:var(--rust); font-size:13px; margin-top:8px;">Mot de passe incorrect.</div>
        <button @click="doLogin" class="btn btn-rust" style="width:100%; margin-top:16px; justify-content:center;">Connexion</button>
      </div>
    </div>
  </div>

  <!-- ADMIN PANEL -->
  <div v-else>
    <!-- Header -->
    <div class="admin-header">
      <div style="font-family:var(--font-serif); font-size:18px;">Sea Fun Boat &mdash; Admin vente</div>
      <div style="display:flex; gap:12px; align-items:center;">
        <RouterLink :to="{ name: 'vente' }" style="font-family:var(--font-mono); font-size:11px; color:rgba(244,239,230,0.6); text-transform:uppercase; letter-spacing:0.1em; text-decoration:none;">Voir le site →</RouterLink>
        <button @click="openExport" class="btn btn-ghost" style="border-color:rgba(244,239,230,0.3); color:var(--cream); padding:6px 14px; font-size:13px;">Exporter data.js</button>
        <button @click="admin.logout" style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em; color:rgba(244,239,230,0.4); text-transform:uppercase; background:none; border:none; cursor:pointer;">Déconnexion</button>
      </div>
    </div>

    <!-- Body -->
    <div style="max-width:1000px; margin:0 auto; padding:40px 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <div>
          <h1 style="font-family:var(--font-serif); font-size:32px; line-height:1;">Bateaux en vente</h1>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em;">
            {{ sales.stats.total }} annonce{{ sales.stats.total > 1 ? 's' : '' }} · {{ sales.stats.neuf }} neufs · {{ sales.stats.occasion }} occasions
          </div>
        </div>
        <button @click="openForm(null)" class="btn btn-rust">+ Ajouter un bateau</button>
      </div>

      <div v-if="sales.boats.length" style="display:flex; flex-direction:column; gap:14px;">
        <div v-for="(boat, i) in sales.boats" :key="boat.id" class="boat-row">
          <div class="boat-thumb">
            <img v-if="boat.photos?.[0]" :src="boat.photos[0]" :alt="boat.model" />
            <div v-else style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px;">🚤</div>
          </div>
          <div>
            <div style="font-family:var(--font-serif); font-size:20px; line-height:1.1;">{{ boat.model }}</div>
            <div style="font-family:var(--font-mono); font-size:10px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em; text-transform:uppercase;">{{ boat.builder }} · {{ boat.year }} · {{ boat.condition === 'neuf' ? 'Neuf' : 'Occasion' }}</div>
            <div style="margin-top:8px; font-size:14px; color:var(--ink-2);">{{ fmt(boat.price) }} €{{ boat.length ? ' · ' + parseFloat(String(boat.length)).toFixed(2) + ' m' : '' }}{{ boat.engine ? ' · ' + boat.engine : '' }}</div>
            <div style="margin-top:5px; font-family:var(--font-mono); font-size:10px; color:var(--ink-soft);">{{ (boat.photos ?? []).length }} photo(s) · {{ (boat.equipment ?? []).length }} équipement(s)</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button @click="openForm(i)" class="btn btn-ghost" style="padding:7px 18px; font-size:13px;">Modifier</button>
            <button @click="deleteBoat(i)" style="font-family:var(--font-mono); font-size:10px; color:var(--rust); background:none; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:0.1em;">Supprimer</button>
          </div>
        </div>
      </div>
      <div v-else style="text-align:center; padding:80px 0; color:var(--ink-soft);">
        Aucun bateau. Cliquez sur <strong>Ajouter un bateau</strong> pour commencer.
      </div>
    </div>
  </div>

  <!-- FORM MODAL -->
  <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
    <div class="modal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <h2 style="font-family:var(--font-serif); font-size:26px;">{{ editIdx !== null ? 'Modifier le bateau' : 'Nouveau bateau' }}</h2>
        <button @click="showForm = false" style="background:none; border:none; cursor:pointer; font-size:26px; color:var(--ink-soft); line-height:1;">×</button>
      </div>
      <AdminBoatForm :boat="editBoat" @saved="onSaved" @cancelled="showForm = false" />
    </div>
  </div>

  <!-- EXPORT MODAL -->
  <div v-if="showExport" class="modal-overlay" @click.self="showExport = false">
    <div class="modal-box" style="max-width:720px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h2 style="font-family:var(--font-serif); font-size:24px;">Exporter data.js</h2>
        <button @click="showExport = false" style="background:none; border:none; cursor:pointer; font-size:26px; color:var(--ink-soft); line-height:1;">×</button>
      </div>
      <p style="color:var(--ink-2); font-size:14px; line-height:1.6; margin-bottom:16px;">Copiez ce contenu et remplacez le fichier <code style="background:var(--sky); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); font-size:12px;">assets/data.js</code> pour publier les annonces.</p>
      <textarea :value="exportCode" readonly style="width:100%; height:180px; font-family:var(--font-mono); font-size:11px; border:1px solid var(--rule); border-radius:8px; padding:12px; resize:vertical;" @click="($event.target as HTMLTextAreaElement).select()"></textarea>
      <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:14px;">
        <button @click="showExport = false" class="btn btn-ghost">Fermer</button>
        <button @click="copyExport" class="btn btn-rust">{{ copied ? '✓ Copié !' : 'Copier le code' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useSalesStore } from '@/stores/salesStore'
import AdminBoatForm from '@/components/admin/AdminBoatForm.vue'
import type { SaleBoat } from '@/data/types'

const admin = useAdminStore()
const sales = useSalesStore()

onMounted(() => {
  admin.checkSession()
  if (admin.authenticated) sales.loadFromStorage()
})

// Login
const pwd = ref('')
const loginError = ref(false)
function doLogin() {
  if (admin.login(pwd.value)) {
    loginError.value = false
    sales.loadFromStorage()
  } else {
    loginError.value = true
  }
}

// List
function fmt(n: number) { return n.toLocaleString('fr-FR') }

function deleteBoat(i: number) {
  const boat = sales.boats[i]
  if (confirm(`Supprimer « ${boat.model} » ?`)) {
    sales.deleteBoat(boat.id)
  }
}

// Form
const showForm = ref(false)
const editIdx  = ref<number | null>(null)
const editBoat = ref<SaleBoat | null>(null)

function openForm(idx: number | null) {
  editIdx.value  = idx
  editBoat.value = idx !== null ? { ...sales.boats[idx] } : null
  showForm.value = true
}

function onSaved(boat: SaleBoat) {
  if (editIdx.value !== null) {
    sales.updateBoat(boat.id, boat)
  } else {
    sales.addBoat(boat)
  }
  showForm.value = false
}

// Export
const showExport = ref(false)
const exportCode = ref('')
const copied     = ref(false)

function openExport() {
  exportCode.value = admin.exportDataJs(sales.boats)
  showExport.value = true
}

function copyExport() {
  navigator.clipboard.writeText(exportCode.value).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  })
}
</script>

<style scoped>
.login-wrap { min-height:calc(100vh - 60px); display:flex; align-items:center; justify-content:center; background:var(--ink); margin-top:-80px; }
.login-box { background:var(--cream); border-radius:var(--radius-lg); padding:48px 40px; width:100%; max-width:400px; text-align:center; }
.admin-header { background:var(--ink); color:var(--cream); padding:0 32px; height:60px; display:flex; align-items:center; justify-content:space-between; }
.boat-row { background:white; border:1px solid var(--rule); border-radius:var(--radius); padding:20px; display:grid; grid-template-columns:110px 1fr auto; gap:16px; align-items:center; }
.boat-thumb { width:110px; height:82px; border-radius:10px; background:var(--sky); overflow:hidden; }
.boat-thumb img { width:100%; height:100%; object-fit:cover; }
.modal-overlay { position:fixed; inset:0; background:rgba(6,41,66,0.55); z-index:100; display:flex; align-items:flex-start; justify-content:center; padding:40px 20px; overflow-y:auto; }
.modal-box { background:white; border-radius:var(--radius-lg); width:100%; max-width:820px; padding:40px; }
</style>
