<template>
  <section style="padding-top:32px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Permis bateau</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°04 · Bateau-école agréé</div>
          <h1 class="display-1" style="margin-top:14px;">Apprendre<br/>à <em>tenir une barre</em>.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Trois titulaires d'agrément, deux bateaux dédiés à la formation, des dates posées chaque semaine. Vous choisissez votre rythme.</p>
        </div>
      </div>
    </div>
  </section>

  <section style="margin-top:32px;">
    <div class="container-x">
      <div class="photo-slot photo-slot--photo" style="aspect-ratio:16/7; min-height:280px; background-image:linear-gradient(rgba(6,41,66,0.08),rgba(6,41,66,0.45)),url('https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80');">
        <div class="photo-slot__corner">PHOTO · sortie école</div>
        <div class="photo-slot__cap">Élève à la barre — sortie pratique, baie de Sainte-Maxime</div>
      </div>
    </div>
  </section>

  <section style="padding-top:96px;">
    <div class="container-x">
      <div class="section-num">N°01 · Trois titres</div>
      <h2 class="display-2" style="margin-top:14px;">Quel permis<br/><em>pour quelle navigation</em> ?</h2>
    </div>
  </section>

  <section style="padding-top:48px;">
    <div class="container-x">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink :to="{ name: 'permis-cotier' }" class="card" style="padding:32px; display:block;">
          <div class="kicker">Permis 01 · Le socle</div>
          <h3 class="serif" style="font-size:36px; line-height:1.05; margin-top:10px;">Côtier</h3>
          <p style="margin-top:10px; color:var(--ink-2); line-height:1.6; font-size:14px;">Le titre de base, obligatoire pour piloter un moteur de plus de 6 CV en mer. Jusqu'à 6 milles d'un abri.</p>
          <div class="dot-rule" style="margin:18px 0;"></div>
          <div class="flex items-baseline justify-between">
            <div><div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">À PARTIR DE</div><div class="serif tnum" style="font-size:30px; line-height:1;">450 €</div></div>
            <div class="btn-link" style="font-size:13px;">Détails →</div>
          </div>
        </RouterLink>

        <RouterLink :to="{ name: 'permis-hauturier' }" class="card" style="padding:32px; display:block;">
          <div class="kicker">Permis 02 · L'extension large</div>
          <h3 class="serif" style="font-size:36px; line-height:1.05; margin-top:10px;">Hauturier</h3>
          <p style="margin-top:10px; color:var(--ink-2); line-height:1.6; font-size:14px;">Navigation sans limite de distance. Préparation à la carte marine, marées, calculs de route.</p>
          <div class="dot-rule" style="margin:18px 0;"></div>
          <div class="flex items-baseline justify-between">
            <div><div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">À PARTIR DE</div><div class="serif tnum" style="font-size:30px; line-height:1;">650 €</div></div>
            <div class="btn-link" style="font-size:13px;">Détails →</div>
          </div>
        </RouterLink>

        <RouterLink :to="{ name: 'permis-fluvial' }" class="card" style="padding:32px; display:block;">
          <div class="kicker">Permis 03 · L'extension douce</div>
          <h3 class="serif" style="font-size:36px; line-height:1.05; margin-top:10px;">Fluviale</h3>
          <p style="margin-top:10px; color:var(--ink-2); line-height:1.6; font-size:14px;">Pour naviguer sur le Rhin, les canaux, les fleuves. Réglementation spécifique aux voies intérieures.</p>
          <div class="dot-rule" style="margin:18px 0;"></div>
          <div class="flex items-baseline justify-between">
            <div><div class="mono" style="font-size:10px; letter-spacing:0.12em; color:var(--ink-soft);">À PARTIR DE</div><div class="serif tnum" style="font-size:30px; line-height:1;">150 €</div></div>
            <div class="btn-link" style="font-size:13px;">Détails →</div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8 items-center">
        <div class="col-span-12 md:col-span-5">
          <div class="photo-slot" style="aspect-ratio:3/4;">
            <div class="photo-slot__corner">PHOTO · formateur</div>
            <div class="photo-slot__cap">Marc — moniteur principal, 22 ans d'enseignement</div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-7">
          <div class="kicker">— Le mot du moniteur</div>
          <div class="serif" style="font-size:34px; line-height:1.2; margin-top:14px;">
            « Le permis bateau, c'est trois heures de QCM et deux heures à la barre. Mais ce qu'on transmet, c'est <em>quarante ans à lire la mer</em>. Nos élèves repartent avec un titre — et une intuition. »
          </div>
          <div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--rule); font-family:var(--font-mono); font-size:11px; letter-spacing:0.1em; color:var(--ink-soft);">
            MARC F. — Moniteur principal, Sea Fun Boat
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="section-num">N°02 · Méthode</div>
      <h2 class="display-2" style="margin-top:14px;">Comment ça se passe.</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10" style="margin-top:56px;">
        <div><div class="serif tnum" style="font-size:54px; line-height:1; color:var(--teal);">01</div><h3 style="margin-top:10px; font-weight:600;">Inscription</h3><p style="margin-top:6px; font-size:14px; color:var(--ink-2); line-height:1.6;">Dossier en 20 min au comptoir. Vous repartez avec votre livret de code.</p></div>
        <div><div class="serif tnum" style="font-size:54px; line-height:1; color:var(--teal);">02</div><h3 style="margin-top:10px; font-weight:600;">Code à votre rythme</h3><p style="margin-top:6px; font-size:14px; color:var(--ink-2); line-height:1.6;">Accès à la plateforme en ligne + soirées de révision en agence (mar. & jeu.).</p></div>
        <div><div class="serif tnum" style="font-size:54px; line-height:1; color:var(--teal);">03</div><h3 style="margin-top:10px; font-weight:600;">Pratique en mer</h3><p style="margin-top:6px; font-size:14px; color:var(--ink-2); line-height:1.6;">3 h 30 sur notre bateau-école dédié, en binôme ou seul, selon vos préférences.</p></div>
        <div><div class="serif tnum" style="font-size:54px; line-height:1; color:var(--teal);">04</div><h3 style="margin-top:10px; font-weight:600;">Examen</h3><p style="margin-top:6px; font-size:14px; color:var(--ink-2); line-height:1.6;">Présentation à l'examen au centre de Fréjus. 92 % de réussite en 2025.</p></div>
      </div>
    </div>
  </section>

  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-4">
          <div class="section-num">N°03 · Questions</div>
          <h2 class="display-3" style="margin-top:14px;">Les questions<br/><em>qu'on nous pose</em>.</h2>
        </div>
        <div class="col-span-12 md:col-span-8">
          <details style="border-top:1px solid var(--rule); padding:18px 0;"><summary style="cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between;">Quel âge faut-il avoir ? <span>+</span></summary><p style="margin-top:10px; color:var(--ink-2); line-height:1.6;">16 ans révolus pour le permis côtier, sans condition d'âge maximum.</p></details>
          <details style="border-top:1px solid var(--rule); padding:18px 0;"><summary style="cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between;">Combien de temps faut-il pour l'obtenir ? <span>+</span></summary><p style="margin-top:10px; color:var(--ink-2); line-height:1.6;">Comptez 2 à 4 semaines selon votre rythme. Stage week-end intensif possible (vendredi soir → dimanche matin).</p></details>
          <details style="border-top:1px solid var(--rule); padding:18px 0;"><summary style="cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between;">Faut-il déjà savoir nager ? <span>+</span></summary><p style="margin-top:10px; color:var(--ink-2); line-height:1.6;">Aucun certificat n'est demandé pour le permis côtier. Pour des raisons de bon sens, on recommande de savoir nager 25 m sans aide.</p></details>
          <details style="border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:18px 0;"><summary style="cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between;">Le code est-il commun avec celui de la voiture ? <span>+</span></summary><p style="margin-top:10px; color:var(--ink-2); line-height:1.6;">Non. Le code maritime est spécifique : balisage, règles de barre, sécurité, météo. 30 questions, 25 bonnes réponses minimum.</p></details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
