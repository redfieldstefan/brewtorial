// import modules.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema.
var recipeSchema = new mongoose.Schema({
  header: {
    abv: {
      type: Number,
      required: true
    },
    author: ObjectId, 
    brewTime: Number,
    created: Date,
    difficulty: Number,
    icon: String,
    likes: Number,
    popularity: Array,
    style: String,
    title: String
  },
  equipment: Array,
  ingredients: Array,
  steps: [
    {
      directions: String,
      offset: Number,
      status: Boolean
    }
  ],
});

// export model.
module.exports = mongoose.model('Recipe', recipeSchema);
