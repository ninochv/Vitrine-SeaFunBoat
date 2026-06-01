import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/',                           name: 'home',              component: () => import('@/views/HomeView.vue') },
    { path: '/location',                   name: 'location',          component: () => import('@/views/LocationView.vue') },
    { path: '/vente',                      name: 'vente',             component: () => import('@/views/VenteView.vue') },
    { path: '/chantier-naval',             name: 'chantier',          component: () => import('@/views/ChantierNavalView.vue') },
    { path: '/chantier-naval/maintenance', name: 'maintenance',       component: () => import('@/views/MaintenanceView.vue') },
    { path: '/chantier-naval/hivernage',   name: 'hivernage',         component: () => import('@/views/HivernageView.vue') },
    { path: '/permis-bateau',              name: 'permis',            component: () => import('@/views/PermisView.vue') },
    { path: '/permis-bateau/cotier',       name: 'permis-cotier',     component: () => import('@/views/PermisCotierView.vue') },
    { path: '/permis-bateau/hauturier',    name: 'permis-hauturier',  component: () => import('@/views/PermisHauturierView.vue') },
    { path: '/permis-bateau/fluvial',      name: 'permis-fluvial',    component: () => import('@/views/PermisFluvialView.vue') },
    { path: '/contact',                    name: 'contact',           component: () => import('@/views/ContactView.vue') },
    { path: '/admin',                      name: 'admin',             component: () => import('@/views/admin/AdminView.vue') },
    { path: '/:pathMatch(.*)*',            redirect: '/' },
  ],
})

export default router
