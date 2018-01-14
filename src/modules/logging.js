//////////////////////////////////////////////////////////////////////
//  Author: Gareth
//  Date: 14/01/2018
//  Project: FTBDiscordBot - 
//////////////////////////////////////////////////////////////////////

const fs = require('fs');
const util = require('util');
const moment = require('moment');

const config = require('../../configs/bot');

const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;


console.log("Checking if logs folder exists");
if (!fs.existsSync('logs')){
    console.log("Making logs folder");
    fs.mkdirSync('logs');
}
if (!fs.existsSync('logs/servers')){
    console.log("Making logs/servers folder");
    fs.mkdirSync('logs/servers');
}

function getTimestamp(){
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

function _write(file, message){
    let logger = fs.createWriteStream('logs/' + file, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });
    logger.write(message + '\n');
    logger.end();
}

function info(msg){
    let f_string = getTimestamp() + ' | INFO | ' + msg;
    if (config.logToFile){
        _write('info.log', f_string)
    }
    console.log(f_string)
}

function warn(msg){
    let f_string = getTimestamp() + ' | WARN | ' + msg;
    if (config.logToFile){
        _write('warn.log', f_string)
    }
    console.log(f_string)
}

function error(msg){
    let f_string = getTimestamp() + ' | ERROR | ' + msg;
    if (config.logToFile){
        _write('error.log', f_string)
    }
    console.log(f_string)
}

function public(guild, channel, user, message){
    let f_string = getTimestamp() + ' | ' + guild + ' | #' + channel + ' ' + user + ' ' + message;
    if (config.logToFile){
        if (!fs.existsSync('logs/servers/' + guild)){
            fs.mkdirSync('logs/servers/' + guild);
        }
        _write('servers/' + guild + '/' + channel + '.log', f_string)
    }
    console.log(f_string)
}

function messageUpdated(guild, channel, user, oldMessage, newMessage){
    let f_string = getTimestamp() + ' | ' + guild + ' | #' + channel + ' ' + user + ' ' + oldMessage + ' > ' + newMessage;
    if (config.logToFile){
        if (!fs.existsSync('logs/servers/' + guild + '/updated')){
            fs.mkdirSync('logs/servers/' + guild + '/updated');
        }
        _write('servers/' + guild + '/updated/' + channel + '.log', f_string)
    }
    console.log(f_string)
}

module.exports = {
    public: public,
    messageUpdated: messageUpdated,
    info: info,
    warn: warn,
    error: error
};