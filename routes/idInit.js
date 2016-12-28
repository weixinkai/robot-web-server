var express = require('express');
var router = express.Router();
var config = require('../config');
var fs = require('fs');

//注册接口
router.post('/', function(req, res, err){
  if(global.robotID){
    res.status(500).send('No repeat init');
    return;
  }

  var robotID = req.body.id;
  if(!robotID){
    res.status(500).send('Can not find id');
    return;
  }
  var id = JSON.stringify({id: robotID});
  fs.writeFile(config.idFile, id, {flag: 'wx'}, (err)=>{
    if(err){
      res.status(500).send('No repeat init');
      return;
    }
    global.robotID = robotID;
    res.send('Init success');
    global.heartbeatGenerator.start();
  });
});

module.exports = router;
