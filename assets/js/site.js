/* ============================================================
   DSTRCTEE Archiv – gemeinsames Skript
   Rendert Banner / Header / GOOD-NEWS / Footer, lädt Produktdaten,
   baut die Produktdetailseite und verarbeitet das Interesse-Formular.
   ============================================================ */

const CONFIG = {
  brand: "DSTRCTEE",
  email: "info@dstrctee.com",
  betreiber: "Pauguin UG (haftungsbeschränkt)",
  // >>> Formspree-Form-ID hier eintragen (siehe README). Leer = mailto-Fallback. <<<
  formspreeId: "xpqneker",
  instagram: "https://www.instagram.com/dstrctee/",
  tiktok: "https://www.tiktok.com/@dstrctee",
  year: 2026
};

const NAV = [
  { href: "shop.html",      label: "Tees" },
  { href: "artists.html",   label: "Unsere Artists" },
  { href: "ueber-uns.html", label: "Über uns" },
  { href: "kontakt.html",   label: "Kontakt" }
];

/* Einheitliche Größentabelle (Werte aus dem Original-Shop, Unisex Medium Fit) */
const SIZE_TABLE = [
  ["S",  "69",   "49,5", "22,5"],
  ["M",  "73",   "53,5", "24"],
  ["L",  "75",   "56,5", "24,5"],
  ["XL", "77",   "59,5", "25"]
];
const SIZES = ["S", "M", "L", "XL"];

/* ---------- Icons (inline SVG) ---------- */
const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>',
  user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke-linecap="round"/></svg>',
  bag:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8Z" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke-linecap="round"/></svg>',
  arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15m0 0-6-6m6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.6c-1.3.1-2.5-.3-3.6-1v6.2a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3h2.8Z"/></svg>'
};

/* Zahlungs-Badges (schlicht, monochrom) */
function payBadges() {
  const txt = (label) => `<span class="pay" title="${label}">${label}</span>`;
  const mc = `<span class="pay" title="Mastercard"><svg viewBox="0 0 36 22"><circle cx="15" cy="11" r="7" fill="#eb001b"/><circle cx="21" cy="11" r="7" fill="#f79e1b" fill-opacity=".85"/></svg></span>`;
  return [ txt("VISA"), mc, txt("AMEX"), txt("PayPal"), txt(" Pay"), txt("G Pay"), txt("Maestro"), txt("UnionPay") ].join("");
}

/* ---------- Helfer ---------- */
function currentFile() {
  const p = location.pathname.split("/").pop();
  return p && p.length ? p : "index.html";
}
function euroFull(value, ab) {
  const s = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(value);
  return (ab ? "Von " : "") + s + " EUR";
}
function imgPath(name) { return "Produktbilder/" + name; }
function getParam(name) { return new URLSearchParams(location.search).get(name); }

let _produkteCache = null;
async function loadProdukte() {
  if (_produkteCache) return _produkteCache;
  const res = await fetch("produkte.json");
  if (!res.ok) throw new Error("produkte.json konnte nicht geladen werden");
  const data = await res.json();
  _produkteCache = data.produkte || [];
  return _produkteCache;
}

/* ---------- Produktkarte ---------- */
function productCard(p) {
  const front = imgPath(p.bilder[0]);
  const back  = p.bilder[1] ? imgPath(p.bilder[1]) : null;
  return `
    <a class="pcard" href="produkt.html?handle=${encodeURIComponent(p.handle)}">
      <div class="pcard__media">
        <img class="front" src="${front}" alt="${p.titel}" loading="lazy">
        ${back ? `<img class="back" src="${back}" alt="${p.titel} – weitere Ansicht" loading="lazy">` : ""}
      </div>
      <div class="pcard__body">
        <span class="pcard__kiez">${p.bezirk}</span>
        <div class="pcard__title">${p.titel}</div>
        <div class="pcard__price">${euroFull(p.preis, p.preis_ab)}</div>
      </div>
    </a>`;
}

/* ---------- Header / Banner / Notice ---------- */
function renderHeader() {
  const top = document.getElementById("site-top");
  if (!top) return;
  const here = currentFile();
  const nav = NAV.map(n => `<a href="${n.href}" class="${n.href === here ? "active" : ""}">${n.label}</a>`).join("");

  top.innerHTML = `
    <header class="site-header">
      <div class="wrap site-header__inner">
        <button class="nav-toggle" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
        <nav class="nav-main" id="main-nav">${nav}</nav>
        <a class="brand-logo" href="index.html" aria-label="DSTRCTEE Startseite">
          <img src="assets/img/logo.png" alt="DSTRCTEE">
        </a>
        <div class="header-icons">
          <button class="icon-btn icon-search" aria-label="Suche (deaktiviert – Archiv)" disabled>${ICON.search}</button>
          <button class="icon-btn" aria-label="Konto (deaktiviert – Archiv)" disabled>${ICON.user}</button>
          <button class="icon-btn" aria-label="Warenkorb (deaktiviert – Archiv)" disabled>${ICON.bag}</button>
        </div>
      </div>
    </header>
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">${marqueeContent().repeat(6)}${marqueeContent().repeat(6)}</div>
    </div>
    <div class="notice"><strong>Archiv – Projekt pausiert.</strong> Kein Verkauf, kein Versand. Trag deine E-Mail ein, falls DSTRCTEE zurückkommt.</div>`;

  // Mobile-Toggle
  const toggle = top.querySelector(".nav-toggle");
  const navEl = top.querySelector("#main-nav");
  toggle.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
}
function marqueeContent() {
  const items = ["free shipping", "designed in berlin", "20% local artist commission"];
  return items.map(t => `<span>${t}</span><span class="star">✦</span>`).join("");
}

/* ---------- GOOD NEWS + Footer ---------- */
function renderFooter() {
  const bottom = document.getElementById("site-bottom");
  if (!bottom) return;

  const cols = [
    { h: "🎨 Hilfe & Support", links: ["FAQ", "Rückgabe & Umtausch", ["Kontakt","kontakt.html"], ["Größenberatung","groessenberatung.html"], "Künstler:in werden"] },
    { h: "🎁 DSTRCTEE entdecken", links: [["Über uns","ueber-uns.html"], ["Unsere Künstler:innen","artists.html"], ["Alle Bezirke","shop.html"], "Gutscheine", "Nachhaltigkeit"] },
    { h: "💳 Bezahlung & Versand", links: ["Zahlungsmethoden", "Versandkosten & Lieferzeiten"] },
    { h: "📋 Rechtliches", links: [["Impressum","impressum.html"], "AGB", "Widerrufsrecht", ["Datenschutzerklärung","datenschutz.html"]] }
  ];
  const colHTML = cols.map(c => `
    <div class="footer-col">
      <h4>${c.h}</h4>
      <ul>${c.links.map(l => {
        const isArr = Array.isArray(l);
        const label = isArr ? l[0] : l;
        const href  = isArr ? l[1] : "#";
        return `<li><a href="${href}">${label}</a></li>`;
      }).join("")}</ul>
    </div>`).join("");

  bottom.innerHTML = `
    <section class="newsletter">
      <div class="wrap">
        <h2>GOOD NEWS</h2>
        <p>Abonniere unseren Newsletter und erhalte 10% Rabatt auf Deine erste Bestellung!</p>
        <form class="field interest-form" data-subject="Newsletter-Anmeldung">
          <input type="hidden" name="_subject" value="Newsletter-Anmeldung">
          <input type="email" name="email" placeholder="E-Mail" required autocomplete="email" aria-label="E-Mail">
          <button type="submit" aria-label="Eintragen">${ICON.arrow}</button>
        </form>
        <div class="form-note" role="status"></div>
      </div>
    </section>
    <footer class="site-footer">
      <div class="wrap footer-cols">${colHTML}</div>
      <div class="footer-social">
        <a href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
        <a href="${CONFIG.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>
      </div>
      <div class="footer-bottom">
        <div class="wrap">
          <div class="footer-pay">${payBadges()}</div>
          <div class="footer-legal">
            © ${CONFIG.year}, ${CONFIG.brand}
            <span class="sep">·</span><a href="kontakt.html">Kontaktinformationen</a>
            <span class="sep">·</span>Betreiber: ${CONFIG.betreiber}
          </div>
        </div>
      </div>
    </footer>`;
}

/* ---------- Interesse- / Newsletter-Formular ---------- */
function attachInterestForms() {
  document.querySelectorAll(".interest-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const note = form.parentElement.querySelector(".form-note");
      const email = form.querySelector("input[name=email]").value.trim();
      const subject = form.dataset.subject || "Interesse an DSTRCTEE";

      if (!CONFIG.formspreeId) {
        const body = encodeURIComponent(`Hallo DSTRCTEE,\n\nich habe Interesse (${subject}).\nMeine E-Mail: ${email}\n`);
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        showNote(note, "ok", "Dein E-Mail-Programm öffnet sich – bitte die Nachricht abschicken.");
        return;
      }
      try {
        const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
          method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form)
        });
        if (res.ok) { form.reset(); showNote(note, "ok", "Danke! Wir haben deine E-Mail notiert."); }
        else { showNote(note, "err", "Hat nicht geklappt. Schreib uns direkt: " + CONFIG.email); }
      } catch (err) {
        showNote(note, "err", "Keine Verbindung. Schreib uns direkt: " + CONFIG.email);
      }
    });
  });
}
function showNote(el, type, msg) {
  if (!el) return;
  el.className = "form-note " + type;
  el.textContent = msg;
}

/* ---------- Produktdetail ---------- */
function renderProductDetail(root, p) {
  document.title = p.titel + " – DSTRCTEE Archiv";
  const crumb = document.getElementById("crumb-title");
  if (crumb) crumb.textContent = p.titel;

  const thumbs = p.bilder.length > 1 ? p.bilder.map((b, i) =>
    `<button class="${i === 0 ? "active" : ""}" data-i="${i}" aria-label="Bild ${i + 1}"><img src="${imgPath(b)}" alt="${p.titel} Ansicht ${i + 1}" loading="lazy"></button>`
  ).join("") : "";

  const sizeRow = SIZES.map((s, i) => `<button class="size-pill ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>`).join("");
  const tableRows = SIZE_TABLE.map(r =>
    `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`
  ).join("");

  root.innerHTML = `
    <div class="pdp">
      <div class="gallery">
        <div class="gallery__main"><img id="main-img" src="${imgPath(p.bilder[0])}" alt="${p.titel}"></div>
        ${thumbs ? `<div class="gallery__thumbs">${thumbs}</div>` : ""}
      </div>
      <div class="pdp__info">
        <span class="pdp__kiez">${p.bezirk}${p.artist && p.artist !== "DSTRCTEE" ? " · " + p.artist : ""}</span>
        <h1 class="pdp__title">${p.titel}</h1>
        <div class="pdp__price">${euroFull(p.preis, p.preis_ab)}</div>
        <div class="pdp__tax">Inkl. Steuern. · Ehemaliger Shop-Preis – Verkauf pausiert.</div>

        <div class="opt-label">Größe</div>
        <div class="size-row">${sizeRow}</div>

        <div class="opt-label">Anzahl</div>
        <div class="qty">
          <button type="button" data-step="-1" aria-label="Weniger">−</button>
          <input type="number" value="1" min="1" max="99" aria-label="Anzahl">
          <button type="button" data-step="1" aria-label="Mehr">+</button>
        </div>

        <div class="interest">
          <form class="interest__field interest-form" data-subject="Interesse: ${p.titel.replace(/"/g,'&quot;')}">
            <input type="hidden" name="_subject" value="Interesse: ${p.titel.replace(/"/g,'&quot;')}">
            <input type="hidden" name="produkt" value="${p.titel.replace(/"/g,'&quot;')}">
            <input type="email" name="email" placeholder="Interesse? Trag deine E-Mail ein." required autocomplete="email" aria-label="E-Mail">
            <button type="submit">Interesse melden</button>
          </form>
          <div class="interest__hint">Kein Kauf möglich – wir melden uns, falls es weitergeht.</div>
          <div class="form-note" role="status"></div>
        </div>

        <p class="pdp__desc">${p.beschreibung}</p>

        <div class="sizetable">
          <h3>Größentabelle</h3>
          <table>
            <thead><tr><th>Größe</th><th>Körperlänge (cm)</th><th>Brustweite (cm)</th><th>Ärmellänge (cm)</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>

        <div class="accordion">
          <div class="accordion__item">
            <button class="accordion__btn" aria-expanded="false">Material &amp; Pflege <span class="pm">+</span></button>
            <div class="accordion__panel"><div class="accordion__panel-inner">${p.material || "100 % Bio-Baumwolle, schonend bei 30 °C waschen, nicht bleichen."}</div></div>
          </div>
          <div class="accordion__item">
            <button class="accordion__btn" aria-expanded="false">GPSR <span class="pm">+</span></button>
            <div class="accordion__panel"><div class="accordion__panel-inner">Hersteller / EU-Verantwortlicher: ${CONFIG.betreiber}, Kontakt: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>. Weitere Angaben gemäß GPSR (General Product Safety Regulation) werden vor einer Veröffentlichung ergänzt.</div></div>
          </div>
        </div>
      </div>
    </div>`;

  // Galerie
  const mainImg = root.querySelector("#main-img");
  root.querySelectorAll(".gallery__thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      mainImg.src = imgPath(p.bilder[+btn.dataset.i]);
      root.querySelectorAll(".gallery__thumbs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  // Größe
  root.querySelectorAll(".size-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".size-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  // Anzahl
  const qtyInput = root.querySelector(".qty input");
  root.querySelectorAll(".qty button").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = Math.max(1, Math.min(99, (+qtyInput.value || 1) + (+btn.dataset.step)));
      qtyInput.value = v;
    });
  });
  // Accordions
  root.querySelectorAll(".accordion__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = open ? "0" : panel.scrollHeight + "px";
    });
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  if (typeof window.pageInit === "function") {
    Promise.resolve(window.pageInit()).then(attachInterestForms).catch(err => { console.error(err); attachInterestForms(); });
  } else {
    attachInterestForms();
  }
});
