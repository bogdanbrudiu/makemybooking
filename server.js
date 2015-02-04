var config = require('./config');
var mongoose = require('mongoose');
var app = require('./app');

mongoose.connect(config.settings.db.connectionString);
app.start();