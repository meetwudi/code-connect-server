"use strict";

var channels = require('./channels.js'),
    existingChannels = {/*channelID: Channel*/};

function ChannelsManager() {}

ChannelsManager.prototype.checkChannelExists = function (channelID) {
    return !!existingChannels[channelID];
};

ChannelsManager.prototype.addChannel = function (channelID) {
    var newChannel = null;
    
    if (this.checkChannelExists(channelID)) {
        throw new Error('duplicated channel ID');
    }
    
    console.info('adding a new channel [' + channelID + ']');
    newChannel = existingChannels[channelID] = new channels.Channel(channelID, this);
};

ChannelsManager.prototype.removeChannel = function (channelID) {
    if (!this.checkChannelExists(channelID)) {
        throw new Error('cannot remove an non-existing channel');
    }
    
    existingChannels[channelID].unload();
};

ChannelsManager.prototype.notifyChannelDeleted = function (channelID) {
    existingChannels[channelID] = undefined;
    delete existingChannels[channelID];
};

ChannelsManager.prototype.unload = function () {
    var channelID, channel;
    
    for (channelID in existingChannels) {
        if (existingChannels.hasOwnProperty(channelID)) {
            channel = existingChannels[channelID];
            channel.unload();
        }
    }
};

module.exports = {
    ChannelsManager : ChannelsManager
};