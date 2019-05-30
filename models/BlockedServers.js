const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlockedServersSchema = new Schema({
    hostname: String,
    currentlyBlocked: Boolean,
    hostnameFound: Boolean,
    lastBlocked: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
mongoose.model('BlockedServersSchema', BlockedServersSchema);

const ServerHashSchema = new Schema({
    hostname: String,
});
mongoose.model('ServerHashSchema', ServerHashSchema);
