<template>
  <section style="padding-top:32px; padding-bottom:24px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Chantier naval</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°03 · Chantier naval</div>
          <h1 class="display-1" style="margin-top:14px;">L'atelier.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Tout ce qui touche votre bateau, de la sortie d'eau à la révision moteur, passe entre les mains des mêmes mécaniciens, dans le même hangar, depuis 1985.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container-x">
      <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/7; min-height:300px; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/chantier-navale.png'); background-size:cover; background-position:center;">
        <div class="photo-slot__corner">PHOTO 01 · atelier</div>
        <div class="photo-slot__cap">Vue d'atelier · pont roulant et zone de mécanique</div>
      </div>
    </div>
  </section>

  <section style="padding-top:96px;">
    <div class="container-x">
      <div class="section-num">N°01 · Deux savoir-faire</div>
      <h2 class="display-2" style="margin-top:14px;">Maintenance &<br/><em>hivernage</em>.</h2>
    </div>
  </section>

  <section style="padding-top:48px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-x-8 gap-y-12">
        <article class="col-span-12 md:col-span-6">
          <RouterLink :to="{ name: 'maintenance' }">
            <div class="photo-slot photo-slot--photo" style="aspect-ratio:4/3; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('https://images.unsplash.com/photo-1505228901882-07e0b6d97db4?auto=format&fit=crop&w=800&q=80');">
              <div class="photo-slot__corner">PHOTO · mécanique</div>
              <div class="photo-slot__cap">Révision Selva 250 CV — démonté pour entretien annuel</div>
            </div>
          </RouterLink>
          <div style="padding-top:22px;">
            <div class="kicker">A · Sous-page</div>
            <h3 class="serif" style="font-size:42px; line-height:1; margin-top:8px;">Maintenance</h3>
            <p style="margin-top:12px; color:var(--ink-2); line-height:1.7; max-width:48ch;">Entretien moteur, électronique, accastillage, peinture, dépannage 7 j / 7. Toutes marques. Devis sous 48 h, intervention au port ou au chantier.</p>
            <RouterLink :to="{ name: 'maintenance' }" class="btn-link" style="display:inline-block; margin-top:18px;">Voir les prestations →</RouterLink>
          </div>
        </article>

        <article class="col-span-12 md:col-span-6">
          <RouterLink :to="{ name: 'hivernage' }">
            <div class="photo-slot photo-slot--photo" style="aspect-ratio:4/3; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/hivernage.jpg'); background-size:cover; background-position:center;">
              <div class="photo-slot__corner">PHOTO · hivernage</div>
              <div class="photo-slot__cap">Hangar couvert — bateaux sur bers, hiver 2024</div>
            </div>
          </RouterLink>
          <div style="padding-top:22px;">
            <div class="kicker">B · Sous-page</div>
            <h3 class="serif" style="font-size:42px; line-height:1; margin-top:8px;">Hivernage</h3>
            <p style="margin-top:12px; color:var(--ink-2); line-height:1.7; max-width:48ch;">Stockage à terre, sous hangar couvert ou à flot. Programme d'hivernage moteur complet, antifouling, polish, remise à l'eau au printemps.</p>
            <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn-link" style="display:inline-block; margin-top:18px;">Réserver son emplacement →</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section style="padding-top:120px;">
    <div class="container-x">
      <div style="background:var(--ink); color:var(--cream); padding:48px;">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 md:col-span-8">
            <div class="kicker" style="color:var(--teal-light);">— Devis sous 48 h</div>
            <h2 class="display-3" style="color:var(--cream); margin-top:10px;">Une panne, un projet, un avis ?</h2>
            <p style="margin-top:14px; color:rgba(244,239,230,0.75); max-width:48ch; line-height:1.6;">Décrivez votre bateau et le besoin. On vous rappelle dans la journée pour cadrer le devis.</p>
          </div>
          <div class="col-span-12 md:col-span-4 md:text-right">
            <RouterLink :to="{ name: 'contact' }" class="btn btn-rust">Demander un devis</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
