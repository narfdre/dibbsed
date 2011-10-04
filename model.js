var	mongoose = require('mongoose'),
	schema = mongoose.Schema,
	objectId = schema.ObjectId;

var User = new schema({
		id: objectId,
		firstName : String,
     	lastName : String,
		email: { type: String, unqiue: true },
		google: { type: String, unqiue: true },
		twitter: { type: String, unique: true }, 
		facebook: { type: String, unique: true }
});

var Dibb = new schema({
		id : objectId,
     	name : String,
     	email: String,
      	name : { type: String, unique: true },
      	description : String,
      	date : { type: Date, default: Date.now },
      	endDate : Date,
      	active : Boolean,
      	tags : [String]
});

exports.getUserModel = function(){
	return mongoose.model('user', User);
}

exports.getDibbModel = function(){
	return mongoose.model('dibb', Dibb);
}
