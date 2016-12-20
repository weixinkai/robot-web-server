var express = require('express');
var config = require("../config");
var router = express.Router();
var http=require("http");
var urlParse = require("url").parse;

var logPath = config.logPath + '/';
/* GET users listing. */
router.get('/', function(req, res, next) {
    getdata('http://192.168.123.73:3000/monitor', res);

});

module.exports = router;

//function area
function getdata(url, originRes){
    var serverInfo = urlParse(url)
    
    var req = http.get(
        url,
        (res)=>{
            res.on('data', (data) => {
                
                var d = JSON.parse(data.toString());
                originRes.render('data-list', {title: '参数列表', robotData: d}); 
            });
        }).on('error', (e)=>{
            console.error(`Get data error: ${e.message}`);
            originRes.render('data-list', {title: '参数列表', robotData: {}});
        });
    req.end();
}