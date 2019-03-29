const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const chatLog = mongoose.model('ChatLog');

/* GET home page. */
router.get('/chatLog', function(req, res, next) {
  let query = {};
  if(req.query.guild){
    query['guild'] = req.query.guild;
  }
  if(req.query.type){
    query['type'] = req.query.type;
  }

  chatLog.find(query, 'guild channel userID username messageID message oldMessage type createdAt updatedAt', (err, docs) => {
    res.json(docs)
  });
});

module.exports = router;
