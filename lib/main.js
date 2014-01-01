#!/usr/bin/env node
"use strict";

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('./sockets-manager.js').initSocketsManager(server),
    ChannelsManager = require('./channels-manager.js').ChannelsManager,
    channelsManager = new ChannelsManager();

// Default listening port will be 6006
server.listen(6006);

// Simple API for creating new channel
app.get('/_createChannel', function (req, res) {
    var channelID = req.query.channelID,
        res_body  = { result: false };
    
    if (channelID &&
            channelID.match(/^[a-zA-Z\_]+$/) &&
            !channelsManager.checkChannelExists(channelID)) {
        channelsManager.addChannel(channelID);
        res_body.result = true;
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(res_body);
});

// Close all sockets when the application exits
// Remember: The main event loop will no longer be run after the 'exit' 
// callback finishes, so timers may not be scheduled.
process.on('exit', function () {
    channelsManager.unload();
});