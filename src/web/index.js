
const express = require('express');
const serveIndex = require('serve-index');
const app = express();

app.use('/', express.static('logs/servers'), serveIndex('logs/servers', {'icons': true}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));