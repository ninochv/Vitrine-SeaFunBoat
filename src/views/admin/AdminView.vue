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
      <div style="font-family:var(--font-serif); font-size:18px;">Sea Fun Boat &mdash; Administration</div>
      <div style="display:flex; gap:12px; align-items:center;">
        <RouterLink :to="{ name: 'home' }" style="font-family:var(--font-mono); font-size:11px; color:rgba(244,239,230,0.6); text-transform:uppercase; letter-spacing:0.1em; text-decoration:none;">Voir le site →</RouterLink>
        <button v-if="activeTab === 'bateaux'" @click="openExport" class="btn btn-ghost" style="border-color:rgba(244,239,230,0.3); color:var(--cream); padding:6px 14px; font-size:13px;">Exporter data.js</button>
        <button @click="admin.logout" style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em; color:rgba(244,239,230,0.4); text-transform:uppercase; background:none; border:none; cursor:pointer;">Déconnexion</button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="admin-tabs">
      <button :class="['tab-btn', { active: activeTab === 'bateaux' }]" @click="activeTab = 'bateaux'">Bateaux en vente</button>
      <button :class="['tab-btn', { active: activeTab === 'actualites' }]" @click="activeTab = 'actualites'">Actualités</button>
    </div>

    <!-- ══ TAB BATEAUX ══ -->
    <div v-if="activeTab === 'bateaux'" style="max-width:1000px; margin:0 auto; padding:40px 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <div>
          <h1 style="font-family:var(--font-serif); font-size:32px; line-height:1;">Bateaux en vente</h1>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em;">
            {{ sales.stats.total }} annonce{{ sales.stats.total > 1 ? 's' : '' }} · {{ sales.stats.neuf }} neufs · {{ sales.stats.occasion }} occasions
          </div>
        </div>
        <button @click="openBoatForm(null)" class="btn btn-rust">+ Ajouter un bateau</button>
      </div>

      <div v-if="sales.boats.length" style="display:flex; flex-direction:column; gap:14px;">
        <div v-for="(boat, i) in sales.boats" :key="boat.id" class="list-row">
          <div class="row-thumb">
            <img v-if="boat.photos?.[0]" :src="boat.photos[0]" :alt="boat.model" />
            <div v-else class="thumb-placeholder">🚤</div>
          </div>
          <div>
            <div style="font-family:var(--font-serif); font-size:20px; line-height:1.1;">{{ boat.model }}</div>
            <div style="font-family:var(--font-mono); font-size:10px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em; text-transform:uppercase;">{{ boat.builder }} · {{ boat.year }} · {{ boat.condition === 'neuf' ? 'Neuf' : 'Occasion' }}</div>
            <div style="margin-top:8px; font-size:14px; color:var(--ink-2);">{{ fmt(boat.price) }} €{{ boat.length ? ' · ' + parseFloat(String(boat.length)).toFixed(2) + ' m' : '' }}{{ boat.engine ? ' · ' + boat.engine : '' }}</div>
            <div style="margin-top:5px; font-family:var(--font-mono); font-size:10px; color:var(--ink-soft);">{{ (boat.photos ?? []).length }} photo(s) · {{ (boat.equipment ?? []).length }} équipement(s)</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button @click="openBoatForm(i)" class="btn btn-ghost" style="padding:7px 18px; font-size:13px;">Modifier</button>
            <button @click="deleteBoat(i)" style="font-family:var(--font-mono); font-size:10px; color:var(--rust); background:none; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:0.1em;">Supprimer</button>
          </div>
        </div>
      </div>
      <div v-else style="text-align:center; padding:80px 0; color:var(--ink-soft);">
        Aucun bateau. Cliquez sur <strong>Ajouter un bateau</strong> pour commencer.
      </div>
    </div>

    <!-- ══ TAB ACTUALITÉS ══ -->
    <div v-if="activeTab === 'actualites'" style="max-width:1000px; margin:0 auto; padding:40px 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <div>
          <h1 style="font-family:var(--font-serif); font-size:32px; line-height:1;">Actualités</h1>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em;">
            {{ news.articles.length }} article{{ news.articles.length > 1 ? 's' : '' }} · {{ news.published.length }} publié{{ news.published.length > 1 ? 's' : '' }}
          </div>
        </div>
        <button @click="openArticleForm(null)" class="btn btn-rust">+ Ajouter un article</button>
      </div>

      <div v-if="news.articles.length" style="display:flex; flex-direction:column; gap:14px;">
        <div v-for="article in news.articles" :key="article.id" class="list-row">
          <div class="row-thumb">
            <img v-if="article.photos[0]" :src="article.photos[0]" :alt="article.title" />
            <div v-else class="thumb-placeholder" style="font-size:26px;">📰</div>
          </div>
          <div>
            <div style="font-family:var(--font-serif); font-size:20px; line-height:1.1;">{{ article.title }}</div>
            <div style="font-family:var(--font-mono); font-size:10px; color:var(--ink-soft); margin-top:4px; letter-spacing:0.08em; text-transform:uppercase;">
              {{ article.category }} · {{ fmtDate(article.date) }}
            </div>
            <div style="margin-top:6px; display:flex; align-items:center; gap:10px;">
              <span :class="['status-badge', article.published ? 'published' : 'draft']">
                {{ article.published ? 'Publié' : 'Brouillon' }}
              </span>
              <span style="font-family:var(--font-mono); font-size:10px; color:var(--ink-soft);">{{ article.photos.length }} photo(s)</span>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button @click="openArticleForm(article.id)" class="btn btn-ghost" style="padding:7px 18px; font-size:13px;">Modifier</button>
            <button @click="deleteArticle(article.id)" style="font-family:var(--font-mono); font-size:10px; color:var(--rust); background:none; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:0.1em;">Supprimer</button>
          </div>
        </div>
      </div>
      <div v-else style="text-align:center; padding:80px 0; color:var(--ink-soft);">
        Aucun article. Cliquez sur <strong>Ajouter un article</strong> pour commencer.
      </div>
    </div>
  </div>

  <!-- MODAL BATEAU -->
  <div v-if="showBoatForm" class="modal-overlay" @click.self="showBoatForm = false">
    <div class="modal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <h2 style="font-family:var(--font-serif); font-size:26px;">{{ boatEditIdx !== null ? 'Modifier le bateau' : 'Nouveau bateau' }}</h2>
        <button @click="showBoatForm = false" style="background:none; border:none; cursor:pointer; font-size:26px; color:var(--ink-soft); line-height:1;">×</button>
      </div>
      <AdminBoatForm :boat="editBoat" @saved="onBoatSaved" @cancelled="showBoatForm = false" />
    </div>
  </div>

  <!-- MODAL ARTICLE -->
  <div v-if="showArticleForm" class="modal-overlay" @click.self="showArticleForm = false">
    <div class="modal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <h2 style="font-family:var(--font-serif); font-size:26px;">{{ editArticleId ? 'Modifier l\'article' : 'Nouvel article' }}</h2>
        <button @click="showArticleForm = false" style="background:none; border:none; cursor:pointer; font-size:26px; color:var(--ink-soft); line-height:1;">×</button>
      </div>
      <AdminArticleForm :article="editArticle" @saved="onArticleSaved" @cancelled="showArticleForm = false" />
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
import { useNewsStore  } from '@/stores/newsStore'
import AdminBoatForm    from '@/components/admin/AdminBoatForm.vue'
import AdminArticleForm from '@/components/admin/AdminArticleForm.vue'
import type { SaleBoat }    from '@/data/types'
import type { NewsArticle } from '@/data/types'

const admin = useAdminStore()
const sales = useSalesStore()
const news  = useNewsStore()

const activeTab = ref<'bateaux' | 'actualites'>('bateaux')

onMounted(() => {
  admin.checkSession()
  if (admin.authenticated) {
    sales.loadFromStorage()
    news.load()
  }
})

// ── Login ──────────────────────────────────
const pwd = ref('')
const loginError = ref(false)
function doLogin() {
  if (admin.login(pwd.value)) {
    loginError.value = false
    sales.loadFromStorage()
    news.load()
  } else {
    loginError.value = true
  }
}

// ── Boats ──────────────────────────────────
function fmt(n: number) { return n.toLocaleString('fr-FR') }

function deleteBoat(i: number) {
  const boat = sales.boats[i]
  if (confirm(`Supprimer « ${boat.model} » ?`)) sales.deleteBoat(boat.id)
}

const showBoatForm = ref(false)
const boatEditIdx  = ref<number | null>(null)
const editBoat     = ref<SaleBoat | null>(null)

function openBoatForm(idx: number | null) {
  boatEditIdx.value = idx
  editBoat.value    = idx !== null ? { ...sales.boats[idx] } : null
  showBoatForm.value = true
}

function onBoatSaved(boat: SaleBoat) {
  if (boatEditIdx.value !== null) {
    sales.updateBoat(boat.id, boat)
  } else {
    sales.addBoat(boat)
  }
  showBoatForm.value = false
}

// ── Articles ───────────────────────────────
function fmtDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function deleteArticle(id: string) {
  const a = news.articles.find(x => x.id === id)
  if (a && confirm(`Supprimer « ${a.title} » ?`)) news.deleteArticle(id)
}

const showArticleForm = ref(false)
const editArticleId   = ref<string | null>(null)
const editArticle     = ref<NewsArticle | null>(null)

function openArticleForm(id: string | null) {
  editArticleId.value   = id
  editArticle.value     = id ? (news.articles.find(a => a.id === id) ?? null) : null
  showArticleForm.value = true
}

function onArticleSaved(article: NewsArticle) {
  if (editArticleId.value) {
    news.updateArticle(article.id, article)
  } else {
    news.addArticle(article)
  }
  showArticleForm.value = false
}

// ── Export ─────────────────────────────────
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

.admin-tabs { background:white; border-bottom:1px solid var(--rule); display:flex; gap:0; padding:0 32px; }
.tab-btn { background:none; border:none; border-bottom:2px solid transparent; padding:14px 20px; font-family:var(--font-mono); font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; color:var(--ink-soft); transition:color 150ms, border-color 150ms; }
.tab-btn.active { color:var(--rust); border-bottom-color:var(--rust); }
.tab-btn:hover:not(.active) { color:var(--ink); }

.list-row { background:white; border:1px solid var(--rule); border-radius:var(--radius); padding:20px; display:grid; grid-template-columns:110px 1fr auto; gap:16px; align-items:center; }
.row-thumb { width:110px; height:82px; border-radius:10px; background:var(--sky); overflow:hidden; }
.row-thumb img { width:100%; height:100%; object-fit:cover; }
.thumb-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:26px; }

.status-badge { font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:3px 8px; border-radius:4px; }
.status-badge.published { background:#d1fae5; color:#065f46; }
.status-badge.draft     { background:#f3f4f6; color:#6b7280; }

.modal-overlay { position:fixed; inset:0; background:rgba(6,41,66,0.55); z-index:100; display:flex; align-items:flex-start; justify-content:center; padding:40px 20px; overflow-y:auto; }
.modal-box { background:white; border-radius:var(--radius-lg); width:100%; max-width:820px; padding:40px; }
</style>
