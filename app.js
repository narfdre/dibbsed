/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	model = require('./model');
	
if(process.argv[2] == 'withDB'){// This does not need to be here for production
    var	db = mongoose.connect('mongodb://localhost/dibbsed');
	console.log('MongoDB Connected');
	
	var Dibb = model.getDibbModel();
	Dibb.find({}, function(err, docs){
		console.log(docs);
	});
}
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('login', {});
});

app.get('/dibb/:name', function(req, res){
    var title = req.params["name"];
    Dibb.findOne({name: title}, function(err, doc){
	    res.render('dibb', {
			dibb: doc
 		}); 
	});
});
app.get('/user/:user', function(req, res){
  var name = req.params["user"];
  console.log(name);
  Dibb.find({user: name}, function(err, docs){
	  if(err == null){
		 console.log(docs);
		 res.render('user', {
		 	user: name,
		 	dibbs: docs
		 });  
	  }
  });
});
app.post('/dibb', function(req, res){
    var user = req.param("user");
    var title = req.param("title");
    var timeStamp = Date.now();
    var dibb = new Dibb({user: user, name: title, date: timeStamp});
	dibb.save(function(error){
		if(error == null){
			Dibb.findOne({name: title}, function(err, doc){
				res.redirect('/dibb/' + doc.name);
			});
		}else{
			console.log(error);
		}
	});
});
app.put('/dibb', function(req, res){
//  res.render('index', {
//   title: 'Express'
//  });
});
app.post('/google', function(req, res){
	var googleOpenId = [
		'openid.mode=checkid_setup',
		'openid.ns=http://specs.openid.net/auth/2.0',
		'openid.ns.ui=http://specs.openid.net/extensions/ui/1.0',
		'openid.ui.mode=popup',
		'openid.ui.icon=true',
		'openid.ns.ax=http://openid.net/srv/ax/1.0',
		'openid.ax.mode=fetch_request',
		'openid.ax.type.email=http://axschema.org/contact/email',
		'openid.ax.type.firstname=http://axschema.org/namePerson/first',
		'openid.ax.type.lastname=http://axschema.org/namePerson/last',
		'openid.ax.required=email,firstname,lastname',
		'openid.identity=http://specs.openid.net/auth/2.0/identifier_select',
		'openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select',
		'openid.return_to=http://localhost:3000/verify'
	].join('&');
	res.redirect('https://www.google.com/accounts/o8/ud?' + googleOpenId);	
});
app.get('/verify', function(req, res){
	console.log(req.query);
});
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
