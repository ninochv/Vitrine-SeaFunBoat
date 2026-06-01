<template>
  <footer class="site-footer" style="background:var(--ink); color:var(--cream); margin-top:80px;">
    <div class="container-x" style="padding-top:64px; padding-bottom:32px;">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="md:col-span-5">
          <div style="font-family:var(--font-serif); font-size:44px; line-height:1; letter-spacing:-0.02em;">
            Sea Fun<br/>Boat.
          </div>
          <p style="margin-top:18px; max-width:36ch; color:rgba(244,239,230,0.7); font-size:15px; line-height:1.6;">
            Maison familiale fondée en 1985 sur le port des Issambres. Location, vente, entretien, école — la mer méditerranéenne, en confiance.
          </p>
          <div style="margin-top:24px; font-family:var(--font-mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--teal-light);">
            — Une affaire de famille
          </div>
        </div>

        <div class="md:col-span-2">
          <h4 class="kicker" style="color:var(--teal-light);">Navigation</h4>
          <ul style="margin-top:16px; font-size:14px;">
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'location' }" class="hover:underline">Location</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'vente' }" class="hover:underline">Vente</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'chantier' }" class="hover:underline">Chantier naval</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'permis' }" class="hover:underline">Permis bateau</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'contact' }" class="hover:underline">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <h4 class="kicker" style="color:var(--teal-light);">Services</h4>
          <ul style="margin-top:16px; font-size:14px;">
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'hivernage' }" class="hover:underline">Hivernage</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'maintenance' }" class="hover:underline">Maintenance</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'permis-cotier' }" class="hover:underline">Permis Côtier</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'permis-hauturier' }" class="hover:underline">Hauturier</RouterLink></li>
            <li style="margin-bottom:10px;"><RouterLink :to="{ name: 'permis-fluvial' }" class="hover:underline">Fluvial</RouterLink></li>
          </ul>
        </div>

        <div class="md:col-span-3">
          <h4 class="kicker" style="color:var(--teal-light);">Nous joindre</h4>
          <div style="margin-top:16px; font-size:14px; line-height:1.7;">
            <div style="font-weight:600; margin-bottom:4px;">Port de San Peire</div>
            <div style="color:rgba(244,239,230,0.7);">RN 98, 83380 Les Issambres<br/>+ Port de Sainte-Maxime, 83120</div>
            <div style="margin-top:14px;">
              <a href="tel:0494494466" class="hover:underline" style="display:block;">04 94 49 44 66</a>
              <a href="tel:0617284047" class="hover:underline" style="display:block;">06 17 28 40 47 (dépannage)</a>
              <a href="mailto:seafunboat@gmail.com" class="hover:underline" style="display:block; margin-top:4px;">seafunboat@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div class="dot-rule" style="margin:48px 0 20px;"></div>

      <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between" style="font-size:12px; color:rgba(244,239,230,0.5); font-family:var(--font-mono); letter-spacing:0.06em;">
        <div>© 1985 — 2026 · Sea Fun Boat SARL · RCS Fréjus</div>
        <div class="flex gap-5">
          <a href="#" class="hover:text-[color:var(--cream)]">Mentions légales</a>
          <a href="#" class="hover:text-[color:var(--cream)]">CGV / CGU</a>
          <a href="#" class="hover:text-[color:var(--cream)]">RGPD</a>
        </div>
      </div>
    </div>
  </footer>
</template>
