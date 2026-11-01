# BOOKIT: modulare Lernplattform

## Aktueller Umfang

BOOKIT ist bewusst mit **einem aktiven Thema** gestartet: **Grundlagen der doppelten Buchhaltung**. Die Reihenfolge in der Schüleransicht ist

1. Themenwelt (neun bestehende Welten)
2. Rechnungswesenthema (aktuell nur Grundlagen der doppelten Buchhaltung)
3. Aktivität: Lernen, Trainieren, Fallstudien, Challenges, Gemischte Aufgaben
4. Aufgabenart (wenn bei dieser Aktivität sinnvoll)
5. Schwierigkeit (wenn sinnvoll)

**Mein Fortschritt** bleibt in der Hauptnavigation.

## Dateien und Verantwortung

| Datei | Aufgabe |
|---|---|
| `bookit-module-catalog.js` | Themenverzeichnis, Übungen, Lerntexte, Hauptbereiche, Kontenkatalog und Schwierigkeitsvorgaben |
| `index.html` | Gemeinsame Navigation, Übungsoberfläche und wiederverwendbare Aufgabenprüfer |
| `fallstudien-data.js` | Zahlen, Journalfälle und Texte der Fallstudien |
| `fallstudie.html` | Kompletter Buchhaltungsablauf (Eröffnungsbilanz, Journal, T-Konten, Erfolgsrechnung, Schlussbilanz) |
| `tests/bookit-modules.test.cjs` | Themen, Konten, Aufgabenformen und Kombinationen testen |
| `tests/bookit-cases.test.cjs` | Buchungs- und Abschlusslogik sämtlicher Fälle testen |
| `supabase/schema.sql` | Vorbereitung für spätere sichere Cloudspeicherung, noch keine Live-Verbindung |

## Konten im Grundlagenmodul

Der Kontenkatalog umfasst **22 verschiedene Konten** nach einem vereinfachten Schweizer KMU-Kontenrahmen, mit Nummer, Kontenart und Einstiegsstufe.

- **Aktivkonten:** Kasse 1000, Bank 1020, Forderungen LL 1100, Warenvorrat 1200, Maschinen 1500, Mobiliar 1510, Informatik 1520, Fahrzeuge 1530.
- **Passivkonten:** Verbindlichkeiten LL 2000, Darlehen 2450, Eigenkapital 2800.
- **Aufwandkonten:** Warenaufwand 4200, Lohnaufwand 5000, Mietaufwand 6000, Unterhaltsaufwand 6100, Fahrzeugaufwand 6200, Verwaltungsaufwand 6500, Werbeaufwand 6600, Zinsaufwand 6900.
- **Ertragskonten:** Warenertrag 3200, Dienstleistungsertrag 3400, Zinsertrag 6950.

Der gesamte Kontenpool ist **kein Pflichtprogramm in jeder Übung**. Leichte Aufgaben verwenden nur Stufe-1-Konten. Mittel und schwer erweitern den Pool; Übungsfragen wählen passende Konten nach Aufgabenart und wechseln beim erneuten Training. Die vollständigen Fallstudien behalten ihre eigenen, kleineren Kontenpläne.

Keine MWST-, Abgrenzungs- oder Abschreibungstheorie im separaten **Grundlagentraining**. Die bereits bestehende grosse Fallstudien-Challenge enthält weiterhin eine Abschreibung; diese bleibt aus Kompatibilitätsgründen unverändert und kann später einem passenden Folgemodul zugeordnet werden.

## Wie wir später ein neues Thema ergänzen

1. Lehrplan und Lernziele für das Thema festlegen.
2. In `bookit-module-catalog.js` einen weiteren Eintrag unter `topics` mit eigener Kennung, Titel, Beschreibung und verfügbaren Aktivitäten anlegen. Die Themenwahl übernimmt diesen automatisch.
3. Geeignete Konten, Übungsdaten, Lerntexte und Schwierigkeit pro Aufgabenart definieren. Bereits vorhandene Prüfer (Kontenarten, Soll/Haben, Buchungssatz, Fehlerdetektiv) wiederverwenden; einen neuen Prüfer nur dann programmieren, wenn die Aufgabenform wirklich neu ist.
4. Bei Bedarf eine neue Fallstudie für das Thema als eigene Datenquelle ergänzen. Bestehende Fallstudien nicht ungeplant verändern, da Lernstände sonst nicht mehr zu den Musterwerten passen.
5. Alle Tests lokal mit `node --test tests/*.test.cjs` durchführen. Erst danach live stellen.
6. Lernfortschritt pro Thema und Aufgabenart speichern; bisherige Schlüssel und Fallstudien-Eingaben erhalten.

**Hinweis zur Erweiterbarkeit:** Die Themen- und Navigationsstruktur sind modular. Für völlig neue Eingabeformen oder komplexere Rechnungswesenthemen braucht es weiterhin gezielte Programmergänzungen. Es ist nicht beabsichtigt, alle künftigen Themen bereits jetzt technisch oder inhaltlich vorwegzunehmen.

## Datenspeicherung

Aktuell speichert die Webseite Lernfortschritt lokal im Browser. Die Export-/Import-Funktion bleibt bestehen. Supabase wird erst nach Einrichtung eines Projekts, Anmeldung und getesteten Row-Level-Security-Regeln verbunden. Aufgaben und Musterlösungen sind Lernmaterial im öffentlichen Repository, keine geheimen Prüfungen.
