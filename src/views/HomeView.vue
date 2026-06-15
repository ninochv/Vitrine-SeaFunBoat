<template>
  <!-- ===== HERO ===== -->
  <section class="sun-gradient" style="padding-top:48px; padding-bottom:64px; position:relative; overflow:hidden;">
    <div style="position:absolute; top:60px; right:-80px; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(255,210,140,0.55), transparent 70%); pointer-events:none;"></div>
    <div style="position:absolute; bottom:-120px; left:-100px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle, rgba(139,221,237,0.5), transparent 70%); pointer-events:none;"></div>
    <div class="container-x" style="position:relative;">
      <div class="max-w-4xl">
        <h1 class="display-1">La référence en terme de bateaux à moteurs</h1>
        <p class="lede" style="margin-top:28px;">Forte de plusieurs années d'expérience, notre équipe se fera un plaisir de vous accueillir sur le Port des Issambres ou de Sainte-Maxime.<br/><br/>Nous ferons en sorte que votre sortie en mer vous soit des plus mémorables.</p>
        <div class="flex flex-wrap gap-3" style="margin-top:32px;">
          <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust">
            Réserver une sortie
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:18px; height:18px;"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <RouterLink :to="{ name: 'location' }" class="btn btn-ghost">Voir la flotte</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 01 LOCATION ===== -->
  <section style="padding-top:80px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-10 gap-y-8 items-center">
        <div class="col-span-12 md:col-span-7">
          <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/10; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/Location.png'); background-size:cover; background-position:center;">
            <div class="photo-slot__corner">01 · Location</div>
            <div class="photo-slot__cap">Semi-rigide Marlin 915 en sortie de port</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-5">
          <div class="kicker">N°01 — Location</div>
          <h3 class="display-3" style="margin-top:10px;">Location de bateau.</h3>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7;">Bateaux entretenus par nos soins. <strong>Semi-rigide, open ou cabin cruiser</strong>, prenez le cap à la journée sur notre belle Méditerranée.</p>
          <ul style="margin-top:18px; font-size:14px; line-height:1.9; color:var(--ink-2);">
            <li>· Capacités allant jusqu'à 14 personnes à bord</li>
            <li>· Motorisation de 100 à 300 CV</li>
            <li>· Brief sécurité de 30 min inclus</li>
            <li>· Carte météo et coins préférés transmis avant le départ</li>
          </ul>
          <div class="flex flex-wrap gap-3" style="margin-top:24px;">
            <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust">Réserver une sortie</a>
            <RouterLink :to="{ name: 'location' }" class="btn-link">Voir toute la flotte →</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 02 PERMIS ===== -->
  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-10 gap-y-8 items-center">
        <div class="col-span-12 md:col-span-5 md:order-2">
          <div class="photo-slot photo-slot--photo" style="aspect-ratio:4/5; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/boat-driver.jpg'); background-size:cover; background-position:center;">
            <div class="photo-slot__corner">02 · École</div>
            <div class="photo-slot__cap">Élève à la barre — examen pratique, baie de Sainte-Maxime</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-7 md:order-1">
          <div class="kicker">N°02 — Permis bateau</div>
          <h3 class="display-3" style="margin-top:10px;">Bateau-école.</h3>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7;">Trois titres préparés sur place : <strong>côtier, hauturier, fluvial</strong>. Des moniteurs maison, un bateau et une salle de cours dédiés à la formation.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" style="margin-top:22px;">
            <RouterLink :to="{ name: 'permis-cotier' }" class="card" style="padding:18px; transition:transform 200ms;"><div class="kicker">A · Le classique</div><div class="serif" style="font-size:22px; line-height:1.1; margin-top:6px;">Côtier</div><div class="mono" style="font-size:11px; color:var(--ink-soft); margin-top:8px;">dès 450 €</div></RouterLink>
            <RouterLink :to="{ name: 'permis-hauturier' }" class="card" style="padding:18px;"><div class="kicker">B · Le supérieur</div><div class="serif" style="font-size:22px; line-height:1.1; margin-top:6px;">Hauturier</div><div class="mono" style="font-size:11px; color:var(--ink-soft); margin-top:8px;">dès 650 €</div></RouterLink>
            <RouterLink :to="{ name: 'permis-fluvial' }" class="card" style="padding:18px;"><div class="kicker">C · Eaux Intérieures</div><div class="serif" style="font-size:22px; line-height:1.1; margin-top:6px;">Extension Fluvial</div><div class="mono" style="font-size:11px; color:var(--ink-soft); margin-top:8px;">dès 150 €</div></RouterLink>
          </div>
          <RouterLink :to="{ name: 'permis' }" class="btn-link" style="display:inline-block; margin-top:22px;">Tous les permis →</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 03 VENTE ===== -->
  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-10 gap-y-8 items-center">
        <div class="col-span-12 md:col-span-7">
          <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/10; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/boat-sales.png'); background-size:cover; background-position:center;">
            <div class="photo-slot__corner">03 · Vente</div>
            <div class="photo-slot__cap">Salon nautique — stand Marlin Boat, Salon Nautique de Paris</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-5">
          <div class="kicker">N°03 — Vente</div>
          <h3 class="display-3" style="margin-top:10px;">Neuf & occasion.</h3>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7;">Concessionnaire officiel <strong>SELVA MARINE, Marlin Boat et Protagon</strong>. Bateaux neufs configurables sur catalogue et un parc d'occasions <strong>vérifiées dans notre atelier</strong> avant mise en vente.</p>
          <ul style="margin-top:18px; font-size:14px; line-height:1.9; color:var(--ink-2);">
            <li>· Bateau neuf à la demande</li>
            <li>· Bateau d'occasion régulièrement en vente</li>
            <li>· Visite & essai en mer sur rendez-vous</li>
            <li>· Financement étudié avec nos partenaires</li>
          </ul>
          <div class="flex flex-wrap gap-3" style="margin-top:24px;">
            <RouterLink :to="{ name: 'vente' }" class="btn btn-navy">Parcourir les annonces</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 04 CHANTIER ===== -->
  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-10 gap-y-8 items-center">
        <div class="col-span-12 md:col-span-5 md:order-2">
          <div class="photo-slot photo-slot--photo" style="aspect-ratio:4/5; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/chantier-navale.png'); background-size:cover; background-position:center;">
            <div class="photo-slot__corner">04 · Atelier</div>
            <div class="photo-slot__cap">Atelier — révision hors-bord Yamaha 250 CV, mars 2025</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-7 md:order-1">
          <div class="kicker">N°04 — Chantier naval</div>
          <h3 class="display-3" style="margin-top:10px;">L'atelier maison.</h3>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7;">Vos bateaux chouchoutés sur notre terrain d'hivernage. <strong>Maintenance, hivernage, entretien, dépannage de toutes marques.</strong> Atelier sellerie également.</p>
          <div class="grid grid-cols-2 gap-3" style="margin-top:22px;">
            <RouterLink :to="{ name: 'maintenance' }" class="card" style="padding:20px;"><div class="kicker">A · Tous les jours</div><div class="serif" style="font-size:22px; line-height:1.1; margin-top:6px;">Maintenance</div><p style="margin-top:8px; font-size:13px; color:var(--ink-soft); line-height:1.5;">Révision moteur, électronique, peinture, accastillage.</p></RouterLink>
            <RouterLink :to="{ name: 'hivernage' }" class="card" style="padding:20px;"><div class="kicker">B · Saison froide</div><div class="serif" style="font-size:22px; line-height:1.1; margin-top:6px;">Hivernage</div><p style="margin-top:8px; font-size:13px; color:var(--ink-soft); line-height:1.5;">Stockage sur notre terrain d'hivernage ou à flot. 3 formules.</p></RouterLink>
          </div>
          <RouterLink :to="{ name: 'chantier' }" class="btn-link" style="display:inline-block; margin-top:22px;">Découvrir l'atelier →</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 05 EXTRAS ===== -->
  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-10 gap-y-8 items-center">
        <div class="col-span-12 md:col-span-7">
          <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/10; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/Extra.jpg'); background-size:cover; background-position:center;">
            <div class="photo-slot__corner">05 · Extras</div>
            <div class="photo-slot__cap">Bouée tractée à 25 nœuds — un classique de l'été</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-5">
          <div class="kicker">N°05 — Services extra</div>
          <h3 class="display-3" style="margin-top:10px;">Pour la rigolade.</h3>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7;">Accessoires nautiques à louer avec votre bateau : <strong>bouée tractée, ski nautique, wakeboard, knee board</strong>. À ajouter directement au moment de la réservation.</p>
          <div class="grid grid-cols-2 gap-x-4 gap-y-3" style="margin-top:20px;">
            <div class="flex items-baseline justify-between" style="padding:10px 0; border-bottom:1px solid var(--rule-soft);"><span style="font-weight:600;">Bouée tractée · 1 place</span><span class="mono tnum" style="font-size:13px; color:var(--ink-soft);">30 €</span></div>
            <div class="flex items-baseline justify-between" style="padding:10px 0; border-bottom:1px solid var(--rule-soft);"><span style="font-weight:600;">Bouée tractée · 2 places</span><span class="mono tnum" style="font-size:13px; color:var(--ink-soft);">40 €</span></div>
            <div class="flex items-baseline justify-between" style="padding:10px 0; border-bottom:1px solid var(--rule-soft);"><span style="font-weight:600;">Ski nautique</span><span class="mono tnum" style="font-size:13px; color:var(--ink-soft);">50 €</span></div>
            <div class="flex items-baseline justify-between" style="padding:10px 0; border-bottom:1px solid var(--rule-soft);"><span style="font-weight:600;">Wakeboard</span><span class="mono tnum" style="font-size:13px; color:var(--ink-soft);">50 €</span></div>
            <div class="flex items-baseline justify-between" style="padding:10px 0; border-bottom:1px solid var(--rule-soft);"><span style="font-weight:600;">Knee board</span><span class="mono tnum" style="font-size:13px; color:var(--ink-soft);">50 €</span></div>
          </div>
          <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust" style="margin-top:24px;">Ajouter à ma réservation</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== FEATURED FLEET ===== -->
  <section style="padding-top:120px; padding-bottom:80px;">
    <div class="container-x">
      <div class="flex flex-wrap items-baseline justify-between gap-4" style="margin-bottom:40px;">
        <div>
          <div class="kicker">N°06 · Sélection</div>
          <h2 class="display-2" style="margin-top:10px;">Partir maintenant.</h2>
        </div>
        <RouterLink :to="{ name: 'location' }" class="btn-link">Voir toute la flotte →</RouterLink>
      </div>
      <div v-if="fleetStore.loading" style="text-align:center; padding:60px 0; color:var(--ink-soft); font-size:14px; letter-spacing:0.08em; text-transform:uppercase; font-family:var(--font-mono);">Chargement…</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article v-for="boat in featuredBoats" :key="boat.id" class="card flex flex-col">
          <div
            class="photo-slot photo-slot--photo"
            style="aspect-ratio:5/4; background-size:cover; background-position:center;"
            :style="boat.image_url
              ? `background-image:linear-gradient(rgba(6,41,66,0.05),rgba(6,41,66,0.4)),url('${boat.image_url}');`
              : 'background-image:linear-gradient(135deg,var(--ocean-deep) 0%,var(--wave) 100%);'"
          >
            <div class="photo-slot__corner">{{ boat.capacity }} pers · {{ boat.horsepower }} CV</div>
            <div class="photo-slot__cap">{{ boat.display_name }}</div>
          </div>
          <div style="padding:22px;">
            <div class="kicker">{{ boat.brand }} · {{ boat.capacity }} pers.</div>
            <h3 class="serif" style="font-size:28px; line-height:1.05; margin-top:6px;">{{ boat.display_name }}</h3>
            <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">{{ boat.description }}</p>
            <div class="dot-rule" style="margin:18px 0 14px;"></div>
            <div class="flex items-end justify-between">
              <div>
                <div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">À PARTIR DE</div>
                <div v-if="boat.pricing.length" class="serif" style="font-size:30px; line-height:1;">
                  {{ parseFloat(boat.pricing[0].price).toLocaleString('fr-FR') }} €<span style="font-size:13px; font-family:var(--font-sans); color:var(--ink-soft);"> / {{ boat.pricing[0].duration_label }}</span>
                </div>
                <div v-else class="serif" style="font-size:18px; color:var(--ink-soft);">Sur devis</div>
              </div>
              <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-navy">Réserver</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFleetStore } from '@/stores/fleetStore'

const fleetStore = useFleetStore()

const featuredBoats = computed(() => fleetStore.boats.slice(0, 3))

onMounted(() => {
  if (!fleetStore.boats.length && !fleetStore.loading) fleetStore.loadFleet()
})
</script>
