export type HullType = 'rigide' | 'semi-rigide'
export type Condition = 'neuf' | 'occasion'

export interface SaleBoat {
  id: string
  model: string
  builder: string
  year: number
  condition: Condition
  hull: HullType
  length: number
  power: number
  price: number
  hours: number
  tag: string | null
  desc: string
  engine: string
  equipment: string[]
  photos: string[]
  photo?: string
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  date: string
  category: string
  summary: string
  content: string
  photos: string[]
  published: boolean
}
