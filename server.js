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
  { contentType: 'text/html' },
  { contentType: 'text/css' },
  { contentType: 'application/javascript' }
 
];

passportConfig.configure();

var frontent=false;
var webapp = null;

fs.existsSync = fs.existsSync || require('path').existsSync; //fix openshift problems
if (fs.existsSync(__dirname + "/public")) { 
	console.log('We have frontent!');
	frontent=true;
}





var app = express();
app.use(cors(config.settings.cors));
app.use(bodyParser());
app.use(leisure.accept(mediaTypes));
app.use(passport.initialize());

var routes = require('./routes');
app.use('/api/', routes.router);

function start () {
  var port = config.settings.port;
  
  app.listen(port);//, config.settings.server_ip_address);
  console.log('Appoints service started on port ' + port);
 
  if(frontent){

	app.use(express.static(__dirname + "/public"));

  }
}

exports.app = app;
if(frontent){
	exports.webapp = webapp;
}
exports.start = start;