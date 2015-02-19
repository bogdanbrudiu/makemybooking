var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivitySchema = new Schema({
  displayName: { type: String },
  duration: { type: String, required: true },
  user: {
	    id: { type: String, required: true },
	    displayName: String
	  }
});



module.exports = mongoose.model('Activity', ActivitySchema);