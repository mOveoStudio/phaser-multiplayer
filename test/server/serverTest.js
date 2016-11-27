var expect = require('chai').expect;
var GameServer = require('../../src/server/game-server');

describe('Server Class tests', function () {
    var gameServer;

    beforeEach(function () {
        gameServer = new GameServer();
    });

    it('should server class has init method', function () {
        expect(gameServer.init).to.be.a('function');
    });

    it('should server class has broadcast method', function () {
        expect(gameServer.broadcast).to.be.a('function');
    });

});