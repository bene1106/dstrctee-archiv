# DSTRCTEE – Archiv-Seite

Statische Archiv-Website (reines HTML/CSS/JS, **kein** Framework, **kein** Backend, **keine** Build-Tools), die den bisherigen Shopify-Store **dstrctee** ersetzt. Der Shop wird gekündigt – diese Seite läuft kostenlos auf **GitHub Pages**.

**Kein Kauf, kein Warenkorb, kein Checkout.** Statt „Kaufen" gibt es ein E-Mail-Interessenfeld. Auf jeder Seite steht, dass das Projekt **pausiert** ist.

---

## Inhalt / Aufbau

| Datei | Zweck |
|-------|-------|
| `index.html` | Startseite: Pink-Banner, „berlin's soul"-Hero, Tee-Grid, 3-Spalten-Sektion, GOOD-NEWS-Newsletter |
| `shop.html` | Übersicht aller 8 Tees (Grid aus `produkte.json`) |
| `produkt.html` | Produktdetail, dynamisch per `?handle=…` aus `produkte.json` (Galerie, Größen-Pills, Anzahl, Interesse-Feld, Größentabelle, Material/GPSR) |
| `ueber-uns.html`, `artists.html`, `kontakt.html` | Statische Seiten |
| `produkte.json` | Datenquelle: die **8 released Tees** (Titel, Preis, Beschreibung, Artist, Bezirk, Bilder) |
| `assets/css/style.css` | Styles (originalgetreuer Dawn-Nachbau, Pink-Akzent, responsiv) |
| `assets/js/site.js` | Banner/Header/Footer, Produktdaten-Loader, Produktdetail, Interesse-Formular |
| `assets/img/logo.png` | Echtes DSTRCTEE-Logo (zugeschnitten aus `DesignbilderWebseite/9.png`) |
| `Produktbilder/` | Produktbilder (lokal gesichert) |
| `DesignbilderWebseite/` | Layout-/Hero-/Artist-Bilder inkl. Original-Logo `9.png` |

> Es werden bewusst **nur die 8 Tees** aus `referenz_uebersicht.png` gezeigt (F-Hain, Berlin, Köpenick, Bergmannkiez, Sonnenallee, Wedding, Turmstraße, Schöneberg). Andere Einträge der CSV (Hoodies, Gutschein, Special/Draft-Dubletten) wurden nie released und sind ausgeschlossen.
>
> Der Ordner `theme_export…` (Shopify-Theme) diente nur als Stil-Referenz und ist via `.gitignore` vom Repo ausgenommen.

**Bild-Kontroll-Liste:** Alle 8 Produkte haben mindestens ein Bild. Kein Produkt ohne Bild, keine fehlende Bilddatei. Fehlende Zusatzbilder wurden vor der Shop-Kündigung aus dem Shopify-CDN nachgeladen.

---

## Lokal ansehen

`fetch()` für `produkte.json` braucht einen Webserver (nicht per Doppelklick `file://` öffnen):

```bash
# im Projektordner
python -m http.server 8000
# dann im Browser: http://localhost:8000
```

---

## 1) Formspree-ID eintragen (E-Mail-Erfassung)

Ohne Backend läuft die E-Mail-Erfassung über **Formspree**. Solange keine ID gesetzt ist, fällt das Formular automatisch auf `mailto:info@dstrctee.com` zurück (funktioniert sofort, öffnet das Mailprogramm).

So aktivierst du echte Einträge:

1. Konto anlegen auf <https://formspree.io> → neues Formular erstellen.
2. Du bekommst eine Endpoint-URL wie `https://formspree.io/f/**abcdwxyz**`. Der Teil nach `/f/` ist die **Form-ID**.
3. In `assets/js/site.js` ganz oben eintragen:
   ```js
   const CONFIG = {
     ...
     formspreeId: "abcdwxyz",   // <-- hier deine Form-ID
     ...
   };
   ```
4. Speichern, committen, pushen. Fertig – Einträge landen in deinem Formspree-Postfach.

---

## 2) Zu GitHub hochladen

> Wird **ganz am Ende** gemacht. Das lokale Git-Repo ist bereits angelegt und committet.

1. Auf <https://github.com/new> ein **neues, leeres** Repository anlegen (ohne README/.gitignore/Lizenz), z. B. `dstrctee-archiv`. Notiere deinen GitHub-Benutzernamen.
2. Im Projektordner das Remote setzen und pushen (Platzhalter ersetzen):
   ```bash
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/dstrctee-archiv.git
   git push -u origin main
   ```
   (Beim ersten Push nach Benutzername + **Personal Access Token** als Passwort fragen – Token unter GitHub → Settings → Developer settings → Tokens.)

---

## 3) GitHub Pages aktivieren

1. Im Repo auf **Settings** → linke Leiste **Pages**.
2. Unter **Build and deployment** → **Source**: `Deploy from a branch`.
3. **Branch**: `main`, Ordner `/ (root)` → **Save**.
4. Nach ~1 Minute erscheint oben die Live-URL:
   `https://DEIN-USERNAME.github.io/dstrctee-archiv/`

Alle Pfade in diesem Projekt sind **relativ**, die Seite läuft also korrekt unter `username.github.io/repo/`.

### Spätere Änderungen veröffentlichen
```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```
GitHub Pages baut automatisch neu (wenige Sekunden bis ~1 Minute).

---

## Markenangaben

DSTRCTEE · Betreiber: Pauguin UG (haftungsbeschränkt) · Kontakt: info@dstrctee.com

> **Impressum & Datenschutz** sind im Footer als **Platzhalter** markiert und müssen vor der Veröffentlichung mit echten Rechtstexten ergänzt werden.
