# DSTRCTEE Archiv

Statische **Archiv-/Pause-Seite** des Berliner Streetwear-Projekts **DSTRCTEE**.

DSTRCTEE stand für ein Shirt pro Kiez, jedes Motiv in Zusammenarbeit mit lokalen
Künstler:innen aus dem jeweiligen Berliner Bezirk. Das Projekt ist aktuell
**pausiert**: Diese Seite ersetzt den ehemaligen Shop als Archiv. Es gibt
**keinen Verkauf, keinen Warenkorb und keinen Checkout**: statt „Kaufen" lässt
sich nur ein E-Mail-Interesse hinterlassen.

DSTRCTEE ist aus dem Funpreneur-Projekt districtee an der Freien Universität Berlin im Wintersemester 2023/24 hervorgegangen. Das damalige Team wurde im Rahmen des Kurses [ausgezeichnet](https://www.wiwiss.fu-berlin.de/fachbereich/bwl/pwo/gersch/aktuelles/35-Funpreneur_WiSe23-24.html) und von der Berliner Sparkasse [vorgestellt](https://www.berliner-sparkasse.de/de/home/ihre-sparkasse/gut-fuer-berlin/vielfaltsserie-berlin-ist-bunt/Vielfalt_Wirtschaft.html#:~:text=T%2DShirt%2DHersteller-,DistricTee,-bringt%20Kunst%20von).

## Technik

- Reines **HTML/CSS/JS**, kein Framework, kein Backend, keine Build-Tools.
- Gehostet als statische Seite über **GitHub Pages**.
- Alle Pfade relativ, voll responsiv.
- Produktdaten der 8 Tees liegen in `produkte.json`.

## Aufbau

| Pfad | Inhalt |
|------|--------|
| `index.html` | Startseite: Hero, Tee-Übersicht, Newsletter |
| `shop.html` | Übersicht aller Tees |
| `produkt.html` | Produktdetail (dynamisch per `?handle=…`) |
| `ueber-uns.html`, `artists.html`, `kontakt.html` | Statische Seiten |
| `impressum.html`, `datenschutz.html` | Rechtliches |
| `produkte.json` | Datenquelle der Produkte |
| `assets/` | CSS, JS, Logo |
| `Produktbilder/`, `DesignbilderWebseite/` | Bildmaterial |

## Lokal ansehen

Der Produktdaten-Abruf (`fetch`) benötigt einen lokalen Webserver:

```bash
python -m http.server 8000
# danach: http://localhost:8000
```

## Marke

DSTRCTEE | info@dstrctee.com
