# BOOKIT × Supabase – Vorbereitung

**Aktueller Status:** BOOKIT speichert seine Lernstände lokal im Browser. Es ist **noch keine Supabase-Datenbank verbunden**. Die vorbereitete SQL-Datei \`supabase/schema.sql\` richtet Tabellen und Zugriffsregeln ein, führt aber selbst keine Änderungen an einem Supabase-Projekt durch.

## Wo liegen die Daten?

| Information | Jetzt | Nach Verbindung möglich |
|---|---|---|
| Welten, Aufgaben, Journalfälle, Zahlen und Musterwerte | \`fallstudien-data.js\` und \`fallstudie.html\` im GitHub-Repository | Optional \`bookit_case_definitions\` in Supabase |
| Individuelle Fallstudien-Eingaben, Prüfungen, Hilfen | Browser-\`localStorage\` (separat je Welt/Fall) | \`bookit_progress\` |
| Ergebnisse in den kurzen Übungsmodulen | Browser-\`localStorage\` | \`bookit_training_attempts\` |
| Bilder und Website | GitHub Pages | Weiter GitHub Pages |

**Empfehlung:** Versionierte Fallstudien und Musterwerte zunächst im GitHub-Code behalten. So funktionieren sie auch offline beziehungsweise ohne Supabase-Verbindung, und Änderungen lassen sich testen und zurückrollen. Wenn später neue Aufgaben im Lehrerbereich ohne GitHub-Änderung erstellt werden sollen, können veröffentlichte Fallversionen aus \`bookit_case_definitions\` geladen werden.

## So verbinden wir es sicher

1. Supabase in ChatGPT verbinden (oder ein Supabase-Projekt bereitstellen).
2. Ein Projekt mit EU-Region auswählen und Authentifizierung einrichten. Ohne Anmeldung gibt es keinen verlässlichen geräteübergreifenden Lernstand.
3. \`supabase/schema.sql\` im Supabase SQL Editor kontrolliert ausführen.
4. Zugriff mit mindestens zwei Testnutzern prüfen: Ein Schüler darf NIE die Eingaben des anderen abrufen oder verändern.
5. Frontend um Anmeldung, Cloud-Speichern, Wiederherstellen und Konfliktbehandlung ergänzen. Lokaler Speicher bleibt als Offline-Fallback erhalten.
6. Erst danach eventuell Lehrerdashboard/aggregierte Lernstandsanalysen ergänzen. Namen, Klassenbezüge oder persönliche Daten von Minderjährigen nur mit geeigneter rechtlicher Grundlage und Datenschutzhinweisen verarbeiten.

Im Frontend dürfen höchstens die **Projekt-URL und ein veröffentlichbarer Schlüssel** stehen; **niemals** der \`service_role\`-Schlüssel oder ein Datenbankpasswort. RLS muss aktiviert bleiben. Die veröffentlichten Falllösungen sind Lernmaterial, keine geheimen Prüfungsaufgaben.
