var fs = require('fs');
var express = require('express');

var app = express.createServer(express.logger());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var content = fs.readFileSync("index.html").toString();
  response.send(content);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
