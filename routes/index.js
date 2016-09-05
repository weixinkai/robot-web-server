var express = require('express');
var router = express.Router();

var config = require("../config");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '基本信息', version: config.version, id:global.robotID?global.robotID:"机器人未绑定序列号", ram:config.ram, storge:config.storge });
});

module.exports = router;
