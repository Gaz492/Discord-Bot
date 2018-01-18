
const express = require('express');
const serveIndex = require('serve-index');

const config = require('../../configs/config');
const app = express();

app.use('/', express.static('logs/servers'), serveIndex('logs/servers', {'icons': true}));

app.listen(config.webServerPort, () => console.log('Bot Web listening on port ' + config.webServerPort.toString()  + '!'));