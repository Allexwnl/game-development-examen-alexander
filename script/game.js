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
}

function update() {
    // Besturing volgt in de volgende stap.
}
