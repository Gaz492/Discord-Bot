const mongoose = require('mongoose');
const {Schema} = mongoose;

const GuildSchema = new Schema({
    guildID: String,
    guildName: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

mongoose.model('Guilds', GuildSchema);