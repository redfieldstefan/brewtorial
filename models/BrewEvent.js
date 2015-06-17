// import modules.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema.
var brewEventSchema = new mongoose.Schema({
  userId: ObjectId,
  recipe: ObjectId,
  steps: [
    {
      directions: String,
      offset: Number, //length of the brew event
      status: Boolean
      // steps move automatically to the next
    }
  ],
  complete: boolean
});

// export model.
module.exports = mongoose.model('BrewEvent', brewEventSchema);
