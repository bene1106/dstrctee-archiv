/* DSTRCTEE Archiv – gemeinsames Skript: Header/Footer, Produktdaten, Interesse-Formular. */

const CONFIG = {
  brand: "DSTRCTEE",
  email: "info@dstrctee.com",
  betreiber: "Pauguin UG (haftungsbeschränkt)",
  // >>> Formspree-Form-ID hier eintragen (siehe README). Leer lassen = mailto-Fallback. <<<
  formspreeId: "",
  instagram: "https://www.instagram.com/dstrctee/",
  tiktok: "https://www.tiktok.com/@dstrctee"
};

const NAV = [
  { href: "shop.html",      label: "Tees" },
  { href: "ueber-uns.html", label: "Über uns" },
  { href: "artists.html",   label: "Artists" },
  { href: "kontakt.html",   label: "Kontakt" }
];

/* ---------- Helfer ---------- */
function currentFile() {
  const p = location.pathname.split("/").pop();
  return p && p.length ? p : "index.html";
}

function euro(value, ab) {
  const s = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
  return ab ? "ab " + s : s;
}

function imgPath(name) { return "Produktbilder/" + name; }

let _produkteCache = null;
async function loadProdukte() {
  if (_produkteCache) return _produkteCache;
  const res = await fetch("produkte.json");
  if (!res.ok) throw new Error("produkte.json konnte nicht geladen werden");
  const data = await res.json();
  _produkteCache = data.produkte || [];
  return _produkteCache;
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

/* ---------- Header / Footer ---------- */
function renderChrome() {
  const here = currentFile();
  const navLinks = NAV.map(n =>
    `<a href="${n.href}" class="${n.href === here ? "active" : ""}">${n.label}</a>`
  ).join("");

  const top = document.getElementById("site-top");
  if (top) {
    top.innerHTML = `
      <div class="pause-banner">Dieses Projekt ist aktuell pausiert. Kein Verkauf – nur Archiv.</div>
      <header class="site-header">
        <div class="wrap">
          <a class="brand" href="index.html">DSTRCT<span class="dot">EE</span></a>
          <button class="nav-toggle" aria-label="Menü" aria-expanded="false">☰</button>
          <nav class="nav" id="main-nav">${navLinks}</nav>
        </div>
      </header>`;
    const toggle = top.querySelector(".nav-toggle");
    const nav = top.querySelector("#main-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const bottom = document.getElementById("site-bottom");
  if (bottom) {
    const year = document.lastModified ? new Date(document.lastModified).getFullYear() : "";
    bottom.innerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <div>
            <a class="brand" href="index.html">DSTRCT<span class="dot">EE</span></a>
            <p class="muted" style="max-width:38ch">Berliner Streetwear mit Kunst aus jedem Bezirk – gestaltet von lokalen Artists. Dieses Projekt ist derzeit pausiert.</p>
          </div>
          <div>
            <h4>Seiten</h4>
            <ul>
              <li><a href="shop.html">Tees</a></li>
              <li><a href="ueber-uns.html">Über uns</a></li>
              <li><a href="artists.html">Artists</a></li>
              <li><a href="kontakt.html">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4>Folge uns</h4>
            <ul>
              <li><a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="${CONFIG.tiktok}" target="_blank" rel="noopener">TikTok</a></li>
              <li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
            </ul>
          </div>
          <div class="legal">
            © ${year} ${CONFIG.brand} · Betreiber: ${CONFIG.betreiber} · Kontakt: ${CONFIG.email}<br>
            Impressum / Datenschutz: Platzhalter – bitte vor Veröffentlichung ergänzen.
          </div>
        </div>
      </footer>`;
  }
}

/* ---------- Interesse-Formular ---------- */
function interestFormHTML(produktTitel) {
  const subject = produktTitel ? `Interesse: ${produktTitel}` : "Interesse an DSTRCTEE";
  return `
    <div class="interest">
      <h3>Interesse?</h3>
      <p>Das Projekt ist pausiert – ein Kauf ist nicht möglich. Trag deine E-Mail ein, dann melden wir uns, falls es weitergeht.</p>
      <form class="interest-form" data-subject="${subject.replace(/"/g, "&quot;")}">
        <input type="hidden" name="_subject" value="${subject.replace(/"/g, "&quot;")}">
        <input type="hidden" name="produkt" value="${(produktTitel || "—").replace(/"/g, "&quot;")}">
        <input type="email" name="email" placeholder="deine@email.de" required autocomplete="email">
        <button type="submit" class="btn pink">Eintragen</button>
      </form>
      <div class="form-note" hidden></div>
    </div>`;
}

function attachInterestForms() {
  document.querySelectorAll(".interest-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const note = form.parentElement.querySelector(".form-note");
      const email = form.querySelector("input[name=email]").value.trim();
      const subject = form.dataset.subject || "Interesse an DSTRCTEE";

      // Kein Formspree konfiguriert -> mailto-Fallback
      if (!CONFIG.formspreeId) {
        const body = encodeURIComponent(`Hallo DSTRCTEE,\n\nich habe Interesse (${subject}).\nMeine E-Mail: ${email}\n`);
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        showNote(note, "ok", "Dein E-Mail-Programm öffnet sich – bitte die Nachricht abschicken.");
        return;
      }

      try {
        const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        });
        if (res.ok) {
          form.reset();
          showNote(note, "ok", "Danke! Wir haben deine E-Mail notiert.");
        } else {
          showNote(note, "err", "Hat nicht geklappt. Schreib uns gern direkt: " + CONFIG.email);
        }
      } catch (err) {
        showNote(note, "err", "Keine Verbindung. Schreib uns gern direkt: " + CONFIG.email);
      }
    });
  });
}

function showNote(el, type, msg) {
  el.hidden = false;
  el.className = "form-note " + type;
  el.textContent = msg;
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  if (typeof window.pageInit === "function") {
    Promise.resolve(window.pageInit()).then(attachInterestForms).catch(err => {
      console.error(err);
      attachInterestForms();
    });
  } else {
    attachInterestForms();
  }
});
