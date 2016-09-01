var path = require("path");
var config = {
  logPath: "/var/log/", //日志路径
  monitorShellpath: path.join(__dirname, 'cmd', 'monitor.sh'), //监测脚本路径
  version: "4.4.2",
  id: "xxxxx",
  ram: "2G",
  storge: "100G"
};

module.exports = config;
