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
        <div class="kicker" style="color:var(--rust); margin-bottom:14px;">Informations importantes avant de louer votre bateau</div>
        <ul style="font-size:14px; line-height:2; color:var(--ink-2);">
          <li>· Permis bateau valide</li>
          <li>· Pièce d'identité du titulaire du contrat ET du chef de bord (si celui-ci est différent)</li>
          <li>· Autorisation parentale (si mineur)</li>
          <li>· Acompte pour validation de la réservation, puis solde sur place avant réalisation de la prestation</li>
          <li>· Caution sur place par empreinte bancaire (variable selon la prestation : 500 € à 5 000 €)</li>
        </ul>
        <p style="margin-top:14px; font-size:13px; font-weight:600; color:var(--rust);">Sans ces éléments VALIDES nous ne pourrons aboutir à votre demande et nous nous verrons conserver votre dépôt d'acompte.</p>
      </div>
    </div>
  </section>

  <!-- FILTERS (sticky) -->
  <section style="padding-bottom:24px; position:sticky; top:78px; z-index:30; background:var(--cream); border-bottom:1px solid var(--rule);">
    <div class="container-x" style="padding-top:18px; padding-bottom:18px;">
      <div class="flex flex-col gap-3">
        <!-- Ligne 1 : emplacement -->
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
        <div class="col-span-12 md:col-span-4"><h3 class="kicker">Coque rigide (open et cabin cruiser)</h3><p style="margin-top:10px; font-size:15px; line-height:1.7; color:var(--ink-2);">Franc de bord plus élevé, espace à bord mieux aménagé.</p><ul style="margin-top:14px; font-size:14px; line-height:1.8; color:var(--ink-2);"><li>· Plus de confort au mouillage</li><li>· Sécurisant pour les parents avec enfants</li></ul></div>
        <div class="col-span-12 md:col-span-4"><h3 class="kicker">Semi-rigide</h3><p style="margin-top:10px; font-size:15px; line-height:1.7; color:var(--ink-2);">Carène rigide + flotteurs gonflables sur le pourtour. Plus léger, plus vif, plus joueur. Parfait pour la sortie sportive en groupe.</p><ul style="margin-top:14px; font-size:14px; line-height:1.8; color:var(--ink-2);"><li>· Navire plus léger, donc consommation moindre</li><li>· Passage en mer plus agréable</li></ul></div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section style="padding-top:96px; padding-bottom:96px;">
    <div class="container-x">
      <div class="section-num">N°03 · Procédure</div>
      <h2 class="display-2" style="margin-top:14px;">Comment ça se passe.</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10" style="margin-top:56px;">
        <div><div class="serif" style="font-size:56px; line-height:1; color:var(--teal);">01</div><h3 style="margin-top:12px; font-weight:600;">Vous réservez</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.7;">En ligne ou par téléphone. Acompte 50 % pour bloquer la date, solde au départ.</p></div>
        <div><div class="serif" style="font-size:56px; line-height:1; color:var(--teal);">02</div><h3 style="margin-top:12px; font-weight:600;">Brief sécurité</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.7;">30 min de prise en main, balisage, météo, manœuvres au port, gilets et équipement.</p></div>
        <div><div class="serif" style="font-size:56px; line-height:1; color:var(--teal);">03</div><h3 style="margin-top:12px; font-weight:600;">Vous naviguez</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.7;">Vous profitez sereinement et de manière responsable.</p></div>
        <div><div class="serif" style="font-size:56px; line-height:1; color:var(--teal);">04</div><h3 style="margin-top:12px; font-weight:600;">Retour au port</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.7;">Un appel à notre agence 30 min avant le retour : on vous guide pour l'accostage et le complément en carburant.</p></div>
        <div><div class="serif" style="font-size:56px; line-height:1; color:var(--teal);">05</div><h3 style="margin-top:12px; font-weight:600;">Nettoyage &amp; caution</h3><p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.7;">Nettoyage du navire par notre équipe. La caution est automatiquement clôturée à l'issue si le navire est rendu dans les conditions prévues au contrat (comptez environ 24 à 48 h pour la clôture de la caution).</p></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFleetStore } from '@/stores/fleetStore'
import FleetCard from '@/components/fleet/FleetCard.vue'

const store = useFleetStore()

const maxCapacity = computed(() =>
  store.boats.reduce((max, b) => Math.max(max, b.capacity), 0)
)

onMounted(() => store.loadFleet())
</script>
