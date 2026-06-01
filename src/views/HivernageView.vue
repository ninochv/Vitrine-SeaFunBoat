<template>
  <section style="padding-top:32px; padding-bottom:24px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span>
        <RouterLink :to="{ name: 'chantier' }">Chantier naval</RouterLink><span>›</span>
        <span style="color:var(--ink);">Hivernage</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°03·B · Hivernage & stationnement</div>
          <h1 class="display-1" style="margin-top:14px;">Hivernage,<br/><em>au sec</em>.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Stockage à terre sous hangar couvert ou à flot. Programme d'hivernage moteur complet, antifouling, polish — remise à l'eau clé en main au printemps.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container-x">
      <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/7; min-height:280px; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/hivernage.jpg'); background-size:cover; background-position:center;">
        <div class="photo-slot__corner">PHOTO 01 · hangar</div>
        <div class="photo-slot__cap">Hangar couvert — bateaux sur bers, stockage à sec</div>
      </div>
    </div>
  </section>

  <section style="padding-top:96px;">
    <div class="container-x">
      <div class="section-num">N°01 · Nos formules</div>
      <h2 class="display-2" style="margin-top:14px;">Choisissez votre formule.</h2>
      <div class="grid grid-cols-12 gap-x-8 gap-y-0" style="margin-top:56px;">

        <article v-for="s in formules" :key="s.num" class="col-span-12 md:col-span-6" style="padding:32px 0; border-top:1px solid var(--rule);">
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
      <h2 class="display-2" style="margin-top:14px;">De la sortie d'eau au printemps.</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10" style="margin-top:56px;">
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">01</div>
          <h3 style="margin-top:10px; font-weight:600;">Sortie d'eau</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Levage par grue ou chariot élévateur. Transport jusqu'à l'emplacement dédié dans le hangar ou en extérieur.</p>
        </div>
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">02</div>
          <h3 style="margin-top:10px; font-weight:600;">Hivernage moteur</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Vidange, rinçage circuit eau de mer, antigel, protection des pièces sensibles. Bateau prêt à repartir au printemps.</p>
        </div>
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">03</div>
          <h3 style="margin-top:10px; font-weight:600;">Entretien hivernal</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Antifouling, polish coque, vérification accastillage — profitez de l'hiver pour remettre le bateau en état avant la saison.</p>
        </div>
        <div>
          <div class="serif tnum" style="font-size:60px; line-height:1; color:var(--teal);">04</div>
          <h3 style="margin-top:10px; font-weight:600;">Remise à l'eau</h3>
          <p style="margin-top:8px; font-size:14px; color:var(--ink-2); line-height:1.6;">Mise à l'eau coordonnée avec votre planning de navigation. Essai moteur avant restitution.</p>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:80px;">
    <div class="container-x">
      <div style="background:var(--paper); border:1px solid var(--rule); padding:48px;">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 md:col-span-8">
            <h2 class="display-3">Réserver un emplacement</h2>
            <p style="margin-top:12px; color:var(--ink-2); line-height:1.6;">Places limitées — réservez avant le 1er novembre pour garantir votre emplacement sous hangar couvert.</p>
          </div>
          <div class="col-span-12 md:col-span-4 md:text-right flex flex-col gap-2 md:items-end">
            <a href="tel:0617284047" class="btn btn-rust">Appeler : 06 17 28 40 47</a>
            <RouterLink :to="{ name: 'contact' }" class="btn btn-ghost">Demander un devis</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const formules = [
  { num: 'B·1', title: 'Hangar couvert',      desc: 'Stockage à l\'abri des intempéries dans notre hangar fermé. Solution idéale pour protéger la coque, la sellerie et les équipements électroniques pendant la saison froide.' },
  { num: 'B·2', title: 'Extérieur sur bers',  desc: 'Stationnement sécurisé à l\'extérieur sur bers adaptés à la taille de votre bateau. Bâche de protection fournie sur demande. Tarif économique.' },
  { num: 'B·3', title: 'Hivernage complet',   desc: 'Formule tout compris : sortie d\'eau, hivernage moteur, antifouling, polish et remise à l\'eau au printemps. Un interlocuteur unique pour toute la saison.' },
  { num: 'B·4', title: 'Stationnement annuel', desc: 'Emplacement à l\'année pour les propriétaires qui souhaitent un accès régulier à leur bateau hors saison. Accès 7 j / 7 sur rendez-vous.' },
]
</script>
