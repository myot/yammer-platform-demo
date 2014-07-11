var express = require('express');
var consolidate = require('consolidate');
var path = require('path');
var fs = require('fs');

var app = express();
app.engine('handlebars', consolidate.handlebars);
app.set('views', __dirname + '/views');

// Read conf file
var confPath = path.normalize(__dirname + '/server.conf');
var confFile = fs.readFileSync(confPath, 'utf8');
var conf = JSON.parse(confFile);

var port = process.env.PORT || conf.port;

var templateData = {
  dataAppId: conf.dataAppId
};

var handleHTMLView = function (req, res){  
  app.render(req.params.name + '.html.handlebars', templateData, function(err, html){
    if (err) {
      console.log(err);
      res.send(500, { error: err });
    } else {
      res.set('Content-Type', 'text/html');
      res.set('Cache-Control', 'no-cache');
      res.send(html);
    }
  });
};

app.get('/:name.html', handleHTMLView);

app.listen(port);

console.log('PID: ' + process.pid);
console.log('URL:');
console.log('http://localhost:' + conf.port + '/index.html');