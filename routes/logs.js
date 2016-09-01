var express = require('express');
var fs = require('fs');
var router = express.Router();

var logPath = 'D:/tmp/';
/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readdir(logPath, function(err, files) {
        if (err) {
            next(err);
        }

        var logStats=[];
      	files.forEach((file)=>{
      		var stat = fs.statSync(logPath + file);
          if(stat.isFile()){
            logStats.push({"name":file, "size":stat.size, "date":stat.birthtime.toLocaleDateString()});
          }
      	});

        res.render('logs-list', {
            title: 'logs',
            logfiles: logStats
        });
    });

});

router.get('/get', function(req, res, next) {
    var logName = req.query.logName;
    if (!logName) {
        getLogFail(res);
        return;
    }
    getLogContent(res, logName);
});

router.get('/download', function(req, res, next){
    var logName = req.query.logName;
    res.download(logPath+logName);
});

module.exports = router;

//function area
function getLogFail(res) {
    res.render('log', {
        title: '日志',
        logName: '找不到指定文件'
    });
}

function getLogContent(res, logName) {
    fs.readFile(logPath + logName, function(err, data) {
        if (err) {
            // console.log(err); //for test
            getLogFail(res);
            return;
        }
        data = data.toString().split("\n").reverse().join("\n");
        //console.log(data);
        res.render('log', {
            title: '日志',
            logName: logName,
            logContent: data
        });
    });
}
