var path = require("path");
var config = {
  logPath: "D:/tmp/", //日志路径
  monitorShellpath: path.join(__dirname, 'cmd', 't.bat') //监测脚本路径
};

module.exports = config;
