/* BOOKIT · modularer Themen- und Kontenkatalog
   Neue Themen später als eigenständige Module ergänzen.
   Zu jedem Lernformat werden passende Teilmengen der Konten verwendet.
   Bewusst ohne MWST-, Abgrenzungs- oder Abschreibungskonten im Grundlagentraining. */
"use strict";
window.BOOKIT_MODULES = {
  version:1,
  topics:[
    {
      id:"doppelte-buchhaltung",
      title:"Grundlagen der doppelten Buchhaltung",
      summary:"Kontenarten, Bilanz, Erfolgsrechnung, Soll und Haben sowie Buchungssätze.",
      status:"active",
      activities:["lernen","trainieren","fallstudien","challenges","gemischt"],
      exercises:[
        {id:"konten",title:"Kontenarten erkennen",description:"Aktiven, Passiven, Aufwand und Ertrag",levels:["einfach","mittel","schwer"]},
        {id:"bilanz",title:"Bilanzkonten zuordnen",description:"Vermögen, Schulden und Eigenkapital",levels:["einfach","mittel","schwer"]},
        {id:"erfolg",title:"Erfolgskonten zuordnen",description:"Aufwände und Erträge unterscheiden",levels:["einfach","mittel","schwer"]},
        {id:"bewegungen",title:"Soll oder Haben?",description:"Veränderungen von Konten bestimmen",levels:["einfach","mittel","schwer"]},
        {id:"buchungen",title:"Buchungssätze bilden",description:"Sollkonto, Habenkonto und Betrag",levels:["einfach","mittel","schwer"]}
      ],
      lessons:[
        {title:"Wozu braucht es die doppelte Buchhaltung?",text:"Jeder Geschäftsfall wird auf mindestens zwei Konten erfasst: einmal im Soll und einmal im Haben. Die Summe aller Sollbuchungen entspricht der Summe aller Habenbuchungen."},
        {title:"Die vier Kontenarten",text:"Aktiven und Passiven zeigen Vermögen und Finanzierung zu einem bestimmten Zeitpunkt. Aufwände und Erträge erfassen den Erfolg während einer Periode."},
        {title:"Soll und Haben",text:"Bei Aktiv- und Aufwandkonten stehen Zunahmen im Soll. Bei Passiv- und Ertragskonten stehen Zunahmen im Haben. Abnahmen stehen jeweils auf der Gegenseite."},
        {title:"Von der Bilanz zum Abschluss",text:"Aus der Eröffnungsbilanz entstehen Konten mit Anfangsbeständen. Geschäftsfälle werden im Journal und in den T-Konten gebucht. Die Erfolgsrechnung ermittelt den Gewinn oder Verlust; die Schlussbilanz zeigt die neue Vermögens- und Finanzierungslage."}
      ]
    }
  ],
  activities:[
    {id:"lernen",title:"Lernen",icon:"📖",description:"Regeln, Beispiele und Kontenplan verstehen"},
    {id:"trainieren",title:"Trainieren",icon:"✏️",description:"Eine Fertigkeit gezielt üben"},
    {id:"fallstudien",title:"Fallstudien",icon:"💼",description:"Vollständige Unternehmensbuchhaltungen bearbeiten"},
    {id:"challenges",title:"Challenges",icon:"🏆",description:"Fehlerdetektiv und anspruchsvolle Anwendungen"},
    {id:"gemischt",title:"Gemischte Aufgaben",icon:"🔀",description:"Verschiedene Fertigkeiten ohne Vorgabe kombinieren"}
  ],
  // Kennungen für Übungszwecke. Schweizer Kontenrahmen KMU, Schulversion.
  accounts:[
    {id:"Kasse",number:"1000",kind:"Aktiv",level:1},
    {id:"Bank",number:"1020",kind:"Aktiv",level:1},
    {id:"Forderungen LL",number:"1100",kind:"Aktiv",level:1},
    {id:"Warenvorrat",number:"1200",kind:"Aktiv",level:2},
    {id:"Maschinen",number:"1500",kind:"Aktiv",level:2},
    {id:"Mobiliar",number:"1510",kind:"Aktiv",level:1},
    {id:"Informatik",number:"1520",kind:"Aktiv",level:2},
    {id:"Fahrzeuge",number:"1530",kind:"Aktiv",level:2},
    {id:"Verbindlichkeiten LL",number:"2000",kind:"Passiv",level:1},
    {id:"Darlehen",number:"2450",kind:"Passiv",level:2},
    {id:"Eigenkapital",number:"2800",kind:"Passiv",level:1},
    {id:"Warenertrag",number:"3200",kind:"Ertrag",level:1},
    {id:"Dienstleistungsertrag",number:"3400",kind:"Ertrag",level:2},
    {id:"Warenaufwand",number:"4200",kind:"Aufwand",level:1},
    {id:"Lohnaufwand",number:"5000",kind:"Aufwand",level:2},
    {id:"Mietaufwand",number:"6000",kind:"Aufwand",level:1,caption:"Raumaufwand"},
    {id:"Unterhaltsaufwand",number:"6100",kind:"Aufwand",level:3},
    {id:"Fahrzeugaufwand",number:"6200",kind:"Aufwand",level:3},
    {id:"Verwaltungsaufwand",number:"6500",kind:"Aufwand",level:3},
    {id:"Werbeaufwand",number:"6600",kind:"Aufwand",level:2},
    {id:"Zinsaufwand",number:"6900",kind:"Aufwand",level:2,caption:"Finanzaufwand"},
    {id:"Zinsertrag",number:"6950",kind:"Ertrag",level:3,caption:"Finanzertrag"}
  ],
  caseVariants:[
    {id:"grundlagen",title:"Basisfall",description:"7 Geschäftsfälle, überschaubarer Kontenplan",level:"Einfach"},
    {id:"verlust",title:"Krisenfall",description:"9 Geschäftsfälle, Jahresverlust",level:"Mittel"},
    {id:"challenge",title:"Grosse Challenge",description:"14 Geschäftsfälle, zusätzliche Konten",level:"Schwer"}
  ]
};
