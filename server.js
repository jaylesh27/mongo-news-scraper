var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var Article = require('./models/article.js');
var Comment = require('./models/comment.js');


var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/", function(req, res){
	res.render('index');
});

app.get("/scrape", function(req, res){
	request("https://arstechnica.com/", function(error, response, html) {
		var $ = cheerio.load(html);
		//console.log(html);
		$("listing.listing-latest").each(function(i, element){
			var result = {};
			result.title = $(this).
			console.log(result);
		});
	});
	// console.log("route works");
});



app.listen(port, function() {
  console.log("App running on port " + port);
});