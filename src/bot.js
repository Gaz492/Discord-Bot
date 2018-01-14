//////////////////////////////////////////////////////////////////////
//  Author: Gareth
//  Date: 14/01/2018
//  Project: FTBDiscordBot - 
//////////////////////////////////////////////////////////////////////

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('../configs/bot');
const logging = require('./modules/logging');
const commandManager = require('./modules/commandHandler');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    logging.public(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
});

client.on('messageUpdate', (oldMessage, newMessage) =>{
    if (oldMessage.toString() !== newMessage.toString()){
        logging.messageUpdated(oldMessage.guild.name, oldMessage.channel.name, oldMessage.author.username + '#' + oldMessage.author.discriminator, oldMessage.toString(), newMessage.toString());
    }
});

client.on('messageDelete', message =>{
    logging.messageDeleted(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
});

client.login(config.bot_token);