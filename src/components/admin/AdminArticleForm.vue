<template>
  <form @submit.prevent="submit" style="display:flex; flex-direction:column; gap:22px;">
    <div>
      <label class="lbl">Titre *</label>
      <input v-model="form.title" class="field" required placeholder="Titre de l'article" />
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div>
        <label class="lbl">Catégorie</label>
        <select v-model="form.category" class="field">
          <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div>
        <label class="lbl">Date</label>
        <input v-model="form.date" type="date" class="field" />
      </div>
    </div>

    <div>
      <label class="lbl">Résumé (accroche — 1 à 2 phrases)</label>
      <textarea v-model="form.summary" class="field" rows="2" placeholder="Court résumé affiché en listing..." style="resize:vertical;" />
    </div>

    <div>
      <label class="lbl">Contenu complet</label>
      <textarea v-model="form.content" class="field" rows="9" placeholder="Texte de l'article. Laissez une ligne vide entre chaque paragraphe." style="resize:vertical;" />
    </div>

    <AdminPhotoUpload v-model="photos" :maxPhotos="8" />

    <div style="display:flex; align-items:center; gap:10px; padding:14px; background:var(--sky); border-radius:var(--radius);">
      <input type="checkbox" v-model="form.published" id="pub-check" style="width:18px; height:18px; accent-color:var(--rust);" />
      <label for="pub-check" style="font-size:14px; cursor:pointer; user-select:none;">Publier l'article (visible sur le site)</label>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:12px; padding-top:8px; border-top:1px solid var(--rule);">
      <button type="button" @click="$emit('cancelled')" class="btn btn-ghost">Annuler</button>
      <button type="submit" class="btn btn-rust">{{ isEdit ? 'Enregistrer' : 'Créer l\'article' }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminPhotoUpload from '@/components/admin/AdminPhotoUpload.vue'
import type { PhotoEntry } from '@/components/admin/AdminPhotoUpload.vue'
import type { NewsArticle } from '@/data/types'

const CATEGORIES = ['Actualité', 'Événement', 'Promotion', 'Nouveauté', 'Conseil']

const props = defineProps<{ article: NewsArticle | null }>()
const emit = defineEmits<{
  saved: [article: NewsArticle]
  cancelled: []
}>()

const isEdit = computed(() => !!props.article)

const today = new Date().toISOString().slice(0, 10)

const form = ref({
  title:     props.article?.title     ?? '',
  category:  props.article?.category  ?? 'Actualité',
  date:      props.article?.date      ?? today,
  summary:   props.article?.summary   ?? '',
  content:   props.article?.content   ?? '',
  published: props.article?.published ?? false,
})

const photos = ref<PhotoEntry[]>(
  (props.article?.photos ?? []).map(src => ({ src, name: '' }))
)

function toSlug(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function submit() {
  const id   = props.article?.id   ?? (Date.now().toString(36) + Math.random().toString(36).slice(2, 6))
  const slug = props.article?.slug ?? (toSlug(form.value.title) + '-' + id.slice(-4))

  const article: NewsArticle = {
    id,
    slug,
    title:     form.value.title.trim(),
    date:      form.value.date,
    category:  form.value.category,
    summary:   form.value.summary.trim(),
    content:   form.value.content.trim(),
    photos:    photos.value.map(p => p.src),
    published: form.value.published,
  }
  emit('saved', article)
}
</script>
