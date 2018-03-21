var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
  feedId: String,
  feedBy: String,
  feeTitle: String,
  feedContent: String,
  media: String,
  isVideo: { type: String, default: 'N' },
  isImage: { type: String, default: 'N' },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feeds', FeedSchema);

