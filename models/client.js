var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClientSchema = new Schema({
  displayName: { type: String },
  email: { type: String },
  phone: { type: String, required: true },
  user: {
	    id: { type: String, required: true },
	    displayName: String
	  }
});



module.exports = mongoose.model('Client', ClientSchema);