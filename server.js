var express = require('express');
var bodyParser = require('body-parser');
var leisure = require('leisure');
var cors = require('cors');
var passport = require('passport');
var config = require('./config');
var passportConfig = require('./passport-config');
var fs = require('fs');

var mediaTypes = [
  { contentType: 'application/hal+json' },
  { contentType: 'application/json' },
  { contentType: 'text/html' }
];

passportConfig.configure();

var frontent=false;
var webapp = null;

fs.existsSync = fs.existsSync || require('path').existsSync; //fix openshift problems
if (fs.existsSync(__dirname + "/public")) { 
	console.log('We have frontent!');
	frontent=true;
	webapp = express();
	webapp.use(express.static(__dirname + "/public"));

}





var app = express();
app.use(cors(config.settings.cors));
app.use(bodyParser());
app.use(leisure.accept(mediaTypes));
app.use(passport.initialize());

var routes = require('./routes');
app.use('/', routes.router);

function start () {
  var webport = config.settings.frontendPort;
  var port = config.settings.backendPort;
  
  app.listen(port, config.settings.server_ip_address);
  console.log('Appoints service started on port ' + port);
 
  if(frontent){
  	webapp.listen(webport, config.settings.server_ip_address);
  	console.log('Appoints webpage started on port ' + webport);
  }
}

exports.app = app;
if(frontent){
	exports.webapp = webapp;
}
exports.start = start;