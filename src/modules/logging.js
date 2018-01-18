//////////////////////////////////////////////////////////////////////
//  Author: Gareth
//  Date: 14/01/2018
//  Project: FTBDiscordBot - 
//////////////////////////////////////////////////////////////////////

const fs = require('fs');
const util = require('util');
const moment = require('moment');

const config = require('../../configs/config');


console.log("Checking if logs folder exists");
if (!fs.existsSync('logs')) {
    console.log("Making logs folder");
    fs.mkdirSync('logs');
}
if (!fs.existsSync('logs/servers')) {
    console.log("Making logs/servers folder");
    fs.mkdirSync('logs/servers');
}

function getTimestamp() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

function _write(file, message) {
    let logger = fs.createWriteStream('logs/' + file, {
        flags: 'a', // 'a' means appending (old data will be preserved)
        encoding: 'utf8'
    });
    logger.write(message + '\n');
    logger.end();
}

function info(msg) {
    let f_string = getTimestamp() + ' | INFO | ' + msg;
    if (config.logToFile) {
        _write('info.txt', f_string)
    }
    console.log(f_string)
}

function warn(msg) {
    let f_string = getTimestamp() + ' | WARN | ' + msg;
    if (config.logToFile) {
        _write('warn.txt', f_string)
    }
    console.log(f_string)
}

function error(msg) {
    let f_string = getTimestamp() + ' | ERROR | ' + msg;
    if (config.logToFile) {
        _write('error.txt', f_string)
    }
    console.log(f_string)
}

function public(guild, channel, user, message) {
    let f_string = getTimestamp() + ' | ' + guild + ' | #' + channel + ' ' + user + ' ' + message;
    if (config.logToFile) {
        if (!fs.existsSync('logs/servers/' + guild)) {
            fs.mkdirSync('logs/servers/' + guild);
        }
        _write('servers/' + guild + '/' + channel + '.txt', f_string)
    }
    console.log(f_string)
}

function messageUpdated(guild, channel, user, oldMessage, newMessage) {
    let f_string = getTimestamp() + ' | ' + guild + ' | #' + channel + ' ' + user + ' ' + oldMessage + ' > ' + newMessage;
    if (config.logToFile) {
        if (!fs.existsSync('logs/servers/' + guild + '/updated')) {
            fs.mkdirSync('logs/servers/' + guild + '/updated');
        }
        _write('servers/' + guild + '/updated/' + channel + '.txt', f_string)
    }
    console.log(f_string)
}

function messageDeleted(guild, channel, user, message) {
    let f_string = getTimestamp() + ' | ' + guild + ' | #' + channel + ' ' + user + ' ' + message;
    if (config.logToFile) {
        if (!fs.existsSync('logs/servers/' + guild + '/deleted')) {
            fs.mkdirSync('logs/servers/' + guild + '/deleted');
        }
        _write('servers/' + guild + '/deleted/' + channel + '.txt', f_string)
    }
    console.log(f_string)
}

function newBan(guild, user) {
    let f_string = getTimestamp() + ' | ' + guild + ' | ' + user;
    if (config.logToFile) {
        if (!fs.existsSync('logs/servers/' + guild + '/ban')) {
            fs.mkdirSync('logs/servers/' + guild + '/ban');
        }
        _write('servers/' + guild + '/ban/banned.txt', f_string)
    }
    console.log(f_string)
}

function removedBan(guild, user) {
    let f_string = getTimestamp() + ' | ' + guild + ' | ' + user;
    if (config.logToFile) {
        if (!fs.existsSync('logs/servers/' + guild + '/ban')) {
            fs.mkdirSync('logs/servers/' + guild + '/ban');
        }
        _write('servers/' + guild + '/ban/unBanned.txt', f_string)
    }
    console.log(f_string)
}

module.exports = {
    public: public,
    messageUpdated: messageUpdated,
    messageDeleted: messageDeleted,
    newBan: newBan,
    removedBan: removedBan,
    info: info,
    warn: warn,
    error: error
};