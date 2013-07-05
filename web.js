var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var content = fs.readFyleSync("index.html").toString();
  response.send(content);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
