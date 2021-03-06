const mongoose = require('mongoose');
const {Schema} = mongoose;

const MessageSchema = new Schema({
    guild: String,
    channelParent: String,
    channel: String,
    userID: String,
    username: String,
    messageID: String,
    message: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

mongoose.model('MessageLog', MessageSchema);
