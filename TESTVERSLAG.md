# Gebruikerstest en hertest

**Status: nog niet uitgevoerd.** Onderstaande verwachtingen zijn een testplan, geen behaalde resultaten. Dit document hoort bij [LOGBOEK.md](LOGBOEK.md).

## Voorbereiding

- [ ] Controleer of het afgesproken logo aanwezig is; `assets/rocket.svg` ontbrak bij de inventarisatie.
- [ ] Open `index.html` in de browser en controleer de console op fouten.
- [ ] Noteer je huidige versie met `git rev-parse --short HEAD`.
- [ ] Vraag een gebruiker om te spelen. Omdat dit lokale multiplayer is, noteer ook wie de tweede speler is.
- [ ] Laat de gebruiker eerst zelf de instructies lezen; noteer wanneer extra uitleg nodig blijkt.

## Test 1 — echte gegevens na uitvoering

- Datum: 25-9-2026
- Begin- en eindtijd: 15:45 tot 16:01
- Naam tester: Alexander Zoet
- Tweede speler en rol student: Mats van Splunter
- Browser en apparaat: chrome, windows 11, Vivobook_AsusLaptop
- Commitcode: e8eb6be

| ID | Opdracht | Verwacht gedrag | Werkelijke uitkomst / feedback | Geslaagd? |
| --- | --- | --- | --- | --- |
| T01 | Open het spel en start | Speelveld verschijnt; Start game begint de ronde. | getest en werkt | ✓ |
| T02 | Beweeg beide paddles tot aan de randen | W/S en pijlen werken; paddles blijven binnen het veld. | getest werkt | ✓ |
| T03 | Raak bal met midden en rand van paddle | Bal kaatst terug met verschillende hoeken en versnelt tot zijn limiet. | gestest en werkt | ✓ |
| T04 | Mis links en rechts een bal | De juiste tegenstander krijgt precies één punt; volgende ronde kan starten. | getest en werkt | ✓ |
| T05 | Speel tot vijf punten en start opnieuw | Winnaar wordt getoond; nieuwe wedstrijd begint op 0–0. | getest en werkt | ✓ |
| T06 | Activeer een schild en mis een bal | Eén redding; daarna verbruikt; volgende ronde weer beschikbaar. | getest en werkt | ✓ |
| T07 | Gebruik freeze voor beide spelers | Tegenstander wordt blauw en twee seconden actieve speeltijd trager, daarna herstel. | getest en werkt | ✓ |
| T08 | Pauzeer en hervat, ook tijdens freeze | Bal/paddles en freeze-timer stoppen tijdens pauze en gaan daarna verder. | getest en werkt | ✓ |
| T09 | Klik op Start en gebruik daarna spatie/P | Noteer of de bediening na muisklikken duidelijk en correct werkt. | getest en werkt | ✓ |
| T10 | Wissel van tab en wijzig venstergrootte | Spel pauzeert bij focusverlies en de layout blijft bruikbaar. | getest en werkt | ✓ |
| T11 | Luister bij botsingen en scoren | Geluiden spelen na interactie; geen ongewenst hard of aanhoudend geluid. | getest en werkt | ✓ |

tijd en datum van wanneer deze testen zijn uitgevoerd: 25-9-2026, 15:45 tot 16:01

Vraag daarnaast: wat was onduidelijk, wat was leuk en was het spel te makkelijk of moeilijk? Noteer de echte antwoorden hieronder.

**Opmerkingen gebruiker: het spel is erg leuk bedacht en hoe het werkt en het mooie is dat alles ook daadwerkelijk werkt. Het is leuk dat je een schild en freeze hebt toegevoegd.**

## Verwerking van bevindingen

| Bevinding / test-ID | Mijn besluit en reden | Uitgevoerde wijziging | Commitcode |
| er zijn geen bugs gevonden tijdens het testen | — | — | — |

## Hertest — met dezelfde gebruiker

hertest 
