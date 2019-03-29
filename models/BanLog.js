const mongoose = require('mongoose');
const {Schema} = mongoose;

const banSchema = new Schema({
    userID: Number,
    username: String,
    guild: String,
    channel: String,
    message: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

mongoose.model('BanLog', banSchema);
