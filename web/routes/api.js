const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const messageLog = mongoose.model('MessageLog');
const Guilds = mongoose.model('Guilds');

/* GET home page. */
router.get('/chatLog', function (req, res, next) {
    let query = {};
    let limit = 1000;
    let skip = 0;
    if (req.query.guild) {
        query['guild'] = req.query.guild;
    }
    if (req.query.type) {
        query['type'] = req.query.type;
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.skip) {
        skip = parseInt(req.query.skip);
    }
    console.log(skip);

    messageLog.find(query, 'guild channel userID username messageID message type createdAt updatedAt', {
        sort: {_id: -1},
        limit: limit,
        skip: skip
    }, (err, docs) => {
        res.json(docs)
    });
});

router.get('/guilds', function (req, res, next) {
    Guilds.find({}, 'guildID guildName', (err, docs) => {
        res.json(docs)
    });
});

module.exports = router;
