const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const messageLog = mongoose.model('MessageLog');

/* GET home page. */
router.get('/chatLog', function(req, res, next) {
  let query = {};
  if(req.query.guild){
    query['guild'] = req.query.guild;
  }
  if(req.query.type){
    query['type'] = req.query.type;
  }

  messageLog.find(query, 'guild channel userID username messageID message type createdAt updatedAt', (err, docs) => {
    res.json(docs)
  });
});

module.exports = router;
