# Logboek — Best Education Pong

## Verantwoording van dit logboek

Opgesteld op **25 september 2026**, achteraf op basis van de projectbestanden en de chat met de AI-assistent. Dit is geen tijdens de eerste ontwikkeling dagelijks bijgehouden logboek. De student gaf aan tussentijds niet te hebben gecommit. Bij controle had deze repository nog geen commits.

De bestaande bestanden zijn eerst per bestand vastgelegd en daarna op verzoek heringedeeld in functionele stappen; zie het onderdeel ?Herindeling van de geschiedenis? hieronder. De commitdatums worden niet aangepast. De commits tonen de huidige code, niet de oorspronkelijke volgorde of dag waarop iedere regel is geschreven. De nieuwe tussenstappen zijn beperkte technische demonstraties uit de bestaande code. Het zijn geen oorspronkelijke dagversies of door een gebruiker geteste releases.

De datums hieronder zijn gekoppeld aan de datumcontext van de chat. Exacte werktijden en een zelfstandige activiteit per dag zijn niet vastgesteld. De student moet de reconstructie controleren en eventuele correcties met hun bron toevoegen.

## Gebruikte hulp en eigen bijdrage

- De student leverde het spelconcept en de schets aan, koos Phaser/JavaScript/HTML/CSS en vroeg om begrijpelijke code.
- De AI-assistent genereerde een groot deel van de eerste game in de aparte map `Game_Design_Document`, hielp met wijzigingen, uitleg, de leergids en het examenactieplan.
- De student koos deze nieuwe projectmap om vanuit het voorbeeld te oefenen en code over te typen. Uit alleen de bestanden blijkt niet welke regels zelfstandig zijn geschreven of overgetypt.
- De student werkte met de terminal, meldde problemen en bepaalde onder andere dat de fullscreen- en geluidsknoppen moesten verdwijnen.
- De AI-assistent onderzocht fouten en verwijderde die knoppen met bijbehorende code op verzoek. Ook dit logboek en de huidige commitindeling zijn met AI-hulp gemaakt.
- Phaser is een externe bibliotheek. `vendor/LICENSE.md` bevat de licentie. Deze bibliotheekcode is niet door de student of de assistent geschreven.

Bespreek met de docent welke AI-hulp binnen het examen is toegestaan. De leerpagina en deze reconstructie zijn geen bewijs dat alle code zelfstandig is ontwikkeld.

## Eerste fase — concept en voorbeeldgame

**Datumcontext:** 18 september 2026. Achteraf gereconstrueerd; geen urenregistratie beschikbaar.

### Werkzaamheden en keuzes

- Het Pong-concept aangeleverd: school tegen student, omhoog/omlaag bewegen, terugkaatsende bal, eerste tot vijf punten.
- Geluid, deeltjes, toenemende balsnelheid, shield en freeze opgenomen in de voorbeeldversie.
- Phaser gekozen voor canvasweergave, toetsenbord en animaties. De botsingen en spelregels zijn gewone JavaScript.
- De eerste versie is met AI-hulp opgebouwd in `Game_Design_Document` met aparte HTML, CSS en JavaScript.
- Een lokale Phaser-kopie gebruikt zodat het spel niet afhankelijk is van een internetverbinding tijdens het spelen.
- Op verzoek de layout uitgebreid naar de venstergrootte en de raket en Best Education-naam toegevoegd. De raket in de voorbeeldmap is een SVG-recreatie van de aangeleverde afbeelding.
- Een Nederlandstalige leergids en een examenactieplan gemaakt met AI-hulp.

### Beschikbaar bewijs en beperkingen

De chat en de bestanden in de voorbeeldmap onderbouwen deze werkzaamheden. Daar zijn door de assistent technische controles uitgevoerd, waaronder syntaxiscontroles en controles van spelregels. Dit zijn geen door de student uitgevoerde gebruikerstests en geen testbewijs voor iedere latere versie in deze nieuwe map.

### Open punten uit deze fase

Officiële backlog, GDD-goedkeuring, slogan/brandingafspraken, klantgesprekken en gebruikerstests moeten nog worden bevestigd of gedocumenteerd.

## Tweede fase — eigen projectmap en Phaser installeren

**Datumcontext:** 22 september 2026. Achteraf gereconstrueerd; exacte werktijden onbekend.

### Werkzaamheden en keuzes

- De student koos `game-development-examen-alexander` als eigen projectmap om vanuit het voorbeeld te leren.
- Een npm-project met Phaser ingericht. De huidige bestanden bevatten `package.json`, `package-lock.json`, `node_modules` en een lokale Phaser-kopie in `vendor`.
- Installatie-instructies ontvangen voor Phaser 3.90.0 en uitleg gekregen over `phaser.min.js`: een gecomprimeerde bibliotheek die niet overgetypt hoeft te worden.
- De voorgestelde slogan “Let the best education decide” besproken. Die staat in de spelcode; goedkeuring als officiële slogan is niet vastgelegd.

### Probleem en oplossing

De terminal was Git Bash, terwijl de ontvangen kopieeropdracht `Copy-Item` voor PowerShell bedoeld was. Daardoor verscheen `command not found`. Ook bestond de map `vendor` al.

De assistent legde het verschil uit en gaf de Bash-opdrachten:

```bash
mkdir -p vendor
cp node_modules/phaser/dist/phaser.min.js vendor/
cp node_modules/phaser/LICENSE.md vendor/
```

Op 25 september zijn beide bestanden in `vendor` aangetroffen. De exacte uitvoeringstijd van het kopiëren is niet vastgelegd.

### Zelf aan te vullen

- Welke onderdelen heb ik deze dag daadwerkelijk zelf geschreven of overgetypt?
- Welke code begrijp ik inmiddels en welke nog niet?
- Hoeveel tijd heb ik besteed, als ik dat nog betrouwbaar kan achterhalen?

## Derde fase — opbouw controleren en fouten onderzoeken

**Datumcontext:** 25 september 2026. Deze beschrijving is achteraf binnen dezelfde sessie opgesteld.

### Eerste probleem: geen speelveld

In een eerdere tussenversie verwees de Phaser-configuratie naar `update`, terwijl die functie nog ontbrak. Ook andere functies waren nog niet aanwezig. De HTML bevatte twee elementen met `id="game"` en miste elementen die het script verwachtte.

De assistent legde uit dat JavaScript bij een ontbrekende functie kan stoppen en dat een HTML-id uniek moet zijn. In de later bekeken versie waren de functies en de betreffende HTML-elementen aanwezig.

### Tweede probleem: gamecode wordt niet geladen

De HTML verwees naar `game.js`, maar het bestand stond in `script/game.js`. De assistent wees dit aan en legde uit dat een relatief pad vanaf het HTML-bestand wordt opgelost. De huidige HTML bevat:

```html
<script src="vendor/phaser.min.js" defer></script>
<script src="script/game.js" defer></script>
```

De assistent wijzigde deze verwijzing op dat moment niet zelf. De huidige bestanden laten zien dat het juiste pad inmiddels is opgenomen.

### Interface vereenvoudigen

De student vroeg om de fullscreenknop en de geluidsknop met aan/uit te verwijderen. De assistent verwijderde de knoppen, de bijbehorende event-handlers en ongebruikte CSS. De spelgeluiden bleven behouden.

De bijbehorende JavaScript-syntaxiscontrole slaagde. Dit zegt dat de code geldig kan worden geparsed, niet dat alle spelacties in de browser zijn getest.

### Geconstateerd open probleem

`index.html` verwijst naar `assets/rocket.svg`, maar deze afbeelding ontbreekt nog in deze nieuwe projectmap. Dit is een aangetroffen ontbrekend bestand, geen gebruikersbevinding. Voeg het afgesproken logo toe en controleer het vervolgens in de browser.

## Vierde fase — versiebeheer en logboek vastleggen

**Datum:** 25 september 2026.

### Uitgangssituatie

- De nieuwe repository had nog geen commits.
- De remote verwijst naar `https://github.com/Allexwnl/game-development-examen-alexander.git`.
- De online inhoud en toegang voor beoordelaars zijn hiermee niet vastgesteld.
- De gamebestanden stonden al klaar, maar waren nog niet vastgelegd in Git.

### Werkzaamheden van deze sessie

- `.gitignore` toegevoegd om `node_modules/` buiten versiebeheer te houden.
- Dit reconstructielogboek en een nog in te vullen testdocument opgesteld.
- Het bestaande werk ingedeeld in onderstaande vijf commits met de werkelijke commitdatum. Er worden geen oude datums of fictieve werkdagen ingesteld.

| Volgorde | Commitbericht | Inhoud |
| --- | --- | --- |
| 1 | Leg npm-project en lokale Phaser-bibliotheek vast | `.gitignore`, npm-bestanden, Phaser en licentie |
| 2 | Leg bestaande Pong-interface vast | `index.html` |
| 3 | Leg bestaande vormgeving van Pong vast | `style.css` |
| 4 | Leg bestaande Pong-spellogica vast | `script/game.js` |
| 5 | Documenteer reconstructie en plan gebruikerstests | Dit logboek en het testdocument |

Controleer de werkelijke hashes en datums met `git log --oneline` en `git log --format=fuller`. Deze lokale vastlegging is geen bewijs van dagelijks committen tijdens de eerdere ontwikkeling. Er wordt in deze stap niet gepusht.

## Herindeling van de geschiedenis — 25 september 2026

De gebruiker vond de eerste indeling per compleet bestand niet geschikt om de opbouw te volgen. Daarom heeft de AI-assistent, met toestemming, zes nieuwe tussenstappen samengesteld uit de bestaande code. Dit is een expliciete reconstructie op één dag; er worden geen oorspronkelijke werkdagen of commits op 22–24 september geclaimd.

1. Basis-HTML, CSS en Phaser klaarzetten
2. School- en studentpaddle tekenen
3. Balbeweging en paddlebesturing toevoegen
4. Botsingen, scores, geluid en effecten toevoegen
5. Schild per speler toevoegen
6. Freeze toevoegen en eindversie documenteren

De voorgaande tabel beschrijft de oude indeling en blijft hier staan als procesverantwoording. De oude online main stond bij controle op cfd1e4661f215876909dc6dccfe9bdd48fd47ce7. Voor vervanging is een lokale backupbranch en Git-bundel gemaakt. Publicatie van de herindeling gebeurt met een expliciete force-with-lease op die oude commit, zodat nieuw werk van anderen niet stilzwijgend wordt overschreven. De uitkomst van de push is controleerbaar via Git; beoordelaarstoegang en gebruikerstests zijn hiermee niet aangetoond.

De tussenstappen zijn achteraf samengestelde demonstraties, geen oorspronkelijke dagversies. De eindversie van HTML, CSS, JavaScript en bibliotheek blijft gelijk aan de eerdere versie.

## Testwerk — nog zelf uitvoeren

**Status: geen echte gebruikerstest of hertest in dit logboek geregistreerd.**

Gebruik [TESTVERSLAG.md](TESTVERSLAG.md). Vul pas na uitvoering namen, tijden, waarnemingen en resultaten in. Laat een gebruiker spelen, verwerk de bevindingen en voer de hertest met dezelfde gebruiker uit. Bewaar de gebruikte commitcode bij beide sessies.

## Eerstvolgende werkzaamheden

- [ ] Dit reconstructielogboek lezen en eventuele onjuistheden corrigeren.
- [ ] Eigen bijdragen en leerpunten concreet aanvullen zonder onbekende data of uren te verzinnen.
- [ ] Ontbrekende raket/het afgesproken logo toevoegen en bekijken in de browser.
- [ ] Officiële backlog, slogan en AI-afspraken met docent bevestigen.
- [ ] GDD en klantgesprekken afronden of aanwezig bewijs toevoegen.
- [ ] De game zelf technisch nalopen en een echte gebruikerstest uitvoeren.
- [ ] Bevindingen oplossen, committen en met dezelfde gebruiker hertesten.
- [ ] De lokale commits pushen en toegang voor de beoordelaars controleren.

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
