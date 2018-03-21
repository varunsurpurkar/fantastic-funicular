var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  userId:String,  
  firstName: String,
  lastName: String,
  deparment: String,
  city:String,
  mobileNo:String,
  about:String,
  password:String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', ProfileSchema);