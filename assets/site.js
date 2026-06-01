// ===========================================================
// Sea Fun Boat — Shared header / footer
// Plain JS, no framework. Injects on DOMContentLoaded.
// Pages set `data-current="location"` on <body> to highlight nav.
// ===========================================================
(function () {
  // Compute base path so links work from subfolders too.
  // Every page lives at the project root, so '' is fine.
  const BASE = '';

  // ----- ICONS -----
  const ICON = {
    anchor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v15"/><path d="M5 12H3a9 9 0 0 0 18 0h-2"/><path d="M8 11h8"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
    phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
    mail:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16"/><path d="m22 7-10 6L2 7"/></svg>',
    pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  };
  window.SFB_ICON = ICON;

  // ----- NAV STRUCTURE -----
  const NAV = [
    { key: 'location', label: 'Location', href: 'location.html' },
    { key: 'vente',    label: 'Vente',    href: 'vente.html' },
    {
      key: 'chantier', label: 'Chantier naval', href: 'chantier-naval.html',
      sub: [
        { label: 'Hivernage',   href: 'hivernage.html' },
        { label: 'Maintenance', href: 'maintenance.html' },
      ],
    },
    {
      key: 'permis', label: 'Permis bateau', href: 'permis-bateau.html',
      sub: [
        { label: 'Permis Côtier',     href: 'permis-cotier.html' },
        { label: 'Extension Hauturier', href: 'permis-hauturier.html' },
        { label: 'Extension Fluviale', href: 'permis-fluvial.html' },
      ],
    },
    { key: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  // ----- HEADER -----
  function renderHeader(current) {
    const links = NAV.map((item) => {
      const active = item.key === current ? 'style="color:var(--rust);"' : '';
      if (item.sub) {
        const subItems = item.sub.map((s) => `<a href="${BASE}${s.href}">${s.label}</a>`).join('');
        return `
          <div class="nav-group">
            <a href="${BASE}${item.href}" class="nav-link flex items-center gap-1" ${active}>
              ${item.label}
              <span class="w-3 h-3 inline-block">${ICON.chevron}</span>
            </a>
            <div class="nav-dropdown">${subItems}</div>
          </div>`;
      }
      return `<a href="${BASE}${item.href}" class="nav-link" ${active}>${item.label}</a>`;
    }).join('');

    return `
      <header class="site-header">
        <!-- Top stripe with phone + address -->
        <div class="hidden md:block" style="background:var(--ink); color:var(--cream);">
          <div class="container-x flex items-center justify-between" style="height:34px; font-size:12px;">
            <div class="flex items-center gap-5" style="font-family:var(--font-mono); letter-spacing:0.04em;">
              <span>Port de San Peire · Les Issambres · Sainte-Maxime</span>
            </div>
            <div class="flex items-center gap-5" style="font-family:var(--font-mono); letter-spacing:0.04em;">
              <span>Lun – Sam · 9h00 → 18h30</span>
              <a href="tel:0494494466" class="flex items-center gap-1.5 hover:text-[var(--teal-light)]">
                <span class="w-3 h-3 inline-block">${ICON.phone}</span>
                04 94 49 44 66
              </a>
            </div>
          </div>
        </div>

        <div class="container-x">
          <div class="flex items-center justify-between" style="height:78px;">
            <a href="${BASE}index.html" class="flex items-baseline gap-3 group">
              <div style="font-family:var(--font-serif); font-size:26px; line-height:1; color:var(--ink); letter-spacing:-0.02em;">
                Sea Fun Boat
              </div>
            </a>

            <nav class="hidden lg:flex items-center" style="gap:28px; font-size:14px; font-weight:500;">
              ${links}
            </nav>

            <div class="flex items-center gap-2">
              <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust hidden sm:inline-flex">
                Réserver
                <span class="w-4 h-4 inline-block">${ICON.arrow}</span>
              </a>
              <button class="lg:hidden p-2" aria-label="Menu" data-action="toggle-mobile-nav">
                <span class="w-6 h-6 inline-block" style="color:var(--ink);">${ICON.menu}</span>
              </button>
            </div>
          </div>

          <!-- Mobile nav -->
          <div class="mobile-nav lg:hidden hidden" data-mobile-nav>
            ${NAV.map((item) => {
              if (item.sub) {
                return `
                  <details>
                    <summary>${item.label}</summary>
                    <div style="padding-bottom:10px;">
                      <a href="${BASE}${item.href}">Vue d'ensemble</a>
                      ${item.sub.map((s) => `<a href="${BASE}${s.href}">${s.label}</a>`).join('')}
                    </div>
                  </details>`;
              }
              return `<a href="${BASE}${item.href}">${item.label}</a>`;
            }).join('')}
            <a href="tel:0494494466" style="color:var(--rust);">04 94 49 44 66</a>
            <a href="https://seafunboat.seabook.pro" target="_blank" rel="noopener" class="btn btn-rust w-full justify-center" style="margin-top:14px;">Réserver une sortie</a>
          </div>
        </div>
      </header>
    `;
  }

  // ----- FOOTER -----
  function renderFooter() {
    return `
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
                <li style="margin-bottom:10px;"><a href="${BASE}location.html" class="hover:underline">Location</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}vente.html" class="hover:underline">Vente</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}chantier-naval.html" class="hover:underline">Chantier naval</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}permis-bateau.html" class="hover:underline">Permis bateau</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}contact.html" class="hover:underline">Contact</a></li>
              </ul>
            </div>

            <div class="md:col-span-2">
              <h4 class="kicker" style="color:var(--teal-light);">Services</h4>
              <ul style="margin-top:16px; font-size:14px;">
                <li style="margin-bottom:10px;"><a href="${BASE}hivernage.html" class="hover:underline">Hivernage</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}maintenance.html" class="hover:underline">Maintenance</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}permis-cotier.html" class="hover:underline">Permis Côtier</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}permis-hauturier.html" class="hover:underline">Hauturier</a></li>
                <li style="margin-bottom:10px;"><a href="${BASE}permis-fluvial.html" class="hover:underline">Fluvial</a></li>
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
    `;
  }

  // ----- WIRE-UP -----
  function init() {
    const current = document.body.getAttribute('data-current') || '';
    // Header
    const headerSlot = document.querySelector('[data-slot="header"]');
    if (headerSlot) headerSlot.innerHTML = renderHeader(current);
    // Footer
    const footerSlot = document.querySelector('[data-slot="footer"]');
    if (footerSlot) footerSlot.innerHTML = renderFooter();
    // Scroll behaviour on header
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Delegate clicks
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action], [data-set], [data-toggle-extra]');
      if (!t) return;

      if (t.dataset.action === 'toggle-mobile-nav') {
        document.querySelector('[data-mobile-nav]').classList.toggle('hidden');
        return;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for pages that need them
  window.SFB_NAV = NAV;
})();
