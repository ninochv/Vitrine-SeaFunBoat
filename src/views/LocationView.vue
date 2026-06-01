<template>
  <!-- PAGE HEAD -->
  <section style="padding-top:32px; padding-bottom:48px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Location</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°01 · Location de bateaux</div>
          <h1 class="display-1" style="margin-top:14px;">Notre flotte.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Des bateaux entretenus quotidiennement par notre chantier, prêts à partir d'Issambres ou de Sainte-Maxime.</p>
        </div>
      </div>
      <div class="rule" style="margin-top:36px;"></div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6" style="padding-top:24px;">
        <div>
          <div class="serif tnum" style="font-size:52px; line-height:1;">
            {{ store.loading ? '—' : store.boats.length.toString().padStart(2, '0') }}
          </div>
          <div class="kicker" style="margin-top:6px;">Bateaux</div>
        </div>
        <div>
          <div class="serif tnum" style="font-size:52px; line-height:1;">
            {{ store.loading ? '—' : maxCapacity }}
          </div>
          <div class="kicker" style="margin-top:6px;">Capacité max</div>
        </div>
        <div><div class="serif tnum" style="font-size:52px; line-height:1;">02</div><div class="kicker" style="margin-top:6px;">Ports de départ</div></div>
        <div><div class="serif tnum" style="font-size:52px; line-height:1;">40<span style="font-size:24px;"> ans</span></div><div class="kicker" style="margin-top:6px;">À votre service</div></div>
      </div>
    </div>
  </section>

  <!-- INFO BOX -->
  <section style="padding-top:40px; padding-bottom:30px;">
    <div class="container-x">
      <div style="border:1.5px solid var(--rust); border-radius:6px; padding:28px 32px; background:#fff8f5;">
        <div class="kicker" style="color:var(--rust); margin-bottom:14px;">Informations importantes avant de louer votre bateau à coque rigide</div>
        <ul style="font-size:14px; line-height:2; color:var(--ink-2);">
          <li>· Permis bateau (selon prestation) valide</li>
          <li>· Pièce d'identité du titulaire du contrat ET du chef de bord (si celui-ci est différent)</li>
          <li>· Autorisation parentale (si mineur)</li>
          <li>· Acompte pour validation de la réservation, puis solde sur place avant réalisation de la prestation</li>
          <li>· Caution sur place par empreinte bancaire (variable selon la prestation : 500 € à 3 000 €)</li>
        </ul>
        <p style="margin-top:14px; font-size:13px; font-weight:600; color:var(--rust);">Sans ces éléments VALIDES nous ne pourrons aboutir à votre demande et nous nous verrons conserver votre dépôt d'acompte.</p>
      </div>
    </div>
  </section>

  <!-- FILTERS (sticky) -->
  <section style="padding-bottom:24px; position:sticky; top:78px; z-index:30; background:var(--cream); border-bottom:1px solid var(--rule);">
    <div class="container-x" style="padding-top:18px; padding-bottom:18px;">
      <div class="flex flex-col gap-3">
        <!-- Ligne 1 : emplacement + permis -->
        <div class="flex flex-wrap gap-6 items-center">
          <!-- Filtre emplacement (si plusieurs) -->
          <template v-if="store.uniqueLocations.length > 1">
            <div class="flex flex-wrap gap-2 items-center">
              <span class="kicker" style="margin-right:6px;">Base</span>
              <button
                class="chip"
                :class="{ 'is-active': store.filterLocationId === 'all' }"
                @click="store.setLocationFilter('all')"
              >Toutes</button>
              <button
                v-for="loc in store.uniqueLocations"
                :key="loc.id"
                class="chip"
                :class="{ 'is-active': store.filterLocationId === loc.id }"
                @click="store.setLocationFilter(loc.id)"
              >{{ loc.name }}</button>
            </div>
          </template>

          <div class="flex flex-wrap gap-2 items-center">
            <span class="kicker" style="margin-right:6px;">Permis</span>
            <button
              v-for="opt in licenseOpts" :key="opt.value"
              class="chip"
              :class="{ 'is-active': store.filterLicense === opt.value }"
              @click="store.setLicenseFilter(opt.value)"
            >{{ opt.label }}</button>
          </div>
        </div>

        <!-- Ligne 2 : tri -->
        <div class="flex flex-wrap gap-2 items-center">
          <span class="kicker" style="margin-right:6px;">Tri</span>
          <select class="field" style="padding:8px 12px; width:auto;" @change="store.setSortBy(($event.target as HTMLSelectElement).value as any)">
            <option value="default">Suggéré</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="power">Puissance</option>
            <option value="capacity">Capacité</option>
          </select>
        </div>
      </div>
    </div>
  </section>

  <!-- LIST -->
  <section style="padding-top:48px; padding-bottom:48px;">
    <div class="container-x">

      <!-- Loading -->
      <div v-if="store.loading" style="padding:80px 0; text-align:center; color:var(--ink-soft);">
        <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; font-family:var(--font-mono);">Chargement de la flotte…</div>
      </div>

      <!-- Error -->
      <div v-else-if="store.error" style="padding:80px 0; text-align:center;">
        <div class="kicker" style="color:var(--rust); margin-bottom:8px;">Impossible de charger la flotte</div>
        <p style="font-size:14px; color:var(--ink-soft);">{{ store.error }}</p>
        <button class="btn btn-rust" style="margin-top:24px;" @click="store.loadFleet()">Réessayer</button>
      </div>

      <!-- Results -->
      <template v-else>
        <div class="kicker" style="margin-bottom:24px;">
          {{ store.groupedBoats.length }} modèle{{ store.groupedBoats.length > 1 ? 's' : '' }} disponible{{ store.groupedBoats.length > 1 ? 's' : '' }}
        </div>
        <div v-if="store.groupedBoats.length" class="flex flex-col gap-8">
          <FleetCard v-for="group in store.groupedBoats" :key="group.name" :group="group" />
        </div>
        <div v-else style="padding:80px 0; text-align:center; color:var(--ink-soft);">Aucun bateau ne correspond à ces critères.</div>
      </template>

    </div>
  </section>

  <!-- EXPLAINER -->
  <section style="padding-top:80px; padding-bottom:80px; background:var(--paper); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule);">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-4"><div class="section-num">N°02 · Vocabulaire</div><h2 class="display-3" style="margin-top:14px;">Rigide<br/><em>ou semi-rigide</em> ?</h2></div>
        <div class="col-span-12 md:col-span-4"><h3 class="kicker">Coque rigide</h3><p style="margin-top:10px; font-size:15px; line-height:1.7; color:var(--ink-2);">Coque entièrement en composite. Confort de mer dans la houle, espaces aménagés (cabine, douchette), idéal pour une journée complète au mouillage.</p><ul style="margin-top:14px; font-size:14px; line-height:1.8; color:var(--ink-2);"><li>· Plus stable au mouillage</li><li>· Cabine et rangements possibles</li><li>· Recommandée pour la journée et plus</li></ul></div>
        <div class="col-span-12 md:col-span-4"><h3 class="kicker">Semi-rigide</h3><p style="margin-top:10px; font-size:15px; line-height:1.7; color:var(--ink-2);">Carène rigide + flotteurs gonflables sur le pourtour. Plus léger, plus vif, plus joueur. Parfait pour la sortie sportive en groupe.</p><ul style="margin-top:14px; font-size:14px; line-height:1.8; color:var(--ink-2);"><li>· Accélérations plus franches</li><li>· Sécurité accrue à l'embarquement</li><li>· Recommandé pour la baignade et la balade</li></ul></div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section style="padding-top:96px; padding-bottom:96px;">
    <div class="container-x">
      <div class="section-num">N°03 · Procédure</div>
      <h2 class="display-2" style="margin-top:14px;">Comment ça se passe.</h2>
      <div class="grid grid-cols-12 gap-x-6 gap-y-10" style="margin-top:56px;">
        <div class="col-span-12 md:col-span-3"><div class="serif" style="font-size:64px; line-height:1; color:var(--teal);">01</div><h3 style="margin-top:12px; font-weight:600;">Vous réservez</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">En ligne ou par téléphone. Acompte 30 % pour bloquer la date, solde au départ.</p></div>
        <div class="col-span-12 md:col-span-3"><div class="serif" style="font-size:64px; line-height:1; color:var(--teal);">02</div><h3 style="margin-top:12px; font-weight:600;">Brief sécurité</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">30 min de prise en main, balisage, météo, manœuvres au port, gilets et équipement.</p></div>
        <div class="col-span-12 md:col-span-3"><div class="serif" style="font-size:64px; line-height:1; color:var(--teal);">03</div><h3 style="margin-top:12px; font-weight:600;">Vous naviguez</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Téléphone d'assistance dans le sac de bord. Conseils de coins préférés pour chaque vent.</p></div>
        <div class="col-span-12 md:col-span-3"><div class="serif" style="font-size:64px; line-height:1; color:var(--teal);">04</div><h3 style="margin-top:12px; font-weight:600;">Retour au port</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Caution restituée immédiatement après contrôle du bateau. Café offert.</p></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFleetStore } from '@/stores/fleetStore'
import FleetCard from '@/components/fleet/FleetCard.vue'

const store = useFleetStore()

const licenseOpts = [
  { value: 'all'  as const, label: 'Tous' },
  { value: 'avec' as const, label: 'Avec permis' },
  { value: 'sans' as const, label: 'Sans permis' },
]

const maxCapacity = computed(() =>
  store.boats.reduce((max, b) => Math.max(max, b.capacity), 0)
)

onMounted(() => store.loadFleet())
</script>
