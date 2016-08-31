var express = require('express');
var router = express.Router();

var exec = require("child_process").execSync;
/* GET home page. */
router.get('/', function(req, res, next) {
	var cmdStr = "cat /home/k/cpu.log";
	var result = exec(cmdStr);
	res.send(result.toString());
	  
	  
});

router.get('/get', function(req, res, next){
  res.render("ajax");
});
module.exports = router;
