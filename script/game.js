// 1. INSTELLINGEN: hier kan ik het spel sneller, langzamer of korter maken.
// Afstanden zijn in spel-eenheden; snelheden zijn spel-eenheden per seconde.
// const gebruik ik voor vaste waarden, let voor waarden die kunnen veranderen.
const WIDTH = 960;
let HEIGHT = 440; // Beginhoogte; resizeField() past deze aan de beschikbare ruimte aan.
const PADDLE_SPEED = 340;
const BALL_SPEED = 320;
const MAX_BALL_SPEED = 760;
const WINNING_SCORE = 5;
// Phaser gebruikt hier hexadecimale kleuren: rood voor School, groen voor Student,
// en blauw om te laten zien dat een speler tijdelijk vertraagd is.
const RED = 0xff294d;
const GREEN = 0x00ca7c;
const BLUE = 0x36c9f5;

// Deze variabelen bewaren de spelobjecten, zodat meerdere functies erbij kunnen.
// Een scene is de Phaser-omgeving waarin ik objecten teken en invoer verwerk.
let scene;
let school;
let student;
let ball;
let keys;
let title;
let subtitle;
// state bepaalt wat de speler op dit moment kan doen:
// start = beginscherm, ready = wachten op de volgende ronde, playing = spelen,
// paused = pauze en finished = wedstrijd afgelopen.
let state = 'start';
let audio;

// Hiermee verbind ik JavaScript met de knop en het tekstvak in de HTML.
const startButton = document.getElementById('start');
const message = document.getElementById('message');

// 2. PHASER STARTEN: maak het canvas en koppel de twee belangrijkste functies.
const game = new Phaser.Game({
    // AUTO laat Phaser kiezen tussen WebGL en Canvas om het spel te tekenen.
    type: Phaser.AUTO,
    // Het canvas komt in het HTML-element met id="game".
    parent: 'game',
    width: WIDTH,
    height: HEIGHT,
    transparent: true, // De raket in de HTML blijft zichtbaar achter het canvas.
    // FIT schaalt het spel passend; CENTER_BOTH centreert het canvas.
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    // create bouwt de scene op; update wordt daarna ieder frame aangeroepen.
    scene: { create: create, update: update }
});

// 3. OPBOUW: spelers, bal, teksten en bediening klaarzetten.
function create() {
    // Binnen deze functie is 'this' de Phaser-scene. Ik bewaar die voor later.
    scene = this;
    // Dezelfde functie maakt beide spelers; positie, kleur en schildpositie verschillen.
    school = createPlayer('school', 60, RE D, 16);
    student = createPlayer('student', WIDTH - 60, GREEN, WIDTH - 16);
    // De bal begint verborgen in het midden en heeft een straal van 8.
    ball = scene.add.circle(WIDTH / 2, HEIGHT / 2, 8, 0xffffff).setVisible(false);
    // vx is de horizontale snelheid, vy de verticale; speed is de totale snelheid.
    // Dit zijn eigen eigenschappen: moveBall() gebruikt ze om de bal te verplaatsen.
    ball.vx = 0;
    ball.vy = 0;
    ball.speed = BALL_SPEED;

    // De titel en ondertitel worden ook gebruikt voor pauze, punten en de winnaar.
    // setOrigin(0.5) centreert de tekst rond zijn positie; resolution 2 maakt hem scherper.
    title = scene.add.text(WIDTH / 2, 172, 'START GAME', {
        fontFamily: 'Arial', fontSize: '42px', fontStyle: 'bold', color: '#ffffff',
        backgroundColor: '#08090a', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setResolution(2);
    subtitle = scene.add.text(WIDTH / 2, 245, 'Let the best education decide', {
        fontFamily: 'Arial', fontSize: '16px', color: '#a5adb7',
        backgroundColor: '#08090a', padding: { x: 12, y: 8 }
    }).setOrigin(0.5).setResolution(2);

    // School: W/S bewegen, A schild, D vertragen. Student: pijlen omhoog/omlaag
    // bewegen, links schild, rechts vertragen. Spatie bedient de hoofdactie, P de pauze.
    keys = scene.input.keyboard.addKeys('W,S,A,D,UP,DOWN,LEFT,RIGHT,SPACE,P');
    scene.input.keyboard.on('keydown-SPACE', function (event) {
        // Ingedrukt houden mag niet steeds opnieuw starten/pauzeren.
        // Een geselecteerde HTML-knop verwerkt spatie zelf, dus voorkom een dubbele actie.
        if (!event.repeat && document.activeElement.tagName !== 'BUTTON') mainAction();
    });
    scene.input.keyboard.on('keydown-P', function (event) {
        if (!event.repeat && (state === 'playing' || state === 'paused')) mainAction();
    });
    // Bij het verlaten van het venster/tabblad pauzeert het spel automatisch.
    game.events.on('blur', function () {
        if (state === 'playing') mainAction();
    });
    startButton.onclick = mainAction;
    // De observer reageert op een veranderde veldgrootte, ook bij fullscreen.
    new ResizeObserver(resizeField).observe(document.getElementById('game'));
    resizeField();
}

// 4. SCHAALBAAR SPEELVELD: pas de hoogte en posities aan de HTML-ruimte aan.
function resizeField() {
    const field = document.getElementById('game');
    const oldHeight = HEIGHT;
    // De breedte blijft 960 spel-eenheden. De hoogte volgt de verhouding van het veld.
    HEIGHT = WIDTH * field.clientHeight / field.clientWidth;
    scene.scale.setGameSize(WIDTH, HEIGHT);
    for (const player of [school, student]) {
        // Behoud de relatieve hoogte van de paddle. Clamp begrenst een waarde:
        // 44 is de halve paddlehoogte, zodat de hele paddle binnen het veld blijft.
        player.paddle.y = Phaser.Math.Clamp(player.paddle.y / oldHeight * HEIGHT, 44, HEIGHT - 44);
        // Het schild blijft in het midden en bedekt de volledige veldhoogte.
        player.shield.setPosition(player.shield.x, HEIGHT / 2);
        player.shield.setSize(5, HEIGHT);
    }
    // Ook de bal blijft binnen het veld; 8 is zijn straal.
    ball.y = Phaser.Math.Clamp(ball.y / oldHeight * HEIGHT, 8, HEIGHT - 8);
    // De teksten staan onderaan en worden bij een laag veld kleiner.
    title.setPosition(WIDTH / 2, HEIGHT * 0.83);
    subtitle.setPosition(WIDTH / 2, HEIGHT * 0.95);
    title.setFontSize(Math.min(30, HEIGHT * 0.075));
    subtitle.setFontSize(Math.min(16, HEIGHT * 0.04));
}

// 5. SPELEROBJECT: bundel de tekenobjecten en spelgegevens van elke speler.
// Door deze functie te hergebruiken hoef ik de spelerslogica maar een keer te schrijven.
function createPlayer(name, x, color, shieldX) {
    return {
        name: name,
        color: color,
        // De paddle is 16 breed en 88 hoog. Het schild begint onzichtbaar.
        paddle: scene.add.rectangle(x, HEIGHT / 2, 16, 88, color),
        shield: scene.add.rectangle(shieldX, HEIGHT / 2, 5, HEIGHT, color).setVisible(false),
        score: 0,
        // Beide vaardigheden zijn eenmaal per ronde beschikbaar.
        shieldReady: true,
        freezeReady: true,
        frozenFor: 0 // Aantal seconden dat de vertraging nog duurt.
    };
}

// 6. HOOFDACTIE: dezelfde knop start, pauzeert, hervat of begint een nieuwe ronde.
// De huidige state bepaalt welke tak van de if/else wordt uitgevoerd.
function mainAction() {
    // Browsers vereisen gebruikersinteractie voor geluid. Maak de audio-omgeving
    // bij de eerste actie aan en hervat die als hij nog opgeschort is.
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();

    if (state === 'playing') {
        // update() verwerkt alleen 'playing', dus bij 'paused' stopt de spellogica.
        state = 'paused';
        showTitle('PAUSED', 'Press P or click Resume');
        startButton.textContent = 'Resume';
    } else if (state === 'paused') {
        // Hervat met dezelfde posities, score en snelheid als voor de pauze.
        state = 'playing';
        hideTitle();
        startButton.textContent = 'Pause';
    } else {
        if (state === 'start' || state === 'finished') {
            // Alleen een nieuwe wedstrijd wist de scores; een nieuwe ronde niet.
            school.score = 0;
            student.score = 0;
            updateScores();
        }
        resetRound();
        // Kies willekeurig links (-1) of rechts (1), met een kleine starthoek in radialen.
        const direction = Math.random() < 0.5 ? -1 : 1;
        const angle = Phaser.Math.FloatBetween(-0.45, 0.45);
        // Cosinus en sinus verdelen de totale snelheid over horizontaal en verticaal.
        ball.vx = Math.cos(angle) * BALL_SPEED * direction;
        ball.vy = Math.sin(angle) * BALL_SPEED;
        state = 'playing';
        hideTitle();
        startButton.textContent = 'Pause';
        message.textContent = 'Keep the ball in play. Every paddle hit makes it faster!';
    }
}

// 7. GAMELOOP: Phaser roept dit ieder frame aan. delta is de verstreken tijd in ms.
// De parameter time wordt hier niet gebruikt; delta bepaalt hoeveel we verplaatsen.
function update(time, delta) {
    if (state !== 'playing') return;
    // Omrekenen naar seconden maakt de beweging onafhankelijk van de framerate.
    // Maximaal 0,05 seconde verwerken voorkomt grote sprongen na een hapering.
    const seconds = Math.min(delta / 1000, 0.05);
    movePlayer(school, keys.W, keys.S, seconds);
    movePlayer(student, keys.UP, keys.DOWN, seconds);
    useAbilities(school, student, keys.A, keys.D);
    useAbilities(student, school, keys.LEFT, keys.RIGHT);

    // Verdeel de balbeweging in stapjes van maximaal 1/240 seconde, zodat een snelle
    // bal niet zomaar over een paddle springt zonder dat de botsing wordt gecontroleerd.
    // Na een punt verandert state en stopt de lus meteen met de resterende stapjes.
    const steps = Math.ceil(seconds / (1 / 240));
    for (let i = 0; i < steps && state === 'playing'; i++) {
        moveBall(seconds / steps);
    }
}

// 8. BEWEGING: deze functie werkt voor beide spelers met hun eigen toetsen.
function movePlayer(player, up, down, seconds) {
    // Tel de vertraging af, maar laat de timer nooit negatief worden.
    player.frozenFor = Math.max(0, player.frozenFor - seconds);
    const frozen = player.frozenFor > 0;
    // 'voorwaarde ? dit : dat' is een korte if/else. Freeze laat de speler
    // op 35% snelheid bewegen en kleurt de paddle blauw; hij staat dus niet stil.
    const speed = frozen ? PADDLE_SPEED * 0.35 : PADDLE_SPEED;
    player.paddle.setFillStyle(frozen ? BLUE : player.color);
    // isDown blijft waar zolang de toets ingedrukt is. In het canvas loopt y naar
    // beneden op: aftrekken is omhoog, optellen is omlaag. Afstand = snelheid x tijd.
    if (up.isDown) player.paddle.y -= speed * seconds;
    if (down.isDown) player.paddle.y += speed * seconds;
    player.paddle.y = Phaser.Math.Clamp(player.paddle.y, 44, HEIGHT - 44);
}

// 9. VAARDIGHEDEN: JustDown reageert eenmaal op een nieuwe toetsaanslag.
// De Ready-vlag voorkomt dat dezelfde vaardigheid vaker in een ronde wordt gebruikt.
function useAbilities(player, opponent, shieldKey, freezeKey) {
    if (Phaser.Input.Keyboard.JustDown(shieldKey) && player.shieldReady) {
        // Het schild blijft actief totdat het een bal tegenhoudt of de ronde eindigt.
        player.shieldReady = false;
        player.shield.setVisible(true);
        document.getElementById(player.name + '-shield').textContent = 'Active';
    }
    if (Phaser.Input.Keyboard.JustDown(freezeKey) && player.freezeReady) {
        player.freezeReady = false;
        opponent.frozenFor = 2; // Vertraag de tegenstander twee seconden speeltijd.
        document.getElementById(player.name + '-freeze').textContent = 'Used';
        beep(220);
    }
}

// 10. BALBEWEGING: verplaats de bal en controleer daarna muren, paddles en schilden.
function moveBall(seconds) {
    ball.x += ball.vx * seconds;
    ball.y += ball.vy * seconds;

    if (ball.y < 8 || ball.y > HEIGHT - 8) {
        // Zet de bal terug binnen de boven-/onderrand en keer alleen de y-snelheid om.
        ball.y = Phaser.Math.Clamp(ball.y, 8, HEIGHT - 8);
        ball.vy *= -1;
        beep(300);
    }
    // direction is de terugkaatsrichting: bij School naar rechts, bij Student naar links.
    checkPaddle(school, 1);
    checkPaddle(student, -1);
    checkShield(school, 1);
    checkShield(student, -1);

    // Een punt telt pas als de bal helemaal voorbij de linker- of rechterrand is.
    if (ball.x < -8) scorePoint(student);
    if (ball.x > WIDTH + 8) scorePoint(school);
}

// 11. PADDLEBOTSING: bepaal of de bal raakt en bereken de nieuwe richting.
function checkPaddle(player, direction) {
    const paddle = player.paddle;
    // Alleen een naderende bal mag botsen, anders zou hij opnieuw terugkaatsen.
    const movingTowards = ball.vx * direction < 0;
    // Eenvoudige overlapcontrole: 16 = halve paddlebreedte (8) + balstraal (8),
    // 52 = halve paddlehoogte (44) + balstraal (8). Math.abs geeft de absolute afstand.
    const touching = Math.abs(ball.x - paddle.x) < 16 && Math.abs(ball.y - paddle.y) < 52;
    if (!movingTowards || !touching) return;

    // De raakplek wordt een getal tussen -1 (bovenkant) en 1 (onderkant).
    // Midden = recht vooruit; dichter bij een uiteinde = schuiner, tot 60 graden.
    const hitPosition = Phaser.Math.Clamp((ball.y - paddle.y) / 44, -1, 1);
    const angle = hitPosition * Math.PI / 3;
    // Elke paddlehit verhoogt de snelheid met 25, tot maximaal MAX_BALL_SPEED.
    ball.speed = Math.min(ball.speed + 25, MAX_BALL_SPEED);
    ball.vx = Math.cos(angle) * ball.speed * direction;
    ball.vy = Math.sin(angle) * ball.speed;
    // Zet de bal net buiten de paddle zodat de objecten niet blijven overlappen.
    ball.x = paddle.x + 17 * direction;
    // Deeltjes en een piep geven direct zichtbare en hoorbare feedback.
    burst(ball.x, ball.y, player.color);
    beep(520);
}

// 12. SCHILDBOTSING: een actief schild redt de speler eenmaal van een gemiste bal.
function checkShield(player, direction) {
    const shield = player.shield;
    // Links en rechts vragen een andere grenscontrole; 10 is de botsingsmarge.
    const reachedShield = direction === 1 ? ball.x <= shield.x + 10 : ball.x >= shield.x - 10;
    // Stop als het schild uitstaat, de bal ervan weg beweegt of het nog niet bereikt heeft.
    if (!shield.visible || ball.vx * direction >= 0 || !reachedShield) return;
    // Keer de horizontale richting om en zet de bal terug aan de speelveldkant.
    ball.vx *= -1;
    ball.x = shield.x + 11 * direction;
    shield.setVisible(false);
    document.getElementById(player.name + '-shield').textContent = 'Used';
    burst(ball.x, ball.y, player.color);
    beep(700);
}

// 13. SCORE: voeg een punt toe en kies tussen een volgende ronde of het eindscherm.
function scorePoint(player) {
    player.score++;
    updateScores();
    resetRound();
    beep(880);
    const name = player.name === 'school' ? 'School' : 'Student';
    // De eerste speler met vijf punten wint de wedstrijd.
    if (player.score >= WINNING_SCORE) {
        state = 'finished';
        showTitle(name.toUpperCase() + ' WINS!', 'First to five. Ready for a rematch?');
        message.textContent = name + ' wins the match!';
        startButton.textContent = 'Play again';
    } else {
        state = 'ready';
        showTitle(name.toUpperCase() + ' SCORES!', 'Press SPACE for the next round');
        message.textContent = 'Abilities refilled. Get ready for the next round.';
        startButton.textContent = 'Next round';
    }
}

// 14. RONDE RESETTEN: bal en paddles naar het midden, vaardigheden opnieuw beschikbaar.
// De wedstrijdscore blijft behouden; mainAction() wist die bij een nieuwe wedstrijd.
function resetRound() {
    ball.setPosition(WIDTH / 2, HEIGHT / 2);
    ball.vx = 0;
    ball.vy = 0;
    ball.speed = BALL_SPEED;
    for (const player of [school, student]) {
        player.paddle.y = HEIGHT / 2;
        player.paddle.setFillStyle(player.color);
        player.shield.setVisible(false);
        player.shieldReady = true;
        player.freezeReady = true;
        player.frozenFor = 0;
        document.getElementById(player.name + '-shield').textContent = 'Ready';
        document.getElementById(player.name + '-freeze').textContent = 'Ready';
    }
    // Wis de toetsstatus van vaardigheden, zodat oude invoer niet meegaat naar de ronde.
    for (const key of [keys.A, keys.D, keys.LEFT, keys.RIGHT]) key.reset();
}

// 15. SCHERMTEKSTEN: zet de actuele JavaScript-scores in de HTML.
function updateScores() {
    document.getElementById('school-score').textContent = school.score;
    document.getElementById('student-score').textContent = student.score;
}

// Toon een tussenscherm en verberg de bal. De CSS-class stuurt de opmaak van het veld.
// Dit verandert alleen de weergave; de aanroepende functie bepaalt de spelstatus.
function showTitle(heading, detail) {
    document.getElementById('game').classList.remove('playing');
    title.setText(heading).setVisible(true);
    subtitle.setText(detail).setVisible(true);
    ball.setVisible(false);
}

// Tijdens het spelen verdwijnen de teksten en wordt de bal weer zichtbaar.
function hideTitle() {
    document.getElementById('game').classList.add('playing');
    title.setVisible(false);
    subtitle.setVisible(false);
    ball.setVisible(true);
}

// 16. DEELTJESEFFECT: acht kleine cirkels springen uit elkaar op de botsingsplek.
function burst(x, y, color) {
    for (let i = 0; i < 8; i++) {
        const particle = scene.add.circle(x, y, 3, color);
        // Een tween laat Phaser waarden geleidelijk aanpassen: hier bewegen de
        // deeltjes naar willekeurige plekken en verdwijnen ze in 350 milliseconden.
        scene.tweens.add({
            targets: particle,
            x: x + Phaser.Math.Between(-35, 35),
            y: y + Phaser.Math.Between(-35, 35),
            alpha: 0, // Alpha is de zichtbaarheid: 1 is zichtbaar, 0 is transparant.
            duration: 350,
            // Verwijder het deeltje na de animatie, zodat oude objecten niet opstapelen.
            onComplete: function () { particle.destroy(); }
        });
    }
}

// 17. GELUID: de Web Audio API maakt korte piepjes, zonder losse geluidsbestanden.
// frequency is de toonhoogte in hertz; verschillende gebeurtenissen hebben een eigen piep.
function beep(frequency) {
    // Zonder actieve audio-omgeving slaan we het geluid over.
    if (!audio || audio.state !== 'running') return;
    // De oscillator maakt de toon; de gain-node regelt het volume.
    const tone = audio.createOscillator();
    const volume = audio.createGain();
    tone.type = 'sine';
    tone.frequency.value = frequency;
    // Begin zacht en laat het geluid in 0,1 seconde uitsterven.
    volume.gain.setValueAtTime(0.08, audio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.1);
    // Signaalroute: toon -> volumeregeling -> audio-uitgang (luidsprekers/koptelefoon).
    tone.connect(volume);
    volume.connect(audio.destination);
    tone.start();
    tone.stop(audio.currentTime + 0.1);
    // Koppel de gebruikte audio-nodes na afloop los.
    tone.onended = function () { tone.disconnect(); volume.disconnect(); };
}

