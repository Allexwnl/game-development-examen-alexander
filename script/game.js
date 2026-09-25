// Achteraf gereconstrueerde tussenstap; zie HERINDELING.md.
const WIDTH = 960;
const HEIGHT = 440;
let school;
let student;
let ball;
let keys;

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#08090a',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: { create: create, update: update }
});

function create() {
    school = this.add.rectangle(60, HEIGHT / 2, 16, 88, 0xff294d);
    student = this.add.rectangle(WIDTH - 60, HEIGHT / 2, 16, 88, 0x00ca7c);
    ball = this.add.circle(WIDTH / 2, HEIGHT / 2, 8, 0xffffff);
    ball.vx = 320;
    ball.vy = 100;
    keys = this.input.keyboard.addKeys('W,S,UP,DOWN');
}

function update(time, delta) {
    const seconds = Math.min(delta / 1000, 0.05);
    movePlayer(school, keys.W, keys.S, seconds);
    movePlayer(student, keys.UP, keys.DOWN, seconds);
    ball.x += ball.vx * seconds;
    ball.y += ball.vy * seconds;
    // Tijdelijke randbotsingen; echte Pong-botsingen volgen in stap 4.
    if (ball.x < 8 || ball.x > WIDTH - 8) {
        ball.x = Phaser.Math.Clamp(ball.x, 8, WIDTH - 8);
        ball.vx *= -1;
    }
    if (ball.y < 8 || ball.y > HEIGHT - 8) {
        ball.y = Phaser.Math.Clamp(ball.y, 8, HEIGHT - 8);
        ball.vy *= -1;
    }
}

function movePlayer(paddle, up, down, seconds) {
    if (up.isDown) paddle.y -= 340 * seconds;
    if (down.isDown) paddle.y += 340 * seconds;
    paddle.y = Phaser.Math.Clamp(paddle.y, 44, HEIGHT - 44);
}
