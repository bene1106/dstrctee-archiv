# Briefing: DISTRICTEE Archiv-/Pause-Seite (statisch, für GitHub Pages)

## Ziel
Statische Website (reines HTML/CSS/JS, kein Framework, kein Backend), die den bisherigen Shopify-Store **DSTRCTEE** als Archiv nachbildet. Der Shop wird gekündigt; diese Seite ersetzt ihn und läuft kostenlos auf **GitHub Pages**.

**Kein Kauf, kein Warenkorb, kein Checkout, kein Preis-zum-Bestellen.** Statt Kaufen gibt es nur ein E-Mail-Interessenfeld. Auf der Seite muss klar stehen, dass das Projekt **pausiert** ist.

## WICHTIG: Design
**Nutze das `frontend-design`-Skill/Plugin** für hochwertiges, originalgetreues Design. Das Ergebnis soll wie der echte Shop aussehen, nicht wie eine generische Kopie.

Als exakte Design-Vorlage liegen 5 Screenshots des echten Shops bei:
- `design_start.png` — Header, Banner, Hero, Anfang Produktgrid
- `design_grid.png` — Produktgrid + 3-Spalten-Sektion
- `design_footer.png` — Newsletter-Block + Footer
- `design_produkt1.png` — Produktseite oben (Galerie, Titel, Beschreibung, Größentabelle)
- `design_produkt2.png` — Produktseite unten (weitere Galeriebilder, Material/GPSR)

Bau Layout, Typografie, Weißraum und Farben exakt danach nach. Pink-Akzent: **#f4abf3**.

### Layout-Details (aus den Screenshots)
- **Header:** Nav links (Tees · Pullis · Kontakt · Unsere Artists · Über uns), Logo zentriert, Such-/Account-/Cart-Icons rechts (Cart-Icon optional rein dekorativ, ohne Funktion).
- **Pinker Banner** direkt unter dem Header: `free shipping ✦ designed in berlin ✦ 20% local artist commission`
- **Hero:** großes Foto, zentriert „berlin's soul", darunter „20% der Gewinne geht an die artists", Button „Jetzt entdecken" (weiß, outline).
- **Produktgrid:** 4 Spalten, Titel + „Von €X"/„€X" darunter.
- **3-Spalten-Sektion:** „Fair & nachhaltig" / „Hochwertige Stoffe" / „Echte Kunst verdient Qualität" mit den Texten aus design_grid.png.
- **Newsletter-Block „GOOD NEWS":** grauer Hintergrund, zentriert, E-Mail-Feld.
- **Footer:** 4 Spalten mit Emoji-Headern + Links:
  - 🎨 **Hilfe & Support:** FAQ, Rückgabe & Umtausch, Kontakt, Größenberatung, Künstler:in werden
  - 🎁 **DSTRCTEE entdecken:** Über uns, Unsere Künstler:innen, Alle Bezirke, Gutscheine, Nachhaltigkeit
  - 💳 **Bezahlung & Versand:** Zahlungsmethoden, Versandkosten & Lieferzeiten
  - 📋 **Rechtliches:** Impressum, AGB, Widerrufsrecht, Datenschutzerklärung
  - Darunter: Instagram- + TikTok-Icon, „© 2026, DSTRCTEE"
  - (Links, für die es keine Seite gibt, als Platzhalter/`#` belassen.)
- **Produktseite:** Bildergalerie links, rechts Titel/Preis/Größenauswahl/Beschreibung/Größentabelle wie in design_produkt1+2.png. **Statt „In den Warenkorb legen": E-Mail-Interessenfeld** („Interesse? Trag deine E-Mail ein.").

### Logo
Echte Logodatei: **`DesignbilderWebseite/9.png`**. Überall verwenden, das bisher nachgebaute Logo vollständig ersetzen.

## Vorhandene Dateien
- `products_export_1.csv` — Produktdaten (Handle, Title, Body (HTML), Variant Price, Image Src, Image Position).
- `produkte.json` — bereits erzeugt: die 8 Tees mit Titel, Beschreibung, Artist, Bezirk, Preis, Bildern. Falls vorhanden, weiterverwenden.
- `Produktbilder/` — Produktbilder (Zuordnung steht in produkte.json / CSV).
- `DesignbilderWebseite/` — Layout-Bilder inkl. Logo `9.png`, Hero-Foto, Artist-Fotos.
- `design_start.png`, `design_grid.png`, `design_footer.png`, `design_produkt1.png`, `design_produkt2.png` — Design-Referenzen.
- `theme_export__...dawn.../` — altes Shopify-Theme, nur ergänzende Stil-/Textreferenz.

## Produkte
Nur die **8 veröffentlichten Tees**: F-Hain, Berlin, Köpenick, Bergmannkiez, Sonnenallee, Wedding, Turmstraße, Schöneberg. Hoodies, Zip-Hoodie, Special Edition und Gutschein ignorieren (nie released).

## E-Mail-Erfassung
Kein Backend auf GitHub Pages. **Formspree** (Platzhalter für Form-ID einbauen) mit Fallback `mailto:info@dstrctee.com`.

## Technik
- Reines HTML/CSS/JS, keine Build-Tools.
- Alle Pfade relativ (läuft unter `username.github.io/repo/`).
- Mobil-responsiv.
- Lokales Git-Repo von Anfang an, sauber committen.
- GitHub-Push + Pages-Aktivierung + Formspree-ID = letzter Schritt, als Schritt-für-Schritt-Anleitung in die `README.md` (noch nicht ausführen).

## Markenangaben (Footer)
Marke: DSTRCTEE · Betreiber: Pauguin UG (haftungsbeschränkt) · Kontakt: info@dstrctee.com
Impressum/Datenschutz nicht erfinden — Platzhalter setzen, Nutzer ergänzt.
