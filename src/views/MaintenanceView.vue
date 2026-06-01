<template>
  <section style="padding-top:32px; padding-bottom:24px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span>
        <RouterLink :to="{ name: 'chantier' }">Chantier naval</RouterLink><span>›</span>
        <span style="color:var(--ink);">Maintenance</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°03·A · Maintenance & dépannage</div>
          <h1 class="display-1" style="margin-top:14px;">Entretenir,<br/><em>réparer</em>.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Vous recherchez un professionnel de l'entretien de bateaux aux Issambres ? Sea Fun Boat met à votre disposition son expertise dans l'entretien et la réparation. Dépannage 7 j/7, à flot ou à sec.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container-x">
      <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/7; min-height:280px; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/maintenance..jpg'); background-size:cover; background-position:center;">
        <div class="photo-slot__corner">PHOTO 01 · mécanique</div>
        <div class="photo-slot__cap">Atelier mécanique — banc d'essai moteur hors-bord</div>
      </div>
    </div>
  </section>

  <section style="padding-top:96px;">
    <div class="container-x">
      <div class="section-num">N°01 · Nos services</div>
      <h2 class="display-2" style="margin-top:14px;">Nos services en détail.</h2>
      <div class="grid grid-cols-12 gap-x-8 gap-y-0" style="margin-top:56px;">

        <article v-for="s in services" :key="s.num" :class="s.full ? 'col-span-12' : 'col-span-12 md:col-span-6'" style="padding:32px 0; border-top:1px solid var(--rule);" :style="s.full ? 'border-bottom:1px solid var(--rule)' : ''">
          <div class="flex items-baseline gap-4">
            <div class="serif" style="font-size:48px; line-height:1; color:var(--teal);">{{ s.num }}</div>
            <h3 class="serif" style="font-size:30px; line-height:1.1;">{{ s.title }}</h3>
          </div>
          <p style="margin-top:14px; color:var(--ink-2); line-height:1.7; max-width:48ch;">{{ s.desc }}</p>
        </article>

      </div>
    </div>
  </section>

  <section style="padding-top:120px; padding-bottom:40px;">
    <div class="container-x">
      <div class="section-num">N°02 · Procédure</div>
      <h2 class="display-2" style="margin-top:14px;">De l'appel à la facture.</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10" style="margin-top:56px;">
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">01</div>
          <h3 style="margin-top:10px; font-weight:600;">Diagnostic</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Vous nous décrivez le problème. On passe au bateau ou on vous demande de venir au chantier — 0 € de diagnostic chez nous.</p>
        </div>
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">02</div>
          <h3 style="margin-top:10px; font-weight:600;">Devis détaillé</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Sous 48 h, devis ligne par ligne : pièces, main d'œuvre, délai. Aucun travail ne démarre sans votre accord écrit.</p>
        </div>
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">03</div>
          <h3 style="margin-top:10px; font-weight:600;">Restitution</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Essai en mer avec vous au retour, garantie 6 mois sur la main d'œuvre, 1 an sur les pièces neuves.</p>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:80px;">
    <div class="container-x">
      <div style="background:var(--paper); border:1px solid var(--rule); padding:48px;">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 md:col-span-8">
            <h2 class="display-3">Une réparation à prévoir ?</h2>
            <p style="margin-top:12px; color:var(--ink-2); line-height:1.6;">Notre équipe vous rappelle dans la journée — devis gratuit sous 48 h.</p>
          </div>
          <div class="col-span-12 md:col-span-4 md:text-right flex flex-col gap-2 md:items-end">
            <a href="tel:0617284047" class="btn btn-rust">Dépannage : 06 17 28 40 47</a>
            <RouterLink :to="{ name: 'contact' }" class="btn btn-ghost">Demander un devis</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  { num: 'A·1', title: 'Entretien moteur inboard & hors-bord', desc: 'Révision, réparation et entretien de moteurs toutes marques. Nos experts qualifiés assurent le bon fonctionnement et la performance optimale de votre moteur, de la simple révision à la réparation complexe.', full: false },
  { num: 'A·2', title: 'Dépannage 7 j/7, à flot ou à sec',    desc: 'Assistance en mer et remorquage si nécessaire. De l\'électricité au revêtement de sol, en passant par la sellerie nautique et les travaux bois, nous prenons en charge chaque aspect de votre embarcation.', full: false },
  { num: 'A·3', title: 'Tauds, biminis, capotes & selleries',  desc: 'Pose d\'équipements de protection et réparation de vos équipements de confort. De la simple réparation de sellerie à la pose complète de tauds, biminis et capotes — prestations de qualité dans le Var.', full: false },
  { num: 'A·4', title: 'Revêtements antidérapants',            desc: 'Sécurisation du pont par la pose de revêtements antidérapants résistants et durables. Méthodes d\'application efficaces pour réduire le risque de glissade, à l\'intérieur comme à l\'extérieur de l\'embarcation.', full: false },
  { num: 'A·5', title: 'Accastillage',                         desc: 'Entretien, vérification et remplacement de vos équipements d\'accastillage. Pose d\'équipements neufs pour bénéficier des dernières avancées technologiques et optimiser les performances de votre bateau.', full: false },
  { num: 'A·6', title: 'Électricité & électronique',           desc: 'Installation, maintenance et réparation d\'équipements électroniques et électriques marins. GPS, sondeur, VHF, AIS, pompe de cale, compteur de chaîne — intervention directement sur votre bateau.', full: false },
  { num: 'A·7', title: 'Travaux bois & composites',            desc: 'Réparation de matériaux composites et réfection de coque en bois. Évaluation précise des dégâts après collision ou tempête — dommages superficiels ou structurels — et devis sous 48 h.', full: false },
  { num: 'A·8', title: 'Réparation gel-coat & lustrage',       desc: 'Réparations précises du gelcoat et lustrage professionnel de la coque. Usures, chocs, impacts — notre équipe redonne à votre bateau son éclat d\'origine et assure une protection durable contre les éléments marins.', full: false },
  { num: 'A·9', title: 'Nettoyage de tauds, selleries & accessoires', desc: 'Nettoyage professionnel de tauds, selleries, coussins, bâches et autres accessoires. Produits et méthodes adaptés pour éliminer les taches, saletés incrustées et odeurs indésirables — profitez de chaque sortie dans un environnement impeccable.', full: true },
]
</script>
