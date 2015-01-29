var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResourceSchema = new Schema({
  displayName: { type: String, required: true },
  user: {
	    id: { type: String, required: true },
	    displayName: String
	  }
});



module.exports = mongoose.model('Resource', ResourceSchema);