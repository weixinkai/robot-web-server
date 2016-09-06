var express = require('express');
var router = express.Router();
var config = require("../config.js");
var spawn = require('child_process').spawn;

var systemStatus = null;
//start system monitor
startMonitor();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send(JSON.parse(systemStatus));
});

router.get('/get', function(req, res, next){
  res.render("ajax");
});

module.exports = router;

//function def
function startMonitor(){
	var monitor = spawn(config.monitorShellpath);
  monitor.stdout.on('data', function(data){
    systemStatus = data.toString();
  });
  monitor.stderr.on('data', function(data){
    console.error(`monitor err: ${data}`);
  });
}
