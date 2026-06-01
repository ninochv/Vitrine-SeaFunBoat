<template>
  <div>
    <!-- Hero -->
    <section style="background:var(--ink); color:var(--cream); padding:80px 0 60px;">
      <div class="container-x">
        <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--teal-light); margin-bottom:12px;">News &amp; Événements</div>
        <h1 style="font-family:var(--font-serif); font-size:54px; line-height:1.05; letter-spacing:-0.02em;">Actualités</h1>
        <p style="margin-top:16px; font-size:16px; color:rgba(244,239,230,0.7); max-width:52ch; line-height:1.6;">
          Les dernières nouvelles de Sea Fun Boat — événements, promotions, nouveautés et conseils nautiques.
        </p>
      </div>
    </section>

    <!-- Articles -->
    <section style="padding:72px 0;">
      <div class="container-x">
        <div v-if="!news.published.length" style="text-align:center; padding:80px 0; color:var(--ink-soft);">
          <div style="font-size:40px; margin-bottom:16px;">📰</div>
          <div style="font-family:var(--font-serif); font-size:24px; color:var(--ink);">Aucune actualité pour le moment</div>
          <p style="margin-top:8px; font-size:15px;">Revenez bientôt, nous publions régulièrement des nouvelles.</p>
        </div>

        <div v-else class="articles-grid">
          <RouterLink
            v-for="article in news.published"
            :key="article.id"
            :to="{ name: 'actualite', params: { slug: article.slug } }"
            class="article-card"
          >
            <div class="article-thumb">
              <img v-if="article.photos[0]" :src="article.photos[0]" :alt="article.title" />
              <div v-else class="article-thumb-placeholder">Sea Fun Boat</div>
            </div>
            <div style="padding:24px;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                <span class="cat-badge">{{ article.category }}</span>
                <span style="font-family:var(--font-mono); font-size:10px; color:var(--ink-soft); letter-spacing:0.06em;">{{ fmtDate(article.date) }}</span>
              </div>
              <h2 class="article-title">{{ article.title }}</h2>
              <p v-if="article.summary" class="article-summary">{{ article.summary }}</p>
              <div class="read-more">Lire la suite →</div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'

const news = useNewsStore()
onMounted(() => news.load())

function fmtDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 900px) {
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .articles-grid { grid-template-columns: 1fr; }
}

.article-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow 200ms, transform 200ms;
}
.article-card:hover {
  box-shadow: 0 8px 32px rgba(6,41,66,0.12);
  transform: translateY(-2px);
}

.article-thumb {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--sky);
}
.article-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms;
}
.article-card:hover .article-thumb img {
  transform: scale(1.03);
}
.article-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--ink-soft);
}

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
.article-title {
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 1.25;
  margin-bottom: 10px;
  color: var(--ink);
}
.article-summary {
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.6;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.read-more {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rust);
}
</style>
