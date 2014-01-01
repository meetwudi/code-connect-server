"use strict";

var io = require('./sockets-manager.js').getSocketsManager(),
    _  = require('underscore');

function Channel(channelID, channelsManager) {
    if (!channelID) {
        throw new Error('channelID is required');
    }
    
    this.channelID = channelID;
    this.channelNamespace = '/' + channelID;
    this.ownerSocketID = null;
    this.channel = io.of(this.channelNamespace);
    this.channelsManager = channelsManager;
    
    this._init();
}

Channel.prototype._init = function () {
    this.channel.on('connection', function (socket) {
        if (!this.ownerSocketID) {
            // Owner connection
            this.ownerSocketID = socket.id;
            console.info('Accepted [' + socket.id + '] as owner of ' + this.channelNamespace);
            
            // Receiving code
            socket.on('codeText', function (data) {
                socket.broadcast.to(this.channelID).emit('codeText', data);
            });
            
            // Disconnect all sockets in the namespace when
            // the owner socket disconnects
            socket.on('disconnect', function () {
                console.log('Owner socket of ' + this.channelNamespace + ' disconnected');
                this.unload();
            }.bind(this));
        } else {
            // Guest connection
            console.info('Accepted [' + socket.id + '] as guest of ' + this.channelNamespace);
        }
    }.bind(this));
};

Channel.prototype.unload = function () {
    var sockets = this.channel.sockets;
    
    _.values(sockets).forEach(function (socket) {
        if (socket.id !== this.ownerSocketID) {
            socket.disconnect();
        }
    }.bind(this));
    
    //unregister all event listeners
    this.channel.removeAllListeners();
    
    this.channelsManager.notifyChannelDeleted(this.channelID);
};

module.exports = {
    Channel       :   Channel
};