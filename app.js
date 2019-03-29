const mongoose = require('mongoose');
const config = require('./config/config');

require('./models/ChatLog');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
promise = mongoose.connect(config.mongodb.URI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
});

promise.then(() => {
    console.log('MongoDB Connected!');
});

require('./web/bin/www');
require('./bot/bot');


