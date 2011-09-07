/**
 * Module dependencies.
 */

var express = require('express');
if(process.argv[2] == 'withDB'){
	console.log('Connecting to DB');
//     var mongoose = require('mongoose'),
//     	db = mongoose.connect('mongodb://localhost/dibbsed'),
// 	schema = mongoose.Schema;
// 	console.log('MongoDB Connected');
// 	
//  	var dibb = new schema({
//      	//id : {type: Number, default: 0 ,$inc : 1, unique : true},
//      	user : String,
//       	name : String,
//       	date : { type: Date, default: Date.now },
//       	tags : [String]
// 	});
// 	var Dibb = mongoose.model('dibb', dibb);
// 	var firstDibb = new Dibb();
// 	firstDibb.user = "narfdre";
// 	firstDibb.name = "Milk";
// 	firstDibb.date = Date.now();
// 	firstDibb.save();
	//Dibb.find({}, function(err, docs){
	//  console.log(docs);
	//});
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
  res.render('index', {
   title: 'Express'
  });
});

app.get('/dibb/:id', function(req, res){
    var id = req.params["id"];
//  res.render('index', {
//   title: 'Express'
//  });
});
app.get('/u/:name', function(req, res){
  var name = req.params["name"];
//  res.render('index', {
//   title: 'Express'
//  });
});
app.del('/dibb/:id', function(req, res){
    var id = req.params["id"];
//  res.render('index', {
//   title: 'Express'
//  });
});
app.post('/dibb', function(req, res){
    var user = req.param("user");
    var user = req.param("title");
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
