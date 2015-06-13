// import modules.
var mongoose = require('mongoose');

// define schema.
var draftSchema = new Schema({
  title: String,
  author: ObjectId,
  created: Date
});

// export model.
module.exports = mongoose.model('Brew', draftSchema);