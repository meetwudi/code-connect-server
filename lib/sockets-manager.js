"use strict";

var io = null;

function getSocketsManager() {
    return io;
}

function initSocketsManager(app) {
    io = require('socket.io').listen(app);
    return io;
}

module.exports = {
    getSocketsManager   : getSocketsManager,
    initSocketsManager  : initSocketsManager
};