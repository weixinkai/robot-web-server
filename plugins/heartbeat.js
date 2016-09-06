var http = require("http");
var urlParse = require("url").parse;
var fs = require("fs");
var path = require("path");
var config = require("../config.js");

var heartbeatGenerator = null
module.exports = {
  start: function(){
    if(heartbeatGenerator){
      console.log("heartbeat is working!");
      return;
    }
    console.log("start generate heartbeat");
    sendheartbeat()
    heartbeatGenerator = setInterval(sendheartbeat, 1000*config.heartbeat_freq);
  },
  stop: function(){
    if(!heartbeatGenerator){
      console.log("heartbeat has been stopped!");
      return;
    }
    console.log("stop generate heartbeat");
    clearInterval(heartbeatGenerator);
    heartbeatGenerator = null;
  }
};

//func def
function sendheartbeat(){
	if(!global.robotID){
		console.log('Robot has not init!');
		return;
	}

  var postData = JSON.stringify(logGenerate()); //form post need head "heartbeat="
  var serverInfo = urlParse(config.serverURL);
  var option = {
    hostname: serverInfo.hostname,
    port: serverInfo.port,
    path: serverInfo.pathname,
    method: "POST",
    headers: {
    'Content-Type': 'application/json', //x-www-form-urlencoded for form post
    'Content-Length': Buffer.byteLength(postData)
    }
  };
  var req = http.request(
      option,
      (res)=>{
          // console.log(`Heartbeat Status: ${res.statusCode}`);
  }).on('error', (e)=>{
     console.error(`Heartbeat error: ${e.message}`);
  });
  req.write(postData);
  req.end();
}

//for test
var types = ["debug", "warn"];
var operations = {
	debug : ["视频通话", "测量血压", "定向移动", "灯光控制", "提醒吃药"],
	warn : ["电量过低", "血压不正常"]
};
function GetRandomNum(Max){
  var Range = Max;
  var Rand = Math.random();
  return(Math.round(Rand * Range));
}


function logGenerate(){
	var type = types[GetRandomNum(types.length - 1)];
  var operation = operations[type][GetRandomNum(operations[type].length - 1)];
	var log = {
		RobotNo : global.robotID,
		Type : type,
		Operation : operation,
		CreateDate : (new Date()).Format('yyyy-MM-dd hh:mm:ss'),
		Remark : "Remark",
		Editor : "Robot0",
		IsDelete : false
	};

	var logName = (new Date()).Format('yyyy-MM-dd') + ".log";
	var content = `${log.CreateDate}\t${log.Editor}:[${log.Type}]\t${log.Operation}\n`;
	fs.writeFile(path.join(config.logPath, logName), content, {flag: 'a'});
	return log;
}
