// ===========================================================
// Sea Fun Boat — Shared header / footer / booking modal
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
              <button class="btn btn-rust hidden sm:inline-flex" data-action="open-booking">
                Réserver
                <span class="w-4 h-4 inline-block">${ICON.arrow}</span>
              </button>
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
            <button class="btn btn-rust w-full justify-center" style="margin-top:14px;" data-action="open-booking">Réserver une sortie</button>
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
              <a href="#" class="hover:text-[color:var(--cream)]">Météo</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // ----- BOOKING MODAL -----
  function renderModal() {
    return `
      <div class="modal-backdrop" data-modal style="display:none;">
        <div class="modal" role="dialog" aria-label="Réservation">
          <div style="padding:22px 28px 16px; border-bottom:1px solid var(--rule); display:flex; align-items:start; justify-content:space-between; gap:16px;">
            <div>
              <div class="kicker">— Module de réservation</div>
              <h2 class="serif" style="font-size:30px; line-height:1.05; margin-top:6px;" data-modal-title>Réserver une sortie</h2>
              <div style="font-size:13px; color:var(--ink-soft); margin-top:4px;" data-modal-sub>Réponse de notre équipe sous 2 h ouvrées.</div>
            </div>
            <button data-action="close-booking" aria-label="Fermer" style="padding:6px;">
              <span class="w-5 h-5 inline-block">${ICON.close}</span>
            </button>
          </div>

          <!-- Progress -->
          <div style="padding:16px 28px 0;">
            <div class="flex items-center gap-3" data-progress>
              ${[1,2,3].map((n) => `
                <div style="flex:1;">
                  <div data-step="${n}" style="height:2px; background:var(--rule);"></div>
                  <div data-step-label="${n}" class="mono" style="font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-soft); margin-top:6px;">
                    ${['01 · Sortie','02 · Coordonnées','03 · Envoi'][n-1]}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Body -->
          <div data-modal-body style="overflow-y:auto; padding:24px 28px; flex:1;"></div>

          <!-- Footer -->
          <div data-modal-footer style="padding:16px 28px; border-top:1px solid var(--rule); background:var(--cream);">
          </div>
        </div>
      </div>
    `;
  }

  // ----- MODAL LOGIC -----
  let modalState = {
    step: 1,
    item: null,
    date: '',
    duration: 'half',
    port: 'issambres',
    people: 2,
    extras: [],
    name: '', email: '', phone: '',
  };

  function getTotal() {
    const item = modalState.item;
    const base = item ? (modalState.duration === 'half' ? item.halfDay : item.fullDay) : (modalState.duration === 'half' ? 250 : 380);
    const extras = modalState.extras.length * 35;
    return base + extras;
  }

  function renderModalBody() {
    const s = modalState;
    if (s.step === 1) {
      const items = (window.SFB_FLEET || []);
      const itemOptions = items.map((b) => `<option value="${b.id}" ${s.item && s.item.id === b.id ? 'selected' : ''}>${b.model} — ${b.halfDay}€ / demi-j.</option>`).join('');
      return `
        <div style="display:grid; gap:18px;">
          <div>
            <label class="field-label">Bateau</label>
            <select class="field" data-input="boat">
              <option value="">— Indifférent, je veux des conseils —</option>
              ${itemOptions}
            </select>
          </div>

          <div>
            <label class="field-label">Date de sortie</label>
            <input type="date" class="field" data-input="date" value="${s.date}"/>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label">Durée</label>
              <div class="flex gap-2">
                <button class="chip ${s.duration==='half'?'is-active':''}" data-set="duration:half">Demi-journée</button>
                <button class="chip ${s.duration==='full'?'is-active':''}" data-set="duration:full">Journée</button>
              </div>
            </div>
            <div>
              <label class="field-label">Port</label>
              <div class="flex gap-2">
                <button class="chip ${s.port==='issambres'?'is-active':''}" data-set="port:issambres">Issambres</button>
                <button class="chip ${s.port==='maxime'?'is-active':''}" data-set="port:maxime">Sainte-Maxime</button>
              </div>
            </div>
          </div>

          <div>
            <label class="field-label">Passagers</label>
            <div class="flex items-center gap-3">
              <button class="chip" data-action="decr-people" style="width:44px; justify-content:center;">−</button>
              <div class="tnum serif" style="font-size:28px; line-height:1; flex:1; text-align:center;">${s.people}</div>
              <button class="chip" data-action="incr-people" style="width:44px; justify-content:center;">+</button>
            </div>
          </div>

          <div>
            <label class="field-label">Accessoires (+ 35 € chacun)</label>
            <div class="flex flex-wrap gap-2">
              ${['Bouée tractée','Ski nautique','Wakeboard','Paddle'].map((e) => `
                <button class="chip ${s.extras.includes(e)?'is-active':''}" data-toggle-extra="${e}">${s.extras.includes(e) ? '✓ ' : ''}${e}</button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
    if (s.step === 2) {
      return `
        <div style="display:grid; gap:16px;">
          <div>
            <label class="field-label">Nom complet</label>
            <input class="field" type="text" data-input="name" value="${s.name}" placeholder="Jean Dupont"/>
          </div>
          <div>
            <label class="field-label">Email</label>
            <input class="field" type="email" data-input="email" value="${s.email}" placeholder="jean@exemple.fr"/>
          </div>
          <div>
            <label class="field-label">Téléphone</label>
            <input class="field" type="tel" data-input="phone" value="${s.phone}" placeholder="06 12 34 56 78"/>
          </div>
          <div class="card" style="padding:14px 16px; background:var(--cream); border-color:var(--rule); font-size:13px; color:var(--ink-2);">
            <div style="font-weight:600; margin-bottom:4px;">Aucun prélèvement à ce stade.</div>
            Notre équipe vous recontacte sous 2 h ouvrées pour confirmer disponibilité et finaliser l'acompte (30 % à la confirmation).
          </div>
        </div>
      `;
    }
    return `
      <div style="text-align:center; padding:32px 0;">
        <div style="width:56px; height:56px; border:2px solid var(--teal); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:var(--teal);">
          <span class="w-7 h-7 inline-block">${ICON.check}</span>
        </div>
        <h3 class="serif" style="font-size:32px; margin-top:18px; line-height:1.1;">Merci ${s.name.split(' ')[0] || ''}</h3>
        <p style="margin-top:10px; color:var(--ink-2); max-width:42ch; margin-left:auto; margin-right:auto;">
          Votre demande est partie. Nous vous rappelons sous 2 h ouvrées pour confirmer la disponibilité du ${s.item ? s.item.model : 'bateau'} le ${s.date || '—'}.
        </p>
        <div class="card" style="margin:24px auto 0; max-width:340px; padding:16px 18px; text-align:left;">
          <div class="spec-row"><span>Bateau</span><span>${s.item ? s.item.model : 'À conseiller'}</span></div>
          <div class="spec-row"><span>Date</span><span>${s.date || '—'}</span></div>
          <div class="spec-row"><span>Durée</span><span>${s.duration === 'half' ? 'Demi-journée' : 'Journée'}</span></div>
          <div class="spec-row"><span>Port</span><span>${s.port === 'issambres' ? 'Issambres' : 'Sainte-Maxime'}</span></div>
          <div class="spec-row"><span>Passagers</span><span>${s.people}</span></div>
          ${s.extras.length ? `<div class="spec-row"><span>Accessoires</span><span>${s.extras.join(', ')}</span></div>` : ''}
          <div class="spec-row" style="border-top:1px solid var(--rule); margin-top:6px; padding-top:10px;"><span>Total estimé</span><span class="serif" style="font-size:20px;">${getTotal()} €</span></div>
        </div>
      </div>
    `;
  }

  function renderModalFooter() {
    const s = modalState;
    if (s.step === 3) {
      return `<button class="btn btn-navy w-full justify-center" data-action="close-booking">Fermer</button>`;
    }
    const canNext = (s.step === 1) || (s.step === 2 && s.name && s.email && s.phone);
    return `
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="kicker">Total estimé</div>
          <div class="serif" style="font-size:26px; line-height:1;">${getTotal()} €</div>
        </div>
        <div class="flex gap-2">
          ${s.step > 1 ? `<button class="btn btn-ghost" data-action="prev">Retour</button>` : ''}
          <button class="btn btn-rust" data-action="next" ${!canNext ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            ${s.step === 2 ? 'Envoyer la demande' : 'Continuer'}
            <span class="w-4 h-4 inline-block">${ICON.arrow}</span>
          </button>
        </div>
      </div>
    `;
  }

  function updateModal() {
    const body = document.querySelector('[data-modal-body]');
    const foot = document.querySelector('[data-modal-footer]');
    if (!body) return;
    body.innerHTML = renderModalBody();
    foot.innerHTML = renderModalFooter();
    // Progress bars
    document.querySelectorAll('[data-step]').forEach((el) => {
      const n = parseInt(el.dataset.step, 10);
      el.style.background = n <= modalState.step ? 'var(--teal)' : 'var(--rule)';
    });
    document.querySelectorAll('[data-step-label]').forEach((el) => {
      const n = parseInt(el.dataset.stepLabel, 10);
      el.style.color = n <= modalState.step ? 'var(--ink)' : 'var(--ink-soft)';
    });
  }

  function openBooking(item) {
    modalState = { ...modalState, step: 1, item: item || modalState.item };
    if (item) {
      document.querySelector('[data-modal-title]').textContent = `Réserver le ${item.model}`;
      document.querySelector('[data-modal-sub]').textContent = `${item.builder} · ${item.capacity} pers. · ${item.power} CV`;
    } else {
      document.querySelector('[data-modal-title]').textContent = 'Réserver une sortie';
      document.querySelector('[data-modal-sub]').textContent = 'Réponse de notre équipe sous 2 h ouvrées.';
    }
    document.querySelector('[data-modal]').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateModal();
  }
  function closeBooking() {
    document.querySelector('[data-modal]').style.display = 'none';
    document.body.style.overflow = '';
  }

  window.SFB_openBooking = openBooking;

  // ----- WIRE-UP -----
  function init() {
    const current = document.body.getAttribute('data-current') || '';
    // Header
    const headerSlot = document.querySelector('[data-slot="header"]');
    if (headerSlot) headerSlot.innerHTML = renderHeader(current);
    // Footer
    const footerSlot = document.querySelector('[data-slot="footer"]');
    if (footerSlot) footerSlot.innerHTML = renderFooter();
    // Modal
    if (!document.querySelector('[data-modal]')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = renderModal();
      document.body.appendChild(wrap.firstElementChild);
    }

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

      if (t.dataset.action === 'open-booking') { e.preventDefault(); openBooking(null); return; }
      if (t.dataset.action === 'close-booking') { closeBooking(); return; }
      if (t.dataset.action === 'toggle-mobile-nav') {
        document.querySelector('[data-mobile-nav]').classList.toggle('hidden');
        return;
      }
      if (t.dataset.action === 'incr-people') { modalState.people = Math.min(12, modalState.people + 1); updateModal(); return; }
      if (t.dataset.action === 'decr-people') { modalState.people = Math.max(1, modalState.people - 1); updateModal(); return; }
      if (t.dataset.action === 'next') {
        if (modalState.step === 1) { modalState.step = 2; }
        else if (modalState.step === 2 && modalState.name && modalState.email && modalState.phone) { modalState.step = 3; }
        updateModal(); return;
      }
      if (t.dataset.action === 'prev') { modalState.step = Math.max(1, modalState.step - 1); updateModal(); return; }
      if (t.dataset.set) {
        const [k, v] = t.dataset.set.split(':');
        modalState[k] = v; updateModal(); return;
      }
      if (t.dataset.toggleExtra) {
        const e = t.dataset.toggleExtra;
        modalState.extras = modalState.extras.includes(e)
          ? modalState.extras.filter((x) => x !== e)
          : [...modalState.extras, e];
        updateModal(); return;
      }
    });

    // Backdrop close
    document.addEventListener('click', (e) => {
      const mb = e.target.closest('.modal-backdrop');
      if (mb && e.target === mb) closeBooking();
    });

    document.addEventListener('input', (e) => {
      const t = e.target.closest('[data-input]');
      if (!t) return;
      const key = t.dataset.input;
      if (key === 'boat') {
        const found = (window.SFB_FLEET || []).find((b) => b.id === t.value);
        modalState.item = found || null;
        if (found) {
          document.querySelector('[data-modal-title]').textContent = `Réserver le ${found.model}`;
          document.querySelector('[data-modal-sub]').textContent = `${found.builder} · ${found.capacity} pers. · ${found.power} CV`;
        } else {
          document.querySelector('[data-modal-title]').textContent = 'Réserver une sortie';
          document.querySelector('[data-modal-sub]').textContent = 'Réponse de notre équipe sous 2 h ouvrées.';
        }
        // Re-render to update total in footer
        const foot = document.querySelector('[data-modal-footer]');
        foot.innerHTML = renderModalFooter();
        return;
      }
      modalState[key] = t.value;
      // Live total update
      const foot = document.querySelector('[data-modal-footer]');
      foot.innerHTML = renderModalFooter();
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
