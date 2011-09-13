/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	model = require('./model');
	
if(process.argv[2] == 'withDB'){// This does not need to be here for production
    var	db = mongoose.connect('mongodb://localhost/dibbsed');
	console.log('MongoDB Connected');
	
	var Dibb = model.getDibb();
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
  res.render('index', {});
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
//  res.render('index', {
//   title: 'Express'
//  });
});
app.del('/dibb/:name', function(req, res){
    var id = req.params["name"];
//  res.render('index', {
//   title: 'Express'
//  });
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
//  res.render('index', {
//   title: 'Express'
//  });
});
app.put('/dibb', function(req, res){
//  res.render('index', {
//   title: 'Express'
//  });
});
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
