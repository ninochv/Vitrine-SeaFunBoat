<template>
  <section style="padding-top:32px;">
    <div class="container-x">
      <div class="flex items-center gap-2" style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.1em; text-transform:uppercase;">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink><span>›</span><span style="color:var(--ink);">Contact</span>
      </div>
      <div class="grid grid-cols-12 gap-6 items-end" style="margin-top:32px;">
        <div class="col-span-12 md:col-span-8">
          <div class="kicker">N°05 · Nous écrire</div>
          <h1 class="display-1" style="margin-top:14px;">À votre<br/><em>service</em>.</h1>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="lede">Réponse sous 2 h ouvrées en saison, sous 24 h hors saison. Pour un dépannage en mer, appelez directement.</p>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:64px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-5">
          <div class="section-num">N°01 · Coordonnées</div>
          <div style="margin-top:32px;">
            <h3 class="kicker">Téléphone</h3>
            <a href="tel:0494494466" class="serif" style="display:block; font-size:36px; line-height:1; margin-top:6px; color:var(--ink);">04 94 49 44 66</a>
            <p style="margin-top:8px; font-size:13px; color:var(--ink-soft);">Standard, du lundi au samedi 9 h → 18 h 30</p>
          </div>
          <div style="margin-top:32px; padding-top:24px; border-top:1px solid var(--rule);">
            <h3 class="kicker">Dépannage 7 j/7 (saison)</h3>
            <a href="tel:0617284047" class="serif" style="display:block; font-size:36px; line-height:1; margin-top:6px; color:var(--rust);">06 17 28 40 47</a>
            <p style="margin-top:8px; font-size:13px; color:var(--ink-soft);">Astreinte mécanique en mer · juillet & août</p>
          </div>
          <div style="margin-top:32px; padding-top:24px; border-top:1px solid var(--rule);">
            <h3 class="kicker">Email</h3>
            <a href="mailto:seafunboat@gmail.com" class="serif" style="display:block; font-size:24px; line-height:1.2; margin-top:6px; color:var(--ink); word-break:break-all;">seafunboat@gmail.com</a>
            <p style="margin-top:8px; font-size:13px; color:var(--ink-soft);">Pour les devis & demandes administratives</p>
          </div>
          <div style="margin-top:32px; padding-top:24px; border-top:1px solid var(--rule);">
            <h3 class="kicker">Deux adresses</h3>
            <div style="margin-top:14px; font-size:15px; line-height:1.6;">
              <div style="font-weight:600;">Base principale · Les Issambres</div>
              <div style="color:var(--ink-soft);">Port de San Peire, RN 98<br/>83380 Les Issambres</div>
            </div>
            <div style="margin-top:18px; font-size:15px; line-height:1.6;">
              <div style="font-weight:600;">Antenne · Sainte-Maxime</div>
              <div style="color:var(--ink-soft);">Port principal<br/>83120 Sainte-Maxime</div>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-7">
          <form v-if="!submitted" class="card" style="padding:40px;" @submit.prevent="submitted = true">
            <div class="section-num">N°02 · Formulaire</div>
            <h2 class="display-3" style="margin-top:14px;">On vous rappelle.</h2>
            <div class="grid grid-cols-2 gap-4" style="margin-top:24px;">
              <div class="col-span-1"><label class="field-label">Prénom</label><input class="field" required/></div>
              <div class="col-span-1"><label class="field-label">Nom</label><input class="field" required/></div>
              <div class="col-span-2"><label class="field-label">Email</label><input type="email" class="field" required/></div>
              <div class="col-span-2"><label class="field-label">Téléphone</label><input type="tel" class="field" required/></div>
              <div class="col-span-2">
                <label class="field-label">Sujet</label>
                <select class="field" required>
                  <option value="">— Choisir un sujet —</option>
                  <option>Location de bateau</option>
                  <option>Achat (neuf ou occasion)</option>
                  <option>Vente / dépôt-vente</option>
                  <option>Maintenance / réparation</option>
                  <option>Hivernage</option>
                  <option>Permis bateau</option>
                  <option>Autre</option>
                </select>
              </div>
              <div class="col-span-2"><label class="field-label">Votre message</label><textarea class="field" rows="5" required></textarea></div>
              <div class="col-span-2 flex items-start gap-3" style="font-size:13px; color:var(--ink-2);">
                <input type="checkbox" required style="margin-top:3px;"/>
                <label>J'accepte que mes informations soient utilisées pour me recontacter. <a href="#" class="btn-link">Voir notre politique</a>.</label>
              </div>
            </div>
            <div class="dot-rule" style="margin:32px 0 24px;"></div>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p style="font-size:13px; color:var(--ink-soft); font-family:var(--font-mono); letter-spacing:0.04em;">Réponse sous 2 h ouvrées</p>
              <button type="submit" class="btn btn-rust">Envoyer ma demande</button>
            </div>
          </form>

          <div v-else class="card" style="padding:48px; text-align:center;">
            <div class="serif" style="font-size:48px; color:var(--teal); line-height:1;">✓</div>
            <h3 class="serif" style="font-size:32px; line-height:1.05; margin-top:14px;">Merci — c'est parti.</h3>
            <p style="margin-top:10px; color:var(--ink-2); max-width:42ch; margin-left:auto; margin-right:auto;">
              Votre message est entre nos mains. On vous rappelle au plus vite — en général sous l'heure pendant la journée.
            </p>
            <RouterLink :to="{ name: 'home' }" class="btn btn-ghost" style="margin-top:24px; display:inline-flex;">Retour à l'accueil</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:120px;">
    <div class="container-x">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-4">
          <div class="section-num">N°03 · Horaires</div>
          <h2 class="display-3" style="margin-top:14px;">Quand on est<br/><em>là</em>.</h2>
        </div>
        <div class="col-span-12 md:col-span-4">
          <h3 class="kicker">Saison · juin → septembre</h3>
          <div style="margin-top:14px;">
            <div class="spec-row"><span>Lundi → Dimanche</span><span>9 h → 19 h</span></div>
            <div class="spec-row"><span>Sans interruption</span><span>—</span></div>
            <div class="spec-row"><span>Dépannage en mer</span><span>7 j/7</span></div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4">
          <h3 class="kicker">Hors saison · octobre → mai</h3>
          <div style="margin-top:14px;">
            <div class="spec-row"><span>Lundi → Samedi</span><span>9 h → 12 h</span></div>
            <div class="spec-row"><span>Lundi → Samedi</span><span>15 h → 18 h</span></div>
            <div class="spec-row"><span>Fermeture annuelle</span><span>10 nov. → 10 mars</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:80px;">
    <div class="container-x">
      <div class="section-num">N°04 · Nous trouver</div>
      <h2 class="display-3" style="margin-top:14px;">Au port de San Peire.</h2>
    </div>
    <div style="margin-top:32px;">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=6.7090%2C43.3158%2C6.7330%2C43.3290&layer=mapnik&marker=43.3223%2C6.7210"
        style="width:100%; height:480px; border:0; filter:grayscale(35%) contrast(0.95);"
        loading="lazy"
      ></iframe>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const submitted = ref(false)
</script>
