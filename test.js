var fs = require("fs");

fs.readFile('D:/tmp/20160823.log', function(err, data){
  if(err){
    next(err);
  }
  console.log(data.toString());
  data = data.toString().replace(/[\n\r]/, "</br>")
  console.log(data);
});
