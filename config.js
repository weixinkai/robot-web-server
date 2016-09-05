var path = require("path");
var config = {
  logPath: path.join(__dirname, 'tmp'), //日志路径
  monitorShellpath: path.join(__dirname, 'cmd', 'monitor.sh'), //监测脚本路径
  version: "4.4.2",
  // id: "xxxxx",
  idFile: path.join(__dirname, 'id.cfg'),
  ram: "2G",
  storge: "2.7G",
  serverURL: "http://192.168.123.20:3000/heartbeat", //心跳包 post url
  heartbeat_freq: 10  //freq 秒
};

module.exports = config;
