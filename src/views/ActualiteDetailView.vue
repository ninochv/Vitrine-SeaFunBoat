<template>
  <div v-if="article">
    <!-- Cover photo -->
    <div v-if="article.photos[0]" style="width:100%; height:420px; overflow:hidden; background:var(--sky);">
      <img :src="article.photos[0]" :alt="article.title" style="width:100%; height:100%; object-fit:cover;" />
    </div>

    <div class="container-x article-content">
      <RouterLink :to="{ name: 'actualites' }" class="back-link">← Toutes les actualités</RouterLink>

      <div style="display:flex; align-items:center; gap:12px; margin-top:24px;">
        <span class="cat-badge">{{ article.category }}</span>
        <span style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.06em;">{{ fmtDate(article.date) }}</span>
      </div>

      <h1 style="font-family:var(--font-serif); font-size:44px; line-height:1.1; letter-spacing:-0.02em; margin-top:16px; color:var(--ink);">
        {{ article.title }}
      </h1>

      <p v-if="article.summary" class="article-lead">{{ article.summary }}</p>

      <div class="article-body">
        <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
      </div>

      <!-- Photo gallery (skip cover, already shown above) -->
      <div v-if="article.photos.length > 1" style="margin-top:48px;">
        <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:16px;">Galerie photos</div>
        <div class="photo-grid">
          <div
            v-for="(photo, i) in article.photos"
            :key="i"
            class="photo-item"
            @click="lightboxIdx = i"
          >
            <img :src="photo" :alt="`Photo ${i + 1}`" />
          </div>
        </div>
      </div>

      <div style="margin-top:56px; border-top:1px solid var(--rule); padding-top:32px;">
        <RouterLink :to="{ name: 'actualites' }" class="btn btn-ghost">← Retour aux actualités</RouterLink>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxIdx !== null" class="lightbox" @click.self="lightboxIdx = null">
      <button class="lb-close" @click="lightboxIdx = null">×</button>
      <button v-if="lightboxIdx > 0" class="lb-prev" @click="lightboxIdx--">‹</button>
      <img :src="article.photos[lightboxIdx]" class="lb-img" :alt="`Photo ${lightboxIdx + 1}`" />
      <button v-if="lightboxIdx < article.photos.length - 1" class="lb-next" @click="lightboxIdx++">›</button>
    </div>
  </div>

  <!-- 404 -->
  <div v-else style="text-align:center; padding:120px 24px; color:var(--ink-soft);">
    <div style="font-family:var(--font-serif); font-size:32px; color:var(--ink); margin-bottom:16px;">Article introuvable</div>
    <RouterLink :to="{ name: 'actualites' }" class="btn btn-rust" style="display:inline-flex;">Voir toutes les actualités</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'
import type { NewsArticle } from '@/data/types'

const route = useRoute()
const news  = useNewsStore()

const lightboxIdx = ref<number | null>(null)

onMounted(() => news.load())

const article = computed<NewsArticle | undefined>(() =>
  news.articles.find(a => a.slug === route.params.slug && a.published)
)

const paragraphs = computed(() =>
  (article.value?.content ?? '').split(/\n{2,}/).filter(p => p.trim())
)

function fmtDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.article-content {
  max-width: 760px;
  padding-top: 56px;
  padding-bottom: 80px;
}
.back-link {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rust);
  text-decoration: none;
}
.back-link:hover { text-decoration: underline; }

.cat-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--rust);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
}
.article-lead {
  margin-top: 20px;
  font-size: 18px;
  color: var(--ink-2);
  line-height: 1.65;
  font-weight: 500;
  border-left: 3px solid var(--rust);
  padding-left: 18px;
}
.article-body {
  margin-top: 32px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--ink-2);
}
.article-body p { margin-bottom: 20px; }

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
@media (max-width: 600px) {
  .photo-grid { grid-template-columns: repeat(2, 1fr); }
}
.photo-item {
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  background: var(--sky);
  cursor: pointer;
}
.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms;
}
.photo-item:hover img { transform: scale(1.04); }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(6,41,66,0.92);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.lb-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 8px;
}
.lb-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  line-height: 1;
}
.lb-prev, .lb-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  font-size: 36px;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
  line-height: 1;
}
.lb-prev { left: 20px; }
.lb-next { right: 20px; }
</style>
