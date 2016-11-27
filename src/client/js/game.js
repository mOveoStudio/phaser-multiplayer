var socket = io.connect();

var messages = [];

var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

socket.on('message', function(message){
    messages.push(message);
    game.add.text(850, 20 * messages.length + 20, message, { font: "14px Arial", fill: "#bebebe", align: "center" });
});

function preload() {
    game.load.image('a-team', 'assets/sprites/a-team.png');
}

function create() {
    game.stage.backgroundColor = '#2a75bb';
    game.add.sprite(100, 50, 'a-team');
    game.add.text(160, 350, "Hello multiplayer world !", { font: "35px Arial", fill: "#bebebe", align: "center" });
}

function update() {
}

function render() {

}