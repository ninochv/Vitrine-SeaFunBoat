const express = require('express')
const fs      = require('fs')
const path    = require('path')

const app       = express()
const DATA_DIR  = process.env.DATA_DIR   || '/data'
const ADMIN_PASS = process.env.ADMIN_PASS || 'sfb2025'

app.use(express.json({ limit: '100mb' }))

// CORS pour le dev local (Vite dev server)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`)
}

function readData(name) {
  const fp = filePath(name)
  if (!fs.existsSync(fp)) return []
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')) } catch { return [] }
}

function writeData(name, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(filePath(name), JSON.stringify(data))
}

function requireAuth(req, res, next) {
  if (req.headers['x-admin-password'] !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Non autorisé' })
  }
  next()
}

// Bateaux en vente
app.get('/data/sales', (req, res) => res.json(readData('sales')))
app.put('/data/sales', requireAuth, (req, res) => {
  writeData('sales', req.body)
  res.json({ ok: true })
})

// Actualités
app.get('/data/news', (req, res) => res.json(readData('news')))
app.put('/data/news', requireAuth, (req, res) => {
  writeData('news', req.body)
  res.json({ ok: true })
})

app.listen(3000, () => console.log('SFB API démarré sur le port 3000'))
