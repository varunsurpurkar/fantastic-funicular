var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var nodemailer = require('nodemailer');

var Profile=require('../models/Profile.js')
var fs=require('fs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'varunsurpurkar@gmail.com',
           pass: '#Wonderla1'
       }
   });

   const mailOptions = {
    from: 'varunsurpurkar@gmail.com', // sender address
    to: '', // list of receivers
    subject: 'Your new Password for Student Forum', // Subject line
    html: ''// plain text body
  }
   
server.listen(4002);

/* GET Only User Feeds */
router.get('/auth/forgotpassword/:userId', function(req, res, next) {
    Profile.find({ userId: req.params.userId }, function (err, profiles) {
      if (err) return next(err);
      mailOptions.to=req.params.userId ;
      var pwd = 'test123';
      mailOptions.html='<p>'+pwd+'</p>';
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else{
        Profile.collection.findAndModify({
            query: { userId: req.params.userId },
            sort: { rating: 1 },
            update: { $inc: { password: pwd } },
            new: false
        });
          console.log(info);
        }
     });
      res.json(profiles);
    });
  });
  
  
module.exports = router;