# Logboek — Best Education Pong

**Kandidaat:** Alexander Zoet
**Examenperiode:** 18 september 2026 t/m 2 oktober 2026
**Repository:** https://github.com/Allexwnl/game-development-examen-alexander

## Verantwoording

Ik heb dit logboek niet elke dag bijgehouden terwijl ik werkte. Ik heb het later opgesteld op basis van mijn projectbestanden, mijn commit-geschiedenis en wat ik me herinner. Bij de dagen hieronder staat wat ik echt weet. Waar ik geen tijden of details weet, staat dat erbij.

Ik merkte op 25 september dat ik nog niets naar GitHub had gepusht. Daardoor staan al mijn eerste commits op 25 september. De commitdatums laten dus niet zien op welke dag ik de code schreef. Ik heb mijn werk achteraf in logische stappen verdeeld in commits (de berichten beginnen met "Herindeling"). Die commits zijn geen dagversies van toen.

**Gebruikte hulp:** [invullen: welke hulp heb je gehad? Bijvoorbeeld een AI-assistent voor het logboek, het testdocument en de commit-indeling, en eventueel voor de voorbeeldcode. Schrijf op wat waar is.]

## 18 september 2026 — Concept en voorbeeldgame

- Bestede tijd: 2 uuren
- Het Pong-concept was aangeleverd: School tegen Student, omhoog en omlaag bewegen, een terugkaatsende bal, eerste tot vijf punten.
- De voorbeeldversie had al geluid, deeltjes, toenemende balsnelheid, een schild en freeze.
- Ik koos Phaser voor het canvas, het toetsenbord en de animaties. De botsingen en spelregels zijn gewone JavaScript.
- Ik gebruik een lokale kopie van Phaser, zodat het spel zonder internet werkt.
- Ik zette de layout op de venstergrootte en voegde de raket en de naam Best Education toe.
- Zelf gedaan: [invullen: wat precies van jou was]

## 22 september 2026 — Eigen projectmap en Phaser installeren

- Bestede tijd: 1 uur
- Ik maakte `game-development-examen-alexander` als eigen projectmap.
- Ik richtte een npm-project in met Phaser 3.90.0 (`package.json`, `package-lock.json`, lokale kopie in `vendor`).
- Ik bespraak de slogan "Let the best education decide".

## 25 september 2026 — Versiebeheer ontdekt, eerste testsessie

- Ik zag dat ik nog niets had gepusht, en dat de repository nog geen commits had.
- Ik voegde `.gitignore` toe zodat `node_modules/` niet in Git komt.
- Ik verdeelde mijn bestaande werk in commits (zie de tabel onder "Commits").
- Ik had een eerste gebruikerstest van 15:45 tot 16:01. Zie het aparte testverslag.

## 28 september 2026

Vrij, ik heb niet gewerkt.

## 29 september t/m 1 oktober 2026 — Code doorgenomen en geleerd

- De code van de game was al af. Ik heb deze dagen de code doorgenomen en uitgezocht hoe elk onderdeel werkt, om de game goed te kunnen uitleggen en overdragen.
- Ik bereidde mijn presentatie voor.

## 1 oktober 2026 — Presentatie

- Ik gaf mijn presentatie Aan Rob, het ging best goed wist alleen niet meer wat de delta bij de functie betekende(was ik vergeten). Tijdens dat Rob het uitlegde wist ik weer, waarom ik het had geimplementeerd in mijn code het was namelijk voor de nog niet toegevoegde multiplayer functie.

## 2 oktober 2026 — Afronding

- Ik herstelde de typefout `RE D` in `createPlayer` (moest `RED` zijn).
- Ik zorgde dat het logo in de game staat(had dit nog niet gecommit).
- Ik vulde het testverslag aan en paste het GDD aan (datums, milestones, backlog).
- Ik schreef het overdrachtsdocument en het document over mijn ontwikkelomgeving.
- Ik herschreef dit logboek.

## Klantgesprekken

Er heeft geen tussentijds klanten gesprek plaatsgevonden. De opdrachtgever heeft de game en de presentatie beoordeeld op 1 oktober 2026.

## Tests

- Test 1 op 25 september 2026, 15:45 tot 16:01. Het testverslag staat in `TESTVERSLAG.md`.
- Resultaat: alle onderdelen die ik testte werkten en er zijn geen bugs gevonden.
- Hertest: [invullen of het van toepassing is. Zo niet, schrijf waarom niet.]

## Commits

| Datum | Commit | Bericht |
| --- | --- | --- |
| 25 sep | 7b43b66 | Herindeling: Basis-HTML, CSS en Phaser klaarzetten |
| 25 sep | a0f26f0 | Herindeling: School- en studentpaddle tekenen |
| 25 sep | c2ea321 | Herindeling: Balbeweging en paddlebesturing toevoegen |
| 25 sep | bbfdef5 | Herindeling: Botsingen, scores, geluid en effecten toevoegen |
| 25 sep | 3aa5d2e | Herindeling: Schild per speler toevoegen |
| 25 sep | e8eb6be | Herindeling: Freeze toevoegen en eindversie documenteren |
| 25 sep | f5282b3 | Verwijder apart herindelingsdocument en behoud uitleg in logboek |
| 2 okt | 79eba72 | alex(dit was het logo, comments aan code toevoegen, testverslag invullen en route van logo aanpassen) |
| 2 okt | 53f5222 | naam en gegevens testverslag invullen |

## Wat ik heb geleerd

- Hoe ik met Phaser een canvas kan maken, toetsenbord kan lezen en animaties kan uitvoeren.
- Hoe ik een spel kan maken met HTML, CSS en JavaScript.
- Hoe ik een spel kan testen en de resultaten kan verwerken.