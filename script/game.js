// Change these numbers to adjust the game.
const WIDTH = 960;
let HEIGHT = 440; // Updated to match the available window space.
const PADDLE_SPEED = 340;
const BALL_SPEED = 320;
const MAX_BALL_SPEED = 760;
const WINNING_SCORE = 5;
const RED = 0xff294d;
const GREEN = 0x00ca7c;

let scene;
let school;
let student;
let ball;
let keys;
let title;
let subtitle;
let state = 'start'; // start, ready, playing, paused, or finished
let audio;

const startButton = document.getElementById('start');
const message = document.getElementById('message');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: WIDTH,
    height: HEIGHT,
    transparent: true, // The rocket in the HTML sits behind the canvas.
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: { create: create, update: update }
});

function create() {
    scene = this;
    school = createPlayer('school', 60, RED, 16);
    student = createPlayer('student', WIDTH - 60, GREEN, WIDTH - 16);
    ball = scene.add.circle(WIDTH / 2, HEIGHT / 2, 8, 0xffffff).setVisible(false);
    ball.vx = 0;
    ball.vy = 0;
    ball.speed = BALL_SPEED;

    title = scene.add.text(WIDTH / 2, 172, 'START GAME', {
        fontFamily: 'Arial', fontSize: '42px', fontStyle: 'bold', color: '#ffffff',
        backgroundColor: '#08090a', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setResolution(2);
    subtitle = scene.add.text(WIDTH / 2, 245, 'Let the best education decide', {
        fontFamily: 'Arial', fontSize: '16px', color: '#a5adb7',
        backgroundColor: '#08090a', padding: { x: 12, y: 8 }
    }).setOrigin(0.5).setResolution(2);

    keys = scene.input.keyboard.addKeys('W,S,A,UP,DOWN,LEFT,SPACE,P');
    scene.input.keyboard.on('keydown-SPACE', function (event) {
        if (!event.repeat && document.activeElement.tagName !== 'BUTTON') mainAction();
    });
    scene.input.keyboard.on('keydown-P', function (event) {
        if (!event.repeat && (state === 'playing' || state === 'paused')) mainAction();
    });
    // Pause when switching tabs, so nobody loses a point while away.
    game.events.on('blur', function () {
        if (state === 'playing') mainAction();
    });
    startButton.onclick = mainAction;
    // Also runs when entering fullscreen or resizing the browser.
    new ResizeObserver(resizeField).observe(document.getElementById('game'));
    resizeField();
}

function resizeField() {
    const field = document.getElementById('game');
    const oldHeight = HEIGHT;
    // Keep 960 game units across, and fit the height to the actual field.
    HEIGHT = WIDTH * field.clientHeight / field.clientWidth;
    scene.scale.setGameSize(WIDTH, HEIGHT);
    for (const player of [school, student]) {
        player.paddle.y = Phaser.Math.Clamp(player.paddle.y / oldHeight * HEIGHT, 44, HEIGHT - 44);
        player.shield.setPosition(player.shield.x, HEIGHT / 2);
        player.shield.setSize(5, HEIGHT);
    }
    ball.y = Phaser.Math.Clamp(ball.y / oldHeight * HEIGHT, 8, HEIGHT - 8);
    title.setPosition(WIDTH / 2, HEIGHT * 0.83);
    subtitle.setPosition(WIDTH / 2, HEIGHT * 0.95);
    title.setFontSize(Math.min(30, HEIGHT * 0.075));
    subtitle.setFontSize(Math.min(16, HEIGHT * 0.04));
}

function createPlayer(name, x, color, shieldX) {
    return {
        name: name,
        color: color,
        paddle: scene.add.rectangle(x, HEIGHT / 2, 16, 88, color),
        shield: scene.add.rectangle(shieldX, HEIGHT / 2, 5, HEIGHT, color).setVisible(false),
        score: 0,
        shieldReady: true,
    };
}

function mainAction() {
    // Browsers allow audio after a click or key press.
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();

    if (state === 'playing') {
        state = 'paused';
        showTitle('PAUSED', 'Press P or click Resume');
        startButton.textContent = 'Resume';
    } else if (state === 'paused') {
        state = 'playing';
        hideTitle();
        startButton.textContent = 'Pause';
    } else {
        if (state === 'start' || state === 'finished') {
            school.score = 0;
            student.score = 0;
            updateScores();
        }
        resetRound();
        const direction = Math.random() < 0.5 ? -1 : 1;
        const angle = Phaser.Math.FloatBetween(-0.45, 0.45);
        ball.vx = Math.cos(angle) * BALL_SPEED * direction;
        ball.vy = Math.sin(angle) * BALL_SPEED;
        state = 'playing';
        hideTitle();
        startButton.textContent = 'Pause';
        message.textContent = 'Keep the ball in play. Every paddle hit makes it faster!';
    }
}

function update(time, delta) {
    if (state !== 'playing') return;
    // Seconds make movement independent of the screen refresh rate.
    const seconds = Math.min(delta / 1000, 0.05);
    movePlayer(school, keys.W, keys.S, seconds);
    movePlayer(student, keys.UP, keys.DOWN, seconds);
    useAbilities(school, keys.A);
    useAbilities(student, keys.LEFT);

    // Small movement steps prevent a fast ball from skipping a paddle.
    const steps = Math.ceil(seconds / (1 / 240));
    for (let i = 0; i < steps && state === 'playing'; i++) {
        moveBall(seconds / steps);
    }
}

function movePlayer(player, up, down, seconds) {
    const speed = PADDLE_SPEED;
    if (up.isDown) player.paddle.y -= speed * seconds;
    if (down.isDown) player.paddle.y += speed * seconds;
    player.paddle.y = Phaser.Math.Clamp(player.paddle.y, 44, HEIGHT - 44);
}

function useAbilities(player, shieldKey) {
    if (Phaser.Input.Keyboard.JustDown(shieldKey) && player.shieldReady) {
        player.shieldReady = false;
        player.shield.setVisible(true);
        document.getElementById(player.name + '-shield').textContent = 'Active';
    }
}

function moveBall(seconds) {
    ball.x += ball.vx * seconds;
    ball.y += ball.vy * seconds;

    if (ball.y < 8 || ball.y > HEIGHT - 8) {
        ball.y = Phaser.Math.Clamp(ball.y, 8, HEIGHT - 8);
        ball.vy *= -1;
        beep(300);
    }
    checkPaddle(school, 1);
    checkPaddle(student, -1);
    checkShield(school, 1);
    checkShield(student, -1);

    if (ball.x < -8) scorePoint(student);
    if (ball.x > WIDTH + 8) scorePoint(school);
}

function checkPaddle(player, direction) {
    const paddle = player.paddle;
    const movingTowards = ball.vx * direction < 0;
    const touching = Math.abs(ball.x - paddle.x) < 16 && Math.abs(ball.y - paddle.y) < 52;
    if (!movingTowards || !touching) return;

    // Hitting near an edge sends the ball at a steeper angle.
    const hitPosition = Phaser.Math.Clamp((ball.y - paddle.y) / 44, -1, 1);
    const angle = hitPosition * Math.PI / 3;
    ball.speed = Math.min(ball.speed + 25, MAX_BALL_SPEED);
    ball.vx = Math.cos(angle) * ball.speed * direction;
    ball.vy = Math.sin(angle) * ball.speed;
    ball.x = paddle.x + 17 * direction;
    burst(ball.x, ball.y, player.color);
    beep(520);
}

function checkShield(player, direction) {
    const shield = player.shield;
    const reachedShield = direction === 1 ? ball.x <= shield.x + 10 : ball.x >= shield.x - 10;
    if (!shield.visible || ball.vx * direction >= 0 || !reachedShield) return;
    ball.vx *= -1;
    ball.x = shield.x + 11 * direction;
    shield.setVisible(false);
    document.getElementById(player.name + '-shield').textContent = 'Used';
    burst(ball.x, ball.y, player.color);
    beep(700);
}

function scorePoint(player) {
    player.score++;
    updateScores();
    resetRound();
    beep(880);
    const name = player.name === 'school' ? 'School' : 'Student';
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
        document.getElementById(player.name + '-shield').textContent = 'Ready';
    }
    // Do not carry ability presses from a previous round into the next one.
    for (const key of [keys.A, keys.LEFT]) key.reset();
}

function updateScores() {
    document.getElementById('school-score').textContent = school.score;
    document.getElementById('student-score').textContent = student.score;
}

function showTitle(heading, detail) {
    document.getElementById('game').classList.remove('playing');
    title.setText(heading).setVisible(true);
    subtitle.setText(detail).setVisible(true);
    ball.setVisible(false);
}

function hideTitle() {
    document.getElementById('game').classList.add('playing');
    title.setVisible(false);
    subtitle.setVisible(false);
    ball.setVisible(true);
}

// Tiny fading circles create the bounce particle effect.
function burst(x, y, color) {
    for (let i = 0; i < 8; i++) {
        const particle = scene.add.circle(x, y, 3, color);
        scene.tweens.add({
            targets: particle,
            x: x + Phaser.Math.Between(-35, 35),
            y: y + Phaser.Math.Between(-35, 35),
            alpha: 0,
            duration: 350,
            onComplete: function () { particle.destroy(); }
        });
    }
}

// Generate short sounds, so no audio files are needed.
function beep(frequency) {
    if (!audio || audio.state !== 'running') return;
    const tone = audio.createOscillator();
    const volume = audio.createGain();
    tone.type = 'sine';
    tone.frequency.value = frequency;
    volume.gain.setValueAtTime(0.08, audio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.1);
    tone.connect(volume);
    volume.connect(audio.destination);
    tone.start();
    tone.stop(audio.currentTime + 0.1);
    tone.onended = function () { tone.disconnect(); volume.disconnect(); };
}

