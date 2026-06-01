import type { SaleBoat, NewsArticle } from '@/data/types'

const ADMIN_PASS = 'sfb2025'

async function get<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(path)
    if (res.ok) return res.json()
  } catch {}
  return []
}

async function put(path: string, data: unknown): Promise<void> {
  try {
    await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': ADMIN_PASS,
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    console.error('Erreur de sauvegarde', e)
  }
}

export const dataApi = {
  getSales:  ()                  => get<SaleBoat>('/data/sales'),
  saveSales: (d: SaleBoat[])     => put('/data/sales', d),
  getNews:   ()                  => get<NewsArticle>('/data/news'),
  saveNews:  (d: NewsArticle[])  => put('/data/news', d),
}
