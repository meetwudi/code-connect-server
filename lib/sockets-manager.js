/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, node: true */
/*global require*/
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