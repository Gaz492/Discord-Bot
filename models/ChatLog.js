const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    guild: String,
    channel: String,
    userID: String,
    username: String,
    messageID: String,
    message: String,
    oldMessage: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

mongoose.model('ChatLog', chatSchema);
