import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dataApi } from '@/services/dataApi'
import type { NewsArticle } from '@/data/types'

export const useNewsStore = defineStore('news', () => {
  const articles = ref<NewsArticle[]>([])
  const loading  = ref(false)

  async function load() {
    loading.value  = true
    articles.value = await dataApi.getNews()
    loading.value  = false
  }

  function save() { void dataApi.saveNews(articles.value) }

  function addArticle(article: NewsArticle) {
    articles.value = [article, ...articles.value]
    save()
  }

  function updateArticle(id: string, patch: Partial<NewsArticle>) {
    articles.value = articles.value.map(a => a.id === id ? { ...a, ...patch } : a)
    save()
  }

  function deleteArticle(id: string) {
    articles.value = articles.value.filter(a => a.id !== id)
    save()
  }

  const published = computed(() =>
    [...articles.value]
      .filter(a => a.published)
      .sort((a, b) => b.date.localeCompare(a.date))
  )

  return { articles, loading, published, load, addArticle, updateArticle, deleteArticle }
})
