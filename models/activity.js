var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivitySchema = new Schema({
  displayName: { type: String },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  user: {
	    id: { type: String, required: true },
	    displayName: String
	  }
});



module.exports = mongoose.model('Activity', ActivitySchema);