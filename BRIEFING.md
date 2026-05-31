# Briefing: DISTRICTEE Archiv-/Pause-Seite (statisch, für GitHub Pages)

## Ziel
Baue aus den vorhandenen Dateien eine **statische Website** (reines HTML/CSS/JS, kein Framework, kein Backend), die den bisherigen Shopify-Store **dstrctee** als Archiv nachbildet. Der Shop wird gekündigt; diese Seite ersetzt ihn und läuft kostenlos auf **GitHub Pages**.

Wichtig: **Kein Kauf, kein Warenkorb, kein Checkout.** Statt "Kaufen" gibt es nur ein E-Mail-Interessenfeld. Auf der Seite muss klar stehen, dass das Projekt **pausiert** ist.

## Vorhandene Dateien in diesem Ordner
- `products_export_1.csv` — Shopify-Produktexport. **Maßgebliche Quelle** für Produkte. Spalten u.a.: `Handle` (Produkt-ID), `Title`, `Body (HTML)` (Beschreibung), `Variant Price`, `Image Src` (Original-CDN-Bild-URL), `Image Position`.
- `Produktbilder/` — bereits lokal gesicherte Produktbilder (Printful-Dateinamen wie `unisex-organic-cotton-t-shirt-white-front-and-back-6840ac8d12406.jpg`). **Unvollständig** (ca. 9 Dateien bei 13 Produkten).
- `DesignbilderWebseite/` — Layout-Bilder (Logo, Hero "local art", Banner, Artist-Fotos: IMG_*.jpg/png). Gehören NICHT zu Produkten, sondern zum Seitendesign.
- `referenz_uebersicht.png` — Screenshot der Shop-Produktübersicht (zeigt jedes Shirt-Motiv mit Produktnamen + Preis). **Visuelle Referenz** zur Bildzuordnung.
- `theme_export__...dawn.../` — exportiertes Shopify-Theme (Dawn). Dient **nur als Stil-/Layout-Referenz** (Farben, Fonts, Aufbau, ggf. Texte aus `templates/*.json` und `sections/*.liquid`). NICHT 1:1 nachbauen — neu und schlank umsetzen.

## WICHTIG: Bild-Zuordnung (zuerst erledigen!)
Die lokalen Dateinamen in `Produktbilder/` verraten nicht, zu welchem Produkt/Bezirk sie gehören. Zwei Methoden kombinieren:

### Methode 1 — CSV-Matching (primär, technisch exakt)
1. CSV einlesen: pro Zeile `Handle`, `Title`, `Image Src`, `Image Position`.
2. Aus jeder `Image Src`-URL den **Dateinamen** extrahieren (letzter Pfadteil, z. B. `...-6840ac8d12406.jpg`).
3. Mit den lokalen Dateien in `Produktbilder/` **matchen** → welches lokale Bild gehört zu welchem `Handle`.

### Methode 2 — visueller Abgleich (für Lücken)
Wenn ein lokales Bild über die CSV NICHT eindeutig zugeordnet werden kann:
- Bild mit `view` **öffnen und ansehen**, Motiv erkennen.
- Mit `referenz_uebersicht.png` abgleichen (zeigt jedes Motiv + Produktnamen). Bekannte Produkte laut Screenshot: F-Hain Tee (€27), Berlin Tee (ab €31,50, pinkes Shirt mit Tiger), Köpenick Tee (€30), Bergmannkiez Tee (€27), Sonnenallee Tee (ab €27, schwarz), Wedding Tee (€29), Turmstraße Tee (€29, schwarz/pink), Schöneberg Tee (€30, blaues Motiv).
- So jedes Bild dem richtigen Produkt zuordnen.

### Danach
4. `produkte.json` erzeugen: pro Produkt Titel, Beschreibung, Preis, zugeordnete lokale Bilddateien (Reihenfolge nach `Image Position`).
5. **Fehlende Bilder nachladen:** Steht in der CSV eine `Image Src`, deren Dateiname lokal fehlt → aus der CDN-URL herunterladen, in `Produktbilder/` ablegen. **Nur solange der Shop online ist — vor der Kündigung!**
6. Am Ende ausgeben, welche Produkte **kein** Bild haben (Kontroll-Liste).

## Aufgaben
1. **Bild-Zuordnung + Nachladen** (siehe oben) — zuerst.
2. **Startseite (`index.html`):** Banner **"Dieses Projekt ist aktuell pausiert."**, kurzer Pitch (Berliner Streetwear mit Kunst aus jedem Bezirk von lokalen Artists), Hero-Bild aus `DesignbilderWebseite/`, Link zur Übersicht.
3. **Produktübersicht:** Alle Produkte aus `produkte.json` als Grid (Bild, Titel, Preis).
4. **Produktseiten:** Detailansicht je Produkt (dynamisch per JS aus `produkte.json`) mit Bildern, Titel, Beschreibung. **Statt Kaufen:** "Interesse? Trag deine E-Mail ein."
5. **E-Mail-Erfassung:** Kein Backend auf GitHub Pages. **Formspree** (Platzhalter für Form-ID) oder Fallback `mailto:info@dstrctee.com`.
6. **Statische Seiten:** "Über uns" / "Unsere Artists" / "Kontakt" — Texte falls vorhanden aus dem Theme übernehmen.

## Technische Vorgaben
- Reines HTML/CSS/JS, **keine** Build-Tools.
- **Alle Pfade relativ** (läuft unter `username.github.io/repo/`).
- Optik an Dawn angelehnt: Pink-Akzent (siehe `config/settings_data.json`), schlichte Streetwear-Ästhetik.
- Mobil-responsiv.
- `README.md` mit Anleitung: GitHub-Pages-Deploy + Formspree-ID eintragen.

## Markenangaben (für Footer)
- Marke: DSTRCTEE · Betreiber: Pauguin UG (haftungsbeschränkt) · Kontakt: info@dstrctee.com
- Rechtstexte/Impressum nicht erfinden — Platzhalter setzen.
