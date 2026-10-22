/* BOOKIT Fallstudien · versionierte, fiktive Geschäftsfälle.
   Beträge und Musterlösungen sind öffentlich sichtbar (Schüleranwendung).
   Sicherheitsrelevante Zugangsdaten gehören NICHT in diese Datei.
   Varianten verändern niemals gespeicherte Basisfälle. */
"use strict";
window.BOOKIT_CASE_META={
 grundlagen:{title:"Basisfall",subtitle:"7 Buchungen · ideal zum Einstieg",level:"Einfach"},
 verlust:{title:"Krisenfall",subtitle:"9 Buchungen · wenn nicht alles nach Plan läuft",level:"Mittel"},
 challenge:{title:"Die grosse Challenge",subtitle:"14 Buchungen · zusätzliche Konten & Abschreibungen",level:"Schwer"}
};
window.BOOKIT_STORY_PROFILES={
 Fussball:{event:"Das grosse Derby im St. Jakob-Park",product:"limitierte FCB-Fanartikel",place:"Fanshop am Stadion",shock:"Ein Teil der Lieferung trifft zu spät ein, und mehrere Kundinnen und Kunden verlangen ihr Geld zurück",highlight:"Eine spontane Choreo-Aktion sorgt doch noch für einen Andrang",loan:"eine zusätzliche Verkaufsfläche",closing:"Das Derby ist vorbei: Deine Zahlen entscheiden, ob sich der grosse Aufwand für die Fanshop-Aktion gelohnt hat."},
 Mode:{event:"Der Launch einer limitierten Sneaker-Kollektion",product:"Sneakers und Laufbekleidung",place:"On-Pop-up-Store",shock:"Ein verregnetes Launch-Wochenende schreckt die Kundschaft ab",highlight:"Ein viraler Laufclub-Beitrag bringt unerwartet viele Bestellungen",loan:"die neue Pop-up-Fläche",closing:"Die Launch-Woche ist vorbei. War der Social-Media-Hype auch finanziell ein Erfolg?"},
 Gaming:{event:"Ein E-Sports-Final mit ausverkaufter Gaming-Arena",product:"Headsets, Controller und Gamer-Zubehör",place:"fiktiver Digitec-Pop-up",shock:"Ein Turnier fällt aus und einige Bestellungen werden storniert",highlight:"Ein überraschendes Finalspiel löst einen Ansturm auf die Controller aus",loan:"einen zweiten Verkaufsstand",closing:"Das Gaming-Final ist gespielt. Du kannst jetzt zeigen, ob das Pop-up wirklich rentabel war."},
 Gastronomie:{event:"Das Food-Festival am Rhein",product:"vegane Bowls und Festival-Menüs",place:"fiktiver tibits-Festivalstand",shock:"Heftiger Regen sorgt für tiefe Besucherzahlen und überschüssige Lebensmittel",highlight:"Eine Empfehlung eines bekannten Food-Bloggers bringt neue Gäste",loan:"eine mobile Küche",closing:"Die Festivalstände sind abgebaut. Die Buchhaltung zeigt, was nach dem Festival übrig bleibt."},
 Autos:{event:"Die Premiere eines neuen Elektro-BMW",product:"Fahrzeugzubehör und Probefahrt-Pakete",place:"fiktiver BMW-Showroom",shock:"Ein angekündigter VIP-Abend wird kurzfristig abgesagt",highlight:"Ein überraschendes Probefahrt-Wochenende bringt viele neue Interessierte",loan:"die Eventhalle",closing:"Die Roadshow ist abgeschlossen. Du hast nun den finanziellen Überblick über das gesamte Ereignis."},
 Fitness:{event:"Die Eröffnung eines neuen Workout-Bereichs",product:"Trainingszubehör und Sportpakete",place:"fiktiver update-Fitness-Standort",shock:"Eine Baustelle sperrt kurzfristig den Haupteingang",highlight:"Eine lokale Fitness-Challenge füllt die Trainingskurse",loan:"einen neuen Trainingsbereich",closing:"Die ersten Trainingswochen sind vorbei. Deine Rechnung zeigt, ob die Eröffnung finanziell funktioniert hat."},
 Reisen:{event:"Der Ansturm auf die Herbstferien",product:"Reisezubehör und Servicepakete",place:"fiktiver SWISS-Pop-up-Schalter",shock:"Flugstreichungen führen zu Stornierungen und unerwarteten Zusatzkosten",highlight:"Ein überraschend gefragtes Ferienziel sorgt für Zusatzverkäufe",loan:"einen zusätzlichen Service-Schalter",closing:"Die Reisewelle ist vorbei. Nun lässt sich der Erfolg des fiktiven Verkaufsschalters beurteilen."},
 Beauty:{event:"Der Launch eines geheimnisvollen neuen Parfums",product:"Parfum-Sets und Kosmetikboxen",place:"fiktive Import-Parfumerie-Filiale",shock:"Ein Teil der Produktlieferung verzögert sich und die Launch-Party bleibt schlecht besucht",highlight:"Ein Beauty-Video macht das Parfum über Nacht zum Gesprächsthema",loan:"eine besondere Duft-Testzone",closing:"Die Duftpremiere ist vorbei. Deine Abschlusszahlen zeigen, ob die Aktion gelungen ist."},
 Musik:{event:"Das OpenAir St. Gallen bei wechselhaftem Wetter",product:"Festivalshirts, Caps und Merchandise",place:"fiktiver OpenAir-Merchstand",shock:"Ein Wolkenbruch beschädigt einen Teil des Verkaufsmaterials und schreckt Gäste ab",highlight:"Eine Zugabe der Headliner löst einen zweiten Ansturm auf den Merchstand aus",loan:"einen zusätzlichen Merch-Container",closing:"Der letzte Ton ist verklungen. Du kannst jetzt sagen, ob die Merch-Aktion einen Gewinn erzielt hat."}
};
window.BOOKIT_CREATE_CASE=function(world,id,factor){
 const p=window.BOOKIT_STORY_PROFILES[world]||window.BOOKIT_STORY_PROFILES.Gaming;
 const f=factor||1, val=n=>n*f;
 const amount=n=>"CHF "+new Intl.NumberFormat("de-CH").format(val(n));
 const item=p.product;
 if(id==="verlust"){
  const transactions=[
   {description:"Für "+p.event+" bestellst du "+item+" im Wert von "+amount(4200)+" auf Rechnung. Die Waren werden direkt als Aufwand erfasst.",debit:"Warenaufwand",credit:"Verbindlichkeiten LL",amount:val(4200)},
   {description:"Trotz grosser Erwartungen gehen am "+p.place+" zunächst nur "+amount(1100)+" aus Verkäufen per Bank ein.",debit:"Bank",credit:"Warenertrag",amount:val(1100)},
   {description:"Die Stand- und Raummiete in Höhe von "+amount(1500)+" wird vom Bankkonto überwiesen.",debit:"Mietaufwand",credit:"Bank",amount:val(1500)},
   {description:"Du begleichst "+amount(1800)+" einer offenen Lieferantenrechnung per Banküberweisung.",debit:"Verbindlichkeiten LL",credit:"Bank",amount:val(1800)},
   {description:"Ein Unternehmen kauft "+item+" im Wert von "+amount(600)+" auf Rechnung. Das Geld ist noch nicht eingetroffen.",debit:"Forderungen LL",credit:"Warenertrag",amount:val(600)},
   {description:"Von dieser offenen Kundenrechnung treffen "+amount(200)+" auf dem Bankkonto ein.",debit:"Bank",credit:"Forderungen LL",amount:val(200)},
   {description:"Für einen zusätzlichen Verkaufsaufsteller bezahlst du "+amount(650)+" per Bank. Er zählt zum Mobiliar.",debit:"Mobiliar",credit:"Bank",amount:val(650)},
   {description:p.shock+". Zur Überbrückung werden weitere "+item+" für "+amount(850)+" sofort per Bank bezahlt und direkt als Warenaufwand verbucht.",debit:"Warenaufwand",credit:"Bank",amount:val(850)},
   {description:"Wegen einer Kundenreklamation erstattest du "+amount(180)+" eines bereits per Bank bezahlten Verkaufs zurück. Korrigiere den Warenertrag.",debit:"Warenertrag",credit:"Bank",amount:val(180)}
  ];
  return {id,title:"Krisenfall · "+p.event,story:"Ausgerechnet jetzt wird es schwierig: "+p.shock+". Du leitest die Buchhaltung beim "+p.place+". Nicht jede spektakuläre Aktion endet erfolgreich. Finde mit Journal, T-Konten, Erfolgsrechnung und Schlussbilanz selbst heraus, wie die Krise finanziell ausgeht.",epilogue:p.closing,
    opening:{Bank:val(12000),Mobiliar:val(3000),Eigenkapital:val(15000)},transactions,additionalAccounts:[]};
 }
 if(id==="challenge"){
  const transactions=[
   {description:"Für "+p.event+" kaufst du "+item+" für "+amount(3200)+" auf Rechnung. Buche direkt als Warenaufwand.",debit:"Warenaufwand",credit:"Verbindlichkeiten LL",amount:val(3200)},
   {description:"Der Start ist vielversprechend: Verkäufe über "+amount(5100)+" werden auf das Bankkonto überwiesen.",debit:"Bank",credit:"Warenertrag",amount:val(5100)},
   {description:"Die Raummiete für "+p.place+" von "+amount(1000)+" geht per Bank weg.",debit:"Mietaufwand",credit:"Bank",amount:val(1000)},
   {description:"Ein Firmenkunde bestellt Waren für "+amount(1850)+" auf Rechnung.",debit:"Forderungen LL",credit:"Warenertrag",amount:val(1850)},
   {description:"Der Firmenkunde überweist einen Teil seiner Rechnung: "+amount(1000)+".",debit:"Bank",credit:"Forderungen LL",amount:val(1000)},
   {description:"Du überweist dem Lieferanten "+amount(2100)+" zur Begleichung einer offenen Rechnung.",debit:"Verbindlichkeiten LL",credit:"Bank",amount:val(2100)},
   {description:"Neue Einrichtung für die Verkaufsfläche kostet "+amount(1350)+" und wird per Bank bezahlt. Sie gehört zum Mobiliar.",debit:"Mobiliar",credit:"Bank",amount:val(1350)},
   {description:"Am mobilen Verkaufsschalter gehen "+amount(750)+" in BAR ein. Verwende das Konto Kasse.",debit:"Kasse",credit:"Warenertrag",amount:val(750)},
   {description:"Von der Kasse zahlst du "+amount(500)+" auf das Bankkonto ein.",debit:"Bank",credit:"Kasse",amount:val(500)},
   {description:"Die gebrauchte Verkaufseinrichtung verliert an Wert: Du verbuchst "+amount(450)+" Abschreibungen auf Mobiliar.",debit:"Abschreibungen",credit:"Mobiliar",amount:val(450)},
   {description:"Zur Finanzierung von "+p.loan+" erhältst du ein langfristiges Darlehen von "+amount(2500)+" auf die Bank.",debit:"Bank",credit:"Darlehen",amount:val(2500)},
   {description:"Weitere "+item+" werden für "+amount(1600)+" per Bank gekauft und direkt als Warenaufwand erfasst.",debit:"Warenaufwand",credit:"Bank",amount:val(1600)},
   {description:"Nach einer Reklamation erstattest du "+amount(350)+" per Bank. Der Warenertrag wird dadurch kleiner.",debit:"Warenertrag",credit:"Bank",amount:val(350)},
   {description:p.highlight+". Die Kundschaft überweist für zusätzliche Verkäufe "+amount(2150)+" auf die Bank.",debit:"Bank",credit:"Warenertrag",amount:val(2150)}
  ];
  return {id,title:"Challenge · "+p.event,story:p.highlight+". Gleichzeitig müssen bei "+p.place+" die Waren, die Kasse, ein Darlehen und Abschreibungen bewältigt werden. Deine Aufgabe: Behalte trotz überraschenden Ereignissen den Überblick und ermittle den wirtschaftlichen Erfolg. Alle Vorgänge sind fiktiv.",epilogue:p.closing,
   opening:{Kasse:val(700),Bank:val(12000),Mobiliar:val(3000),Eigenkapital:val(15700)},
   transactions,additionalAccounts:[{name:"Kasse",number:"1000",category:"asset"},{name:"Darlehen",number:"2450",category:"liability"},{name:"Abschreibungen",number:"6800",category:"expense"}]};
 }
 return null;
};
