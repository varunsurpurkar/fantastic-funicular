var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var fs=require('fs');
var reviewFile='server/reviews.json';

app.listen(3000);
app.use(bodyParser.json());
app.use(express.static('bower_components'));
app.use(express.static('src/js'));
app.use(express.static('src/view'));
app.use(express.static('static'));

app.post('/newReview',function(req,resp){
	console.log("at the server"+req.body.review);
    var reviews=readJsonData();
    var reviewsJson=JSON.parse(reviews);
    reviewsJson.push(createJsonObject(req.body));
	resp.send(reviewsJson);
});

app.get('/readReviews',function(req,resp){

   var reviews=readJsonData();
   var reviewsJson=JSON.parse(reviews);
   resp.send(reviewsJson);
});

var readJsonData=function(){
	return fs.readFileSync(reviewFile);
}

var createJsonObject=function(value){
 var newReviewJson={
  "name": value.name,
  "dateTime": "2016-04-19",
  "description": value.review,
  "rating": "4"
 };
 return newReviewJson;
}