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
    if(message.toString().startsWith('!')){
        commandManager.onCommand(message)
    }
});

client.on('messageUpdate', (oldMessage, newMessage) =>{
    logging.messageUpdated(oldMessage.guild.name, oldMessage.channel.name, oldMessage.author.username + '#' + oldMessage.author.discriminator, oldMessage.toString(), newMessage.toString());
    if(newMessage.toString().startsWith('!')){
        commandManager.onCommand(newMessage)
    }else{

    }
});

client.login(config.bot_token);