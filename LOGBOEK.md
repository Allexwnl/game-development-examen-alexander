# Logboek — Best Education Pong

## Verantwoording van dit logboek

Opgesteld op **25 september 2026**, achteraf op basis van de projectbestanden. Dit is geen tijdens de eerste ontwikkeling dagelijks bijgehouden logboek.

De bestaande bestanden zijn eerst per bestand vastgelegd en daarna op verzoek heringedeeld in functionele stappen; zie het onderdeel hieronder. De commitdatums worden niet aangepast. De commits tonen de huidige code, niet de oorspronkelijke volgorde of dag waarop iedere regel is geschreven. De nieuwe tussenstappen zijn beperkte technische demonstraties uit de bestaande code. Het zijn geen oorspronkelijke dagversies of door een gebruiker geteste releases.

De datums hieronder zijn gekoppeld aan de datumcontext van de chat. Exacte werktijden en een zelfstandige activiteit per dag zijn niet vastgesteld. De student moet de reconstructie controleren en eventuele correcties met hun bron toevoegen.

## Eerste fase — concept en voorbeeldgame

**Datumcontext:** 18 september 2026. Achteraf gereconstrueerd; geen urenregistratie beschikbaar.

### Werkzaamheden en keuzes

- Het Pong-concept aangeleverd: school tegen student, omhoog/omlaag bewegen, terugkaatsende bal, eerste tot vijf punten.
- Geluid, deeltjes, toenemende balsnelheid, shield en freeze opgenomen in de voorbeeldversie.
- Phaser gekozen voor canvasweergave, toetsenbord en animaties. De botsingen en spelregels zijn gewone JavaScript.
- Een lokale Phaser-kopie gebruikt zodat het spel niet afhankelijk is van een internetverbinding tijdens het spelen.
- de layout gezet naar de venstergrootte en de raket en Best Education-naam toegevoegd. De raket in de voorbeeldmap is een SVG-recreatie van de aangeleverde afbeelding.

## Tweede fase — eigen projectmap en Phaser installeren

**Datumcontext:** 22 september 2026. Achteraf gereconstrueerd; exacte werktijden onbekend.

### Werkzaamheden en keuzes

- Ik koos `game-development-examen-alexander` als eigen projectmap.
- Een npm-project met Phaser ingericht. De huidige bestanden bevatten `package.json`, `package-lock.json`, `node_modules` en een lokale Phaser-kopie in `vendor`.
- Installatie-instructies onderzocht voor Phaser 3.90.0.
- De voorgestelde slogan “Let the best education decide” besproken.

## Derde fase — opbouw controleren en fouten onderzoeken

**Datumcontext:** 25 september 2026. Deze beschrijving is achteraf binnen dezelfde sessie opgesteld.

## Vierde fase — versiebeheer en logboek vastleggen

**Datum:** 25 september 2026.

### Uitgangssituatie

- De nieuwe repository had nog geen commits(was vergeten te pushen naar de git repository).
- De remote verwijst naar `https://github.com/Allexwnl/game-development-examen-alexander.git`.

### Werkzaamheden van deze sessie

- `.gitignore` toegevoegd om `node_modules/` buiten versiebeheer te houden.
- Dit reconstructielogboek en een nog in te vullen testdocument opgesteld.
- Het bestaande werk ingedeeld in onderstaande vijf commits met de werkelijke commitdatum. Er worden geen oude datums of fictieve werkdagen ingesteld.

| Volgorde | Commitbericht | Inhoud |
| --- | --- | --- |
| 1 | Leg npm-project en lokale Phaser-bibliotheek vast | `.gitignore`, npm-bestanden, Phaser en licentie |
| 2 | Documenteer dit logboek en plan gebruikerstests | Dit logboek en het testdocument |

## Herindeling van de geschiedenis — 25 september 2026

1. Basis-HTML, CSS en Phaser klaarzetten
2. School- en studentpaddle ontwerpen in canva
3. Balbeweging en paddlebesturing toevoegen
4. Botsingen, scores, geluid en effecten toevoegen
5. Schild per speler toevoegen
6. Freeze toevoegen en eindversie documenteren

## Testwerk — nog uitvoeren

**Status: Nog geen echte gebruikerstest of hertest in dit logboek geregistreerd.**

## Eerstvolgende werkzaamheden

- [ ] Dit reconstructielogboek lezen en eventuele onjuistheden corrigeren.
- [ ] Eigen bijdragen en leerpunten concreet aanvullen zonder onbekende data of uren te verzinnen.
- [ ] Ontbrekende raket/het afgesproken logo toevoegen als png en bekijken in de browser.
- [ ] GDD en klantgesprekken afronden of aanwezig bewijs toevoegen.
- [ ] De game zelf technisch nalopen en een echte gebruikerstest uitvoeren.
- [ ] Bevindingen oplossen, committen en met dezelfde gebruiker hertesten.

## Sjabloon voor de volgende echte werkdag

```markdown
### [Werkelijke datum] — [Onderwerp]
- Bestede tijd:
- Doel:
- Zelf uitgevoerd:
- Gebruikte hulp en waarvoor:
- Probleem:
- Keuze/oplossing en waarom:
- Getest en werkelijk resultaat:
- Wat heb ik geleerd?
- Commitcode:
- Volgende stap:
```
