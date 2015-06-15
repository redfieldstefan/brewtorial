// import modules.
var mongoose = require('mongoose');

// define schema.
var brewEventSchema = new mongoose.Schema({
  userId: ObjectId,
  recipe: ObjectId,
  steps: [
    {
      directions: '',
      offset: 0,
      status: Boolean
      // steps move automatically to the next
    }
  ],
});

// export model.
module.exports = mongoose.model('BrewEvent', brewEventSchema);
