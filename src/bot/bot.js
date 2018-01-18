//////////////////////////////////////////////////////////////////////
//  Author: Gareth
//  Date: 14/01/2018
//  Project: FTBDiscordBot - 
//////////////////////////////////////////////////////////////////////

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const config = require('../../configs/config');
const logger = require('./modules/logging');

client.on('ready', () => {
    logger.info('I am ready!');
    client.user.setGame(config.playingText);
    let currentGuilds = client.guilds.array();
    for (let guild in currentGuilds) {
        if (!fs.existsSync('logs/servers/' + currentGuilds[guild].name)) {
            logger.info('Making folder ' + currentGuilds[guild].name);
            fs.mkdirSync('logs/servers/' + currentGuilds[guild].name);
        }
    }
});

client.on('message', message => {
    logger.public(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.toString() !== newMessage.toString()) {
        logger.messageUpdated(oldMessage.guild.name, oldMessage.channel.name, oldMessage.author.username + '#' + oldMessage.author.discriminator, oldMessage.toString(), newMessage.toString());
    }
});

client.on('messageDelete', message => {
    logger.messageDeleted(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
});

client.on('guildUpdate', (oldGuild, newGuild) => {
    if(oldGuild.name !== newGuild.name){
        if (fs.existsSync('logs/servers/' + oldGuild.name)) {
            logger.info('Renaming log folder ' + oldGuild.name + ' to ' + newGuild.name);
            fs.rename('logs/servers/' + oldGuild.name, 'logs/servers/' + newGuild.name, function(err){
                if(err){
                    logger.error('An error occurred when renaming log folder ' + oldGuild.name + ' to ' + newGuild.name)
                }
            });
        }
    }
});

client.on('guildBanAdd', (guild, user) => {
    logger.newBan(guild.name, user.username + '#' + user.discriminator);
});

client.on('guildBanRemoved', (guild, user) => {
    logger.removedBan(guild.name, user.username + '#' + user.discriminator);
});

client.login(config.bot_token);