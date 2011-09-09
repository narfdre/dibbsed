var	mongoose = require('mongoose'),
	schema = mongoose.Schema,
	objectId = schema.ObjectId;
	
var dibb = new schema({
     	id : objectId,
     	user : String,
      	name : {type: String, unique: true},
      	date : { type: Date, default: Date.now },
      	tags : [String]
});

exports.getDibb = function(){
	return mongoose.model('dibb', dibb);
}

