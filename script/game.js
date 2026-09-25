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
    this.add.text(WIDTH / 2, HEIGHT / 2, 'Phaser is ready', { fontSize: '28px' }).setOrigin(0.5);
}

function update() {
    // Nog geen spelbeweging in deze stap.
}
