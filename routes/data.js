var express = require('express');
var config = require("../config");
var router = express.Router();
var http=require("http");
var urlParse = require("url").parse;

/* GET users listing. */
router.get('/', function(req, res, next) {
    getdata(config.robotStatusURL, res);

});

module.exports = router;

//function area
function getdata(url, originRes){
    var serverInfo = urlParse(url)
    
    var req = http.get(
        url,
        (res)=>{
            var result = '';
            res.on('data', (data) => {
                result += data;                
            });
            res.on('end', ()=>{
                var d = JSON.parse('{' + result.replace(/\r\n/g, ',').replace(/,$/,'') + '}');
                originRes.render('data-list', {title: '参数列表', robotData: d});     
            });
        }).on('error', (e)=>{
            console.error(`Get data error: ${e.message}`);
            originRes.render('data-list', {title: '参数列表', robotData: {}});
        });
    req.end();
}