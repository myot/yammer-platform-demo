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

var templateData = {
  dataAppId: conf.dataAppId
}

// Just serve out the one template file
app.get('/yammer_client.html', function(req, res){
  app.render('yammer_client.html.handlebars', templateData, function(err, html){
    if (err) {
      console.log(err);
      res.send(500, { error: err });
    } else {
      res.set('Content-Type', 'text/html');
      res.set('Cache-Control', 'no-cache');
      res.send(html);
    }
  });
});

app.get('/facebook_client.html', function(req, res){
  app.render('facebook_client.html.handlebars', templateData, function(err, html){
    if (err) {
      console.log(err);
      res.send(500, { error: err });
    } else {
      res.set('Content-Type', 'text/html');
      res.set('Cache-Control', 'no-cache');
      res.send(html);
    }
  });
});


app.listen(conf.port);

console.log('PID: ' + process.pid);
console.log('URL:');
console.log('http://local.yammer.dev:' + conf.port + '/yammer_client.html');
