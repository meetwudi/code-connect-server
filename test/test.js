/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, node: true*/
/*global require, describe, it, before, after, beforeEach, afterEach*/
"use strict";

var io = require('socket.io-client'),
    should = require('should'),
    request = require('request');

var serverURL = 'http://localhost:6006',
    socketNamespace = '/test_Channel',
    channelID = 'test_Channel',
    socketOptions = {
        transports : ['websocket'],
        'force new connection': true
    },
    socket = null;

describe('Code Connect Server', function () {
    it('should be able to create new channel', function (done) {
        request.get({
            url  : serverURL + '/_createChannel',
            qs : { channelID: channelID }
        }, function (err, res, body) {
            var result;
            
            res.should.have.status(200);
            result = JSON.parse(body);
            result.should.be.an.Object;
            result.should.have.property('result');
            result.result.should.be.true;
            
            done();
        });
    });
    
    it('should not be able to create a duplicated channel', function (done) {
        request.get({
            url  : serverURL + '/_createChannel',
            qs : { channelID: channelID }
        }, function (err, res, body) {
            var result;
            
            res.should.have.status(200);
            result = JSON.parse(body);
            result.should.be.an.Object;
            result.should.have.property('result');
            result.result.should.be.false;
            
            done();
        });
    });
    
    it('should be able to connect to the namespace', function (done) {
        socket = io.connect(serverURL + socketNamespace);
        socket.on('connect', function () {
            socket.socket.connected.should.be.true;
            done();
        }.bind(this));
    });
    
    
    after(function () {
        socket.disconnect();
    });
});