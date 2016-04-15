var express=require('express');
var app=express();
app.listen(3000);

app.use(express.static('bower_components'));
app.use(express.static('src/js'));
app.use(express.static('src/view'));
app.use(express.static('static'));