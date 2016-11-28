"use strict";
requirejs.config({
    // baseUrl: 'js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: './vendors/jquery.min',
        Phaser: './vendors/phaser',
        io:'/socket.io/socket.io'
    },

    // Add this map config in addition to any baseUrl or
    // paths config you may already have in the project.
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-private': { 'jquery': 'jquery' }
    }
});

requirejs(    ['Phaser', 'io', 'jquery'],
    (Phaser, io, $) => {
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        })

        console.log('require JS OK');

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
    });


