const Discord = require('discord.js');
const mongoose = require('mongoose');

const client = new Discord.Client();
const MessageLog = mongoose.model('MessageLog');
// const editedMessageLog = mongoose.model('EditedMessageLog');
// const deletedMessageLog = mongoose.model('DeletedMessageLog');

const config = require('../config/config');
const enums = require('../util/enums');


client.on('ready', () => {
    console.log("Discord Connected");
    client.user.setActivity(config.discord.activityText);
    //TODO Log guilds to mongodb
    // let currentGuilds = client.guilds.array();
    // for (let guild in currentGuilds) {
    //     if (!fs.existsSync('logs/servers/' + currentGuilds[guild].name)) {
    //         logger.info('Making folder ' + currentGuilds[guild].name);
    //         fs.mkdirSync('logs/servers/' + currentGuilds[guild].name);
    //     }
    // }
});

client.on('message', message => {
    // logger.public(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
    try {
        const logMessage = {
            guild: message.guild.name,
            channel: message.channel.name,
            userID: message.author.id,
            username: message.author.username + '#' + message.author.discriminator,
            messageID: message.id,
            message: message.toString(),
            type: enums.messageType.NEW
        };

        const log = new MessageLog(logMessage).save()
    } catch (err) {
        console.error("Invalid User ID")
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.toString() !== newMessage.toString()) {
        // logger.messageUpdated(oldMessage.guild.name, oldMessage.channel.name, oldMessage.author.username + '#' + oldMessage.author.discriminator, oldMessage.toString(), newMessage.toString());
        try {
            const logMessage = {
                guild: newMessage.guild.name,
                channel: newMessage.channel.name,
                userID: newMessage.author.id,
                username: newMessage.author.username + '#' + newMessage.author.discriminator,
                messageID: newMessage.id,
                message: newMessage.toString(),
                type: enums.messageType.UPDATED
            };

            const log = new MessageLog(logMessage).save()
        } catch (err) {
            console.error("Invalid User ID")
        }
    }
});

client.on('messageDelete', message => {
    // logger.messageDeleted(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
    try {
        const logMessage = {
            guild: message.guild.name,
            channel: message.channel.name,
            userID: message.author.id,
            username: message.author.username + '#' + message.author.discriminator,
            messageID: message.id,
            message: message.toString(),
            type: enums.messageType.DELETED
        };

        const log = new MessageLog(logMessage).save()
    } catch (err) {
        console.error("Invalid User ID")
    }
});


client.login(config.discord.bot_token);
