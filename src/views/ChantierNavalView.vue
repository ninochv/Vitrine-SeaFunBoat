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

  <section style="padding-top:120px; padding-bottom:96px;">
    <div class="container-x">
      <div class="section-num">N°02 · Tous nos services</div>
      <h2 class="display-2" style="margin-top:14px;">En détail.</h2>
      <div class="service-grid" style="margin-top:48px;">
        <div v-for="card in serviceCards" :key="card.photoLabel" class="service-card" @click="openLightbox(card)">
          <div class="bg" :style="`background-image:url('${card.photo}')`"></div>
          <div class="overlay"></div>
          <span class="photo-label">{{ card.photoLabel }}</span>
          <div class="content">
            <div class="service-name" v-html="card.label"></div>
            <div class="service-desc">{{ card.desc }}</div>
          </div>
          <div class="zoom-hint">&#x2922;</div>
        </div>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <div v-if="lightbox" class="lb-backdrop" @click.self="closeLightbox" @keydown.esc="closeLightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Fermer">✕</button>
          <div class="lb-inner">
            <img :src="lightbox.photo" :alt="lightbox.photoLabel" class="lb-img" />
            <div class="lb-caption">
              <span class="lb-label" v-html="lightbox.label"></span>
              <span class="lb-desc">{{ lightbox.desc }}</span>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </section>

  <section style="padding-top:0; padding-bottom:80px;">
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

<script setup lang="ts">
import { ref } from 'vue'

interface ServiceCard { label: string; desc: string; photoLabel: string; photo: string }

const lightbox = ref<ServiceCard | null>(null)
function openLightbox(card: ServiceCard) {
  lightbox.value = card
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.value = null
  document.body.style.overflow = ''
}

const serviceCards = [
  { label: 'Moteur',                        desc: 'Révision, réparation, entretien',                         photoLabel: 'PHOTO · moteur',       photo: '/img/services/motor.jpg' },
  { label: 'Selleries',                     desc: 'Pose et réparation tauds, biminis, capotes et selleries', photoLabel: 'PHOTO · sellerie',      photo: '/img/services/sellerie-entretien.jpg' },
  { label: 'Revêtements<br/>antidérapants', desc: 'Pose de revêtements résistants et durables',              photoLabel: 'PHOTO · revêtement',    photo: '/img/services/revetement-sol-entretien.jpg' },
  { label: 'Accastillage',                  desc: 'Pose et entretien',                                       photoLabel: 'PHOTO · accastillage',  photo: '/img/services/accastillage-entretien.jpg' },
  { label: 'Électricité<br/>Électronique',  desc: 'Installation, maintenance, réparation',                   photoLabel: 'PHOTO · électronique',  photo: '/img/services/electricite-electronique.jpg' },
  { label: 'Menuiserie',                    desc: 'Travaux bois et composites',                              photoLabel: 'PHOTO · menuiserie',    photo: '/img/services/bois-entretien.jpg' },
  { label: 'Coque',                         desc: 'Réparation gel-coat · Lustrage de coque',                 photoLabel: 'PHOTO · coque',         photo: '/img/services/lustrage-coque.jpg' },
  { label: 'Nettoyage<br/>Tauds, Sellerie', desc: 'Nettoyage professionnel',                                 photoLabel: 'PHOTO · nettoyage',     photo: '/img/services/bimini-entretien.jpg' },
  { label: 'Hivernage /<br/>Stationnement', desc: 'Au sec et à l\'abri',                                     photoLabel: 'PHOTO · hivernage',     photo: '/img/hivernage.jpg' },
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
.zoom-hint { position:absolute; top:12px; left:12px; font-size:18px; color:rgba(255,255,255,0.5); transition:color 0.2s; pointer-events:none; }
.service-card:hover .zoom-hint { color:rgba(255,255,255,0.9); }
.service-card { cursor:pointer; }

/* Lightbox */
.lb-backdrop { position:fixed; inset:0; z-index:200; background:rgba(6,41,66,0.92); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:24px; }
.lb-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#fff; font-size:24px; cursor:pointer; opacity:0.7; transition:opacity 0.2s; z-index:201; }
.lb-close:hover { opacity:1; }
.lb-inner { display:flex; flex-direction:column; align-items:center; max-width:min(90vw, 1100px); max-height:90vh; }
.lb-img { max-width:100%; max-height:75vh; object-fit:contain; border-radius:12px; box-shadow:0 24px 80px rgba(0,0,0,0.6); }
.lb-caption { margin-top:20px; text-align:center; color:#fff; }
.lb-label { display:block; font-family:var(--font-display,'Bricolage Grotesque',sans-serif); font-size:22px; font-weight:700; letter-spacing:-0.01em; }
.lb-desc { display:block; margin-top:6px; font-size:14px; color:rgba(255,255,255,0.65); }
</style>
