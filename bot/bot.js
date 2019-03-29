const Discord = require('discord.js');
const mongoose = require('mongoose');

const client = new Discord.Client();
const chatLog = mongoose.model('ChatLog');

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
            oldMessage: '',
            type: enums.messageType.NEW
        };

        const log = new chatLog(logMessage).save()
    } catch (err) {
        console.error("Invalid User ID")
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.toString() !== newMessage.toString()) {
        // logger.messageUpdated(oldMessage.guild.name, oldMessage.channel.name, oldMessage.author.username + '#' + oldMessage.author.discriminator, oldMessage.toString(), newMessage.toString());
        const msgID = {messageID: oldMessage.id};
        chatLog.findOneAndUpdate(msgID, {message: newMessage.toString(), oldMessage: oldMessage.toString(), type: enums.messageType.UPDATED}, {}, (err, doc) => {
            if(err){
                console.error("Something went wrong")
            }
        })
    }
});

client.on('messageDelete', message => {
    // logger.messageDeleted(message.guild.name, message.channel.name, message.author.username + '#' + message.author.discriminator, message.toString());
    const msgID = {messageID: message.id};
    chatLog.findOneAndUpdate(msgID, {type: enums.messageType.DELETED}, {}, (err) => {
        if(err){
            console.error("Something went wrong")
        }
    })
});


client.login(config.discord.bot_token);
