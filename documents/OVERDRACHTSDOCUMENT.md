# Overdracht — Best Education Pong

**Wat is het:** lokale 2-spelers Pong (School vs Student), eerste tot 5 punten, met schild- en freeze-vaardigheid. Gebouwd met HTML, CSS, JavaScript en Phaser 3.90.0.
**Repository:** https://github.com/Allexwnl/game-development-examen-alexander

**Starten:** open `index.html` in Chrome. Phaser staat lokaal in `vendor/`, dus internet of een server is niet nodig. `npm install` is alleen nodig voor `node_modules`.

**Structuur:**
- `index.html`: scoreboard, speelveld, besturingsuitleg en logo.
- `style.css`: opmaak.
- `script/game.js`: alle spellogica. De secties zijn genummerd (1 t/m 17) en volgen de volgorde van de code.

**Gemaakte keuzes:**
- Phaser gebruik ik voor canvas, toetsenbord en animaties; botsingen en regels zijn gewone JavaScript, zodat ze makkelijk aan te passen zijn.
- Instellingen (snelheden, winscore, kleuren) staan bovenaan `game.js`.
- `state` (start, ready, playing, paused, finished) bepaalt wat de spelers mogen doen.
- De bal beweegt in stapjes van 1/240 seconde, zodat hij bij hoge snelheid niet door een paddle heen gaat.
- Geluid komt uit de Web Audio API, dus er zijn geen geluidsbestanden.

**Mogelijke vervolgstappen:** online multiplayer, het online zetten van de game op bijvoorbeeld Netlify, fireball superpower en een trailer voor dit spel,actergrond muziek(vergeten te benoemen in de presentatie).
Deze zijn niet uitgevoerd, maar kunnen in de toekomst worden toegevoegd.