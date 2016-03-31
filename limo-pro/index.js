var express=require('express');
var app=express();

app.listen(3000);


app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/',function(req,resp){
 resp.send("Hello ,Welcome to Boston Express Limousine");

});