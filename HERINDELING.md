# Herindeling van de beginversie

Deze zes stappen zijn op 25 september 2026 **achteraf samengesteld uit een bestaande game**, met AI-hulp en op verzoek van de student. Ze zijn bedoeld om de code per onderdeel te kunnen lezen, niet als een oorspronkelijke dagelijkse ontwikkelgeschiedenis. Alle commits hebben hun werkelijke aanmaakdatum.

De vijf eerdere commits, eindigend op cfd1e4661f215876909dc6dccfe9bdd48fd47ce7, waren eerst per bestand ingedeeld. Die indeling wordt vervangen. De oude historie blijft lokaal bewaard op branch `backup/voor-herindeling-2026-09-25` en in de bundel `../pong-voor-herindeling-2026-09-25.bundle`.

## Volgorde

1. Basis-HTML, CSS en Phaser klaarzetten
2. School- en studentpaddle tekenen
3. Balbeweging en paddlebesturing toevoegen
4. Botsingen, scores, geluid en effecten toevoegen
5. Schild per speler toevoegen
6. Freeze toevoegen en eindversie documenteren

De eerste stappen zijn beperkte demonstraties: stap 1 toont alleen Phaser, stap 2 stilstaande paddles, stap 3 beweegbare paddles en een bal die langs alle veldranden terugkaatst. Vanaf stap 4 zijn er echte paddle-botsingen en scores. Stap 5 voegt shield toe, stap 6 freeze.

De uiteindelijke spelbestanden blijven gelijk aan de bestaande versie. De ontbrekende `assets/rocket.svg` blijft een bekend open punt. Echte gebruikerstests en een hertest moet de student nog uitvoeren; technische controles van deze reconstructie vervangen die niet. Zie in de eindversie ook LOGBOEK.md en TESTVERSLAG.md.
