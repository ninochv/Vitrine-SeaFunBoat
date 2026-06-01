<template>
  <section style="padding-top:32px; padding-bottom:32px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Nos services</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°03 · Chantier naval</div>
          <h1 class="display-1" style="margin-top:14px;">Nos services.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Du moteur à la sellerie, de la coque à l'électronique — tout ce dont votre bateau a besoin, sous le même toit.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container-x">
      <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/7; min-height:280px; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('/img/hivernage.jpg'); background-size:cover; background-position:center;">
        <div class="photo-slot__corner">PHOTO · hivernage</div>
        <div class="photo-slot__cap">Hangar couvert — stockage à terre, hiver 2024</div>
      </div>
    </div>
  </section>

  <section style="padding-bottom:96px;">
    <div class="container-x">
      <div class="service-grid">
        <div v-for="card in serviceCards" :key="card.label" class="service-card">
          <div class="bg" :style="`background-image:url('${card.photo}')`"></div>
          <div class="overlay"></div>
          <span class="photo-label">{{ card.photoLabel }}</span>
          <div class="content">
            <div class="service-name" v-html="card.label"></div>
            <div class="service-desc">{{ card.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-bottom:96px;">
    <div class="container-x">
      <div style="background:var(--ink); color:var(--cream); padding:48px;">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 md:col-span-8">
            <div class="kicker" style="color:var(--teal-light);">— Devis sous 48 h</div>
            <h2 class="display-3" style="color:var(--cream); margin-top:10px;">Une question, un projet ?</h2>
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

<script setup lang="ts">
const serviceCards = [
  { label: 'Moteur',                      desc: 'Révision, réparation, entretien',                         photoLabel: 'PHOTO · moteur',       photo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80' },
  { label: 'Selleries',                   desc: 'Pose et réparation tauds, biminis, capotes et selleries', photoLabel: 'PHOTO · sellerie',      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80' },
  { label: 'Revêtements<br/>antidérapants', desc: 'Pose de revêtements résistants et durables',            photoLabel: 'PHOTO · revêtement',    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Accastillage',                desc: 'Pose et entretien',                                       photoLabel: 'PHOTO · accastillage',  photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  { label: 'Électricité<br/>Électronique', desc: 'Installation, maintenance, réparation',                  photoLabel: 'PHOTO · électronique',  photo: 'https://images.unsplash.com/photo-1569263979104-d88a42b4f1b2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Menuiserie',                  desc: 'Travaux bois et composites',                              photoLabel: 'PHOTO · menuiserie',    photo: 'https://images.unsplash.com/photo-1533745177687-4f2c5dcbc9e2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Coque',                       desc: 'Réparation gel-coat · Lustrage de coque',                 photoLabel: 'PHOTO · coque',         photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80' },
  { label: 'Nettoyage<br/>Tauds, Sellerie', desc: 'Nettoyage professionnel',                               photoLabel: 'PHOTO · nettoyage',     photo: 'https://images.unsplash.com/photo-1570007166718-9d67b0a30b32?auto=format&fit=crop&w=600&q=80' },
  { label: 'Hivernage /<br/>Stationnement', desc: 'Au sec et à l\'abri',                                   photoLabel: 'PHOTO · hivernage',     photo: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80' },
]
</script>

<style scoped>
.service-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3px; }
@media (max-width:768px) { .service-grid { grid-template-columns:repeat(2,1fr); } }
@media (max-width:480px) { .service-grid { grid-template-columns:1fr; } }
.service-card { position:relative; aspect-ratio:1/1; overflow:hidden; background:#1a2a2e; }
.service-card .bg { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform 0.4s ease; }
.service-card:hover .bg { transform:scale(1.05); }
.service-card .overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.2) 55%,rgba(0,0,0,0.05) 100%); }
.service-card .content { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:24px; }
.service-card .service-name { font-family:var(--font-display,'Bricolage Grotesque',sans-serif); font-size:clamp(17px,1.8vw,24px); font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#fff; line-height:1.1; }
.service-card .service-desc { margin-top:7px; font-size:clamp(12px,1.1vw,14px); color:rgba(255,255,255,0.8); line-height:1.45; }
.photo-label { position:absolute; top:12px; right:12px; font-family:var(--font-mono,'JetBrains Mono',monospace); font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); }
</style>
