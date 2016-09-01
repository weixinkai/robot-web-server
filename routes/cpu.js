var express = require('express');
var router = express.Router();

var path = require("path");
var spawn = require('child_process').spawn;
var monitorName = 't.bat';

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
	var projectDir = path.dirname(__dirname);
  var monitor = spawn(path.join(projectDir, 'cmd', monitorName));
  monitor.stdout.on('data', function(data){
    systemStatus = data.toString();
  });
  monitor.stderr.on('data', function(data){
    console.log(`monitor err: ${data}`);
  });
}
