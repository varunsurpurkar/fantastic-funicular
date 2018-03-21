var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Feeds = require('../models/Feeds.js');
var Profile=require('../models/Profile.js')
var fs=require('fs');
var nodemailer = require('nodemailer');

server.listen(4001);

// socket io
io.on('connection', function (socket) {
  console.log('Feeds User connected');
  socket.on('disconnect', function() {
    console.log('Feeds User disconnected');
  });
  socket.on('save-feeds', function (data) {
    io.emit('new-feeds', { message: data });
  });
  socket.on('user-profile', function (data) {
     Profile.find({ userId: data.userName }, function (err, profile) {
      console.log(profile);
      if (err) return next(err);
      io.emit('profile-data', { message: profile });
    });
    
  });
});

/* GET Only User Feeds */
router.get('/:feedBy', function(req, res, next) {
  Feeds.findById({ feedBy: req.params.feedBy }, function (err, feeds) {
    if (err) return next(err);
    res.json(feeds);
  });
});

/* GET Only User Feeds */
router.get('/feedBy/:userName', function(req, res, next) {
  Feeds.find({feedBy: req.params.userName }, function (err, feeds) {
    if (err) return next(err);
    res.json(feeds);
  });
});

router.get('/profiles/profileDataBySearchCriteria/', function(req, res, next) {
  
  console.log(req.query.userID +" "+req.query.firstName + " "+req.query.lastName);
  Profile.find({ userId: req.query.userID ,firstName:req.query.firstName,lastName:req.query.lastName}, function (err, profile) {
    if (err) return next(err);
    res.json(profile);
  }).collation({locale: "en", strength: 2});
});

/* GET Only User Feeds */
router.get('/profileData/:userName', function(req, res, next) {
 // console.log("/profileData/:userName");
  Profile.find({ userId: req.params.userName }, function (err, profile) {
    if (err) return next(err);
    res.json(profile);
  });
});

/* SAVE Feed */
router.post('/profileCreate', function(req, res, next) {
 
  Profile.create(req.body, function (err, post) {
        if (err) {
         console.error("myerrorS",err.stack)
         return next(err);
   }
   console.log(post);
    res.json(post);
  });
});




/* SAVE Feed */
router.post('/', function(req, res, next) {
   Feeds.create(req.body, function (err, post) {
        if (err) {
         console.error("myerrorS",err.stack)
         return next(err);
   }
    res.json(post);
  });
});

/* UPDATE Pofile */
router.put('/profileUpdate/:id', function(req, res, next) {
  Profile.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'studentforum61@gmail.com',
         pass: 'wearestudentsof2018'
     }
 });

 const mailOptions = {
  from: 'studentforum61@gmail.com', // sender address
  to: '', // list of receivers
  subject: 'Your new Password for Student Forum', // Subject line
  html: ''// plain text body
}

router.post('/auth/forgotpassword/', function(req, res, next) {
  
  Profile.find({ userId: req.body.data }, function (err, profiles) {
    if (err) return next(err);
    mailOptions.to=req.body.data ;
    var pwd = 'test123';
    mailOptions.html='<p>'+pwd+'</p>';
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else{
        
      Profile.collection.updateOne(
          { userId: req.body.data },
          {
          $set: { password: pwd }
      },function(err,doc){
       console.log(doc);
       console.log(err);
      });
        console.log(info);
      }
   });
    res.json(profiles);
  });
});



module.exports = router;
