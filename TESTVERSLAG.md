# Gebruikerstest en hertest — zelf invullen

**Status: nog niet uitgevoerd.** Onderstaande verwachtingen zijn een testplan, geen behaalde resultaten. Dit document hoort bij [LOGBOEK.md](LOGBOEK.md).

## Voorbereiding

- [ ] Controleer of het afgesproken logo aanwezig is; `assets/rocket.svg` ontbrak bij de inventarisatie.
- [ ] Open `index.html` in de browser en controleer de console op fouten.
- [ ] Noteer je huidige versie met `git rev-parse --short HEAD`.
- [ ] Vraag een gebruiker om te spelen. Omdat dit lokale multiplayer is, noteer ook wie de tweede speler is.
- [ ] Laat de gebruiker eerst zelf de instructies lezen; noteer wanneer extra uitleg nodig blijkt.

## Test 1 — echte gegevens na uitvoering

- Datum: **[invullen]**
- Begin- en eindtijd: **[invullen]**
- Naam tester: **[invullen]**
- Tweede speler en rol student: **[invullen]**
- Browser en apparaat: **[invullen]**
- Commitcode: **[invullen]**

| ID | Opdracht | Verwacht gedrag | Werkelijke uitkomst / feedback | Geslaagd? |
| --- | --- | --- | --- | --- |
| T01 | Open het spel en start | Speelveld verschijnt; Start game begint de ronde. | Nog niet getest | — |
| T02 | Beweeg beide paddles tot aan de randen | W/S en pijlen werken; paddles blijven binnen het veld. | Nog niet getest | — |
| T03 | Raak bal met midden en rand van paddle | Bal kaatst terug met verschillende hoeken en versnelt tot zijn limiet. | Nog niet getest | — |
| T04 | Mis links en rechts een bal | De juiste tegenstander krijgt precies één punt; volgende ronde kan starten. | Nog niet getest | — |
| T05 | Speel tot vijf punten en start opnieuw | Winnaar wordt getoond; nieuwe wedstrijd begint op 0–0. | Nog niet getest | — |
| T06 | Activeer een schild en mis een bal | Eén redding; daarna verbruikt; volgende ronde weer beschikbaar. | Nog niet getest | — |
| T07 | Gebruik freeze voor beide spelers | Tegenstander wordt blauw en twee seconden actieve speeltijd trager, daarna herstel. | Nog niet getest | — |
| T08 | Pauzeer en hervat, ook tijdens freeze | Bal/paddles en freeze-timer stoppen tijdens pauze en gaan daarna verder. | Nog niet getest | — |
| T09 | Klik op Start en gebruik daarna spatie/P | Noteer of de bediening na muisklikken duidelijk en correct werkt. | Nog niet getest | — |
| T10 | Wissel van tab en wijzig venstergrootte | Spel pauzeert bij focusverlies en de layout blijft bruikbaar. | Nog niet getest | — |
| T11 | Luister bij botsingen en scoren | Geluiden spelen na interactie; geen ongewenst hard of aanhoudend geluid. | Nog niet getest | — |
| T12 | Bekijk branding en lees de instructies | Logo/naam/slogan volgens afspraken; gebruiker begrijpt bediening. | Nog niet getest | — |

Vraag daarnaast: wat was onduidelijk, wat was leuk en was het spel te makkelijk of moeilijk? Noteer de echte antwoorden hieronder.

**Opmerkingen gebruiker:** [invullen]

## Verwerking van bevindingen

| Bevinding / test-ID | Mijn besluit en reden | Uitgevoerde wijziging | Commitcode |
| --- | --- | --- | --- |
| [invullen na test] | [oplossen / geen wijziging, met reden] | [wat is echt veranderd?] | [invullen] |

Als er geen probleem wordt gevonden, noteer dat. Verzin geen bugs om dit onderdeel te vullen.

## Hertest — met dezelfde gebruiker

- Datum: **[invullen]**
- Begin- en eindtijd: **[invullen]**
- Naam tester, dezelfde als test 1: **[invullen]**
- Tweede speler: **[invullen]**
- Browser en apparaat: **[invullen]**
- Nieuwe commitcode: **[invullen]**

| Herhaalde test-ID | Eerdere bevinding | Werkelijke uitkomst na wijziging | Opgelost? / vervolg |
| --- | --- | --- | --- |
| [invullen] | [invullen] | [invullen na hertest] | [invullen] |

**Conclusie van de tester:** [invullen]

**Eigen conclusie en nog openstaande punten:** [invullen]

Voeg na iedere uitgevoerde sessie een echte logboeknotitie toe en commit het ingevulde verslag. Dit sjabloon op zichzelf is nog geen examengeldig testresultaat.
