// ============ Suport Ideal — Comportamentos =================
(function() {
  'use strict';

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Tweaks: editor mode integration ----
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "dark",
    "accent": "#FF6A00",
    "heroMode": "cinematic"
  }/*EDITMODE-END*/;

  let state = { ...TWEAK_DEFAULTS };
  try {
    const saved = localStorage.getItem('suport-ideal-tweaks');
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch(e) {}

  function applyTheme(t) { document.documentElement.setAttribute('data-theme', t); }
  function applyAccent(c) {
    document.documentElement.style.setProperty('--accent', c);
    // derive a lighter and softer accent
    document.documentElement.style.setProperty('--accent-2', c);
    document.documentElement.style.setProperty('--accent-glow', hexToRgba(c, 0.32));
    document.documentElement.style.setProperty('--accent-soft', hexToRgba(c, 0.10));
  }
  function applyHeroMode(m) {
    const hero = document.getElementById('hero');
    if (!hero) return;
    if (m === 'direct') hero.classList.add('hero--direct');
    else hero.classList.remove('hero--direct');
  }

  function hexToRgba(hex, a) {
    const c = hex.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function applyAll() {
    applyTheme(state.theme);
    applyAccent(state.accent);
    applyHeroMode(state.heroMode);
  }
  applyAll();

  // Edit-mode protocol
  let panelEl = null;
  window.addEventListener('message', (ev) => {
    const d = ev.data || {};
    if (d.type === '__activate_edit_mode') showPanel();
    if (d.type === '__deactivate_edit_mode') hidePanel();
  });
  setTimeout(() => {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }, 60);

  function showPanel() {
    if (panelEl) { panelEl.style.display = ''; return; }
    panelEl = document.createElement('div');
    panelEl.id = 'sup-tweaks';
    panelEl.style.cssText = `
      position: fixed; top: 24px; right: 24px; z-index: 9999;
      width: 280px; background: rgba(15,15,15,0.96); color: #fff;
      border: 1px solid rgba(255,255,255,0.16); border-radius: 16px;
      padding: 18px 20px; font-family: 'Manrope', system-ui, sans-serif;
      backdrop-filter: blur(20px); box-shadow: 0 24px 60px rgba(0,0,0,0.5);
    `;
    panelEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div style="font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:0.15em; color:#FF6A00; text-transform:uppercase">Tweaks</div>
        <button id="sup-tweaks-close" style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;padding:0;width:24px;height:24px">×</button>
      </div>

      <div style="margin-bottom:18px">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px">Tema</div>
        <div style="display:flex;gap:6px">
          <button data-theme-pick="dark" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#fff;cursor:pointer;font-size:12px">Dark</button>
          <button data-theme-pick="light" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#fff;cursor:pointer;font-size:12px">Light</button>
        </div>
      </div>

      <div style="margin-bottom:18px">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px">Cor de destaque</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${['#FF6A00','#FF3D00','#F5A623','#7C3AED','#10B981','#3B82F6'].map(c =>
            `<button data-accent-pick="${c}" style="width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,0.16);background:${c};cursor:pointer"></button>`
          ).join('')}
          <input type="color" id="sup-color-custom" value="${state.accent}" style="width:32px;height:32px;border:none;border-radius:50%;background:transparent;cursor:pointer;padding:0">
        </div>
      </div>

      <div style="margin-bottom:4px">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px">Hero</div>
        <div style="display:flex;gap:6px">
          <button data-hero-pick="cinematic" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#fff;cursor:pointer;font-size:12px">Cinemático</button>
          <button data-hero-pick="direct" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#fff;cursor:pointer;font-size:12px">Direto</button>
        </div>
      </div>
    `;
    document.body.appendChild(panelEl);
    refreshPanel();

    panelEl.querySelector('#sup-tweaks-close').onclick = () => {
      hidePanel();
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    };
    panelEl.querySelectorAll('[data-theme-pick]').forEach(b => {
      b.onclick = () => setTweak({ theme: b.getAttribute('data-theme-pick') });
    });
    panelEl.querySelectorAll('[data-accent-pick]').forEach(b => {
      b.onclick = () => setTweak({ accent: b.getAttribute('data-accent-pick') });
    });
    panelEl.querySelectorAll('[data-hero-pick]').forEach(b => {
      b.onclick = () => setTweak({ heroMode: b.getAttribute('data-hero-pick') });
    });
    panelEl.querySelector('#sup-color-custom').oninput = (e) => setTweak({ accent: e.target.value });
  }
  function hidePanel() { if (panelEl) panelEl.style.display = 'none'; }

  function refreshPanel() {
    if (!panelEl) return;
    panelEl.querySelectorAll('[data-theme-pick]').forEach(b => {
      const active = b.getAttribute('data-theme-pick') === state.theme;
      b.style.background = active ? '#FF6A00' : 'transparent';
      b.style.color = active ? '#000' : '#fff';
      b.style.borderColor = active ? '#FF6A00' : 'rgba(255,255,255,0.16)';
    });
    panelEl.querySelectorAll('[data-accent-pick]').forEach(b => {
      const active = b.getAttribute('data-accent-pick') === state.accent;
      b.style.borderColor = active ? '#fff' : 'rgba(255,255,255,0.16)';
      b.style.transform = active ? 'scale(1.1)' : 'scale(1)';
    });
    panelEl.querySelectorAll('[data-hero-pick]').forEach(b => {
      const active = b.getAttribute('data-hero-pick') === state.heroMode;
      b.style.background = active ? '#FF6A00' : 'transparent';
      b.style.color = active ? '#000' : '#fff';
      b.style.borderColor = active ? '#FF6A00' : 'rgba(255,255,255,0.16)';
    });
  }

  function setTweak(edits) {
    state = { ...state, ...edits };
    try { localStorage.setItem('suport-ideal-tweaks', JSON.stringify(state)); } catch(e) {}
    applyAll();
    refreshPanel();
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  }

  // Smooth in-page anchor behavior
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const t = document.getElementById(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Map open in app
  const mapCard = document.getElementById('map-card');
  if (mapCard) {
    mapCard.addEventListener('click', () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const addr = encodeURIComponent('Francisco Rosa Pires, 156, Tapira, MG, 38189-000');
      let url;
      if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        url = `maps://?q=${addr}`;
      } else if (isMobile) {
        url = `geo:0,0?q=${addr}`;
      } else {
        url = `https://www.google.com/maps/search/?api=1&query=${addr}`;
      }
      window.open(url, '_blank');
    });
  }
})();
