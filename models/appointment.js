var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
	title : {
		type : String//,required : 'Appointment description is required'
	},
	user : {
		id : {
			type : String,
			required : true
		},
		displayName : String
	},
	resource : {
		id : {
			type : String
		},
		displayName : String
	},
	client : {
		id : {
			type : String
		},
		displayName : String,
		email: String,
		phone: String
	},
	dateAndTime : {
		type : Date,
		required : true
	},
	endDateAndTime : {
		type : Date,
		required : true
	},
	remarks : [{displayName: String , duration:  Number}],
	status : String
});

AppointmentSchema.virtual('duration').get(function() {
	var durationMs = this.endDateAndTime - this.dateAndTime;
	if (durationMs) {
		return Math.round(((durationMs % 86400000) % 3600000) / 60000);
	} else {
		return;
	}
});

AppointmentSchema.path('dateAndTime').validate(function(value, done) {
	var self = this;
	var query = {
			'_id' : {
				$ne : self._id
			},
			'user.id' : self.user.id,
			$or : [ {
				dateAndTime : {
					$lt : self.endDateAndTime,
					$gte : self.dateAndTime
				}
			}, {
				endDateAndTime : {
					$lte : self.endDateAndTime,
					$gt : self.dateAndTime
				}
			} ]
		};
	if(self.resource){
		query["resource.id"]=self.resource.id;
	}
	return mongoose.models.Appointment.find(query, function(err, appointments) {
		done(!appointments || appointments.length === 0);
	});
}, "The appointment overlaps with other appointments");

AppointmentSchema.path('dateAndTime').validate(function(value, done) {
	var isValid = true;
	if (value < new Date()) {
		isValid = false;
	}
	done(isValid);
}, "The appointment can not be scheduled in the past");

module.exports = mongoose.model('Appointment', AppointmentSchema);