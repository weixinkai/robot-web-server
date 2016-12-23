var path = require("path");
var exec = require('child_process').execSync;
var config = {
  logPath: path.join(__dirname, 'tmp'), //日志路径
  monitorShellpath: path.join(__dirname, 'cmd', 'monitor.sh'), //监测脚本路径
  version: "5.1",
  // id: "xxxxx",
  idFile: path.join(__dirname, 'id.cfg'),
  ram: getRam(),
  storage: getStorage(),
  serverURL: "http://192.168.199.215/api/robot/Log", //心跳包 post url
  robotStatusURL: "http://127.0.0.1:50016/getRobotStatus",
  heartbeat_freq: 300  //freq 秒
};

module.exports = config;

//function def
function getRam(){
  cmd = "busybox free -m |busybox awk 'NR==2 {print $2}'"
  return exec(cmd) + "M";
}

function getStorage(){
  cmd = "busybox df -k |busybox awk '!match($6,/\\/emulated/) {sum+=$2}END{print sum}'"
  return exec(cmd) + "M";
}
