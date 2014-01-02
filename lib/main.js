#!/usr/bin/env node
"use strict";

var app = require('express')(),
    program = require('commander'),
    server = require('http').createServer(app),
    io = require('./sockets-manager.js').initSocketsManager(server),
    ChannelsManager = require('./channels-manager.js').ChannelsManager,
    channelsManager = new ChannelsManager(),
    port = require('../config.json').defaultPort; // default port

(function preload() {
    program
      .version(require('../package.json').version)
      .option('-p, --port [port]', 'Set socket listening port')
      .parse(process.argv);  
    
    if (program.port) { port = program.port; } // use custom port
})();


server.listen(port, function() {
	console.log("code connect server listing on port: " + port);
});

// Simple API for creating new channel
app.get('/_createChannel', function (req, res) {
    var channelID = req.query.channelID,
        res_body  = { result: false };
    
    if (channelID &&
            (channelID.match(/^[a-zA-Z]+[a-zA-Z\_]*[a-zA-Z]+$/) || 
             channelID.match(/^[a-zA-Z]$/)) &&
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
