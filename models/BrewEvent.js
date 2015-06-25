
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var brewEventSchema = new mongoose.Schema({
  userId: ObjectId,
  recipe: ObjectId,
  title: String,
  description: String,
  ingredients: [
    {
      item: String,
      amount: String,
      unit: String
    }
  ],
  steps: [
    {
      directions: String,
      offset: Number, //length of the brew event
      active: false,
      done: false
      // steps move automatically to the next
    }
  ],
  complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('BrewEvent', brewEventSchema);
