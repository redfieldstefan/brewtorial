// import modules.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema.
var recipeSchema = new mongoose.Schema({
  description: String,
  title: String,
  abv: Number,
  ibu: Number,
  icon: String,
  og: Number,
  style: String,
  brewTime: String,
  difficulty: String,
  header: {
    author: String,
    created: Date,
    likes: Number,
    popularity: Array,
  },
  equipment: Array,
  ingredients: Array,
  stepIndex: Number,
  steps: [
    {
      directions: String,
      offset: {
        days: Number,
        hours: Number,
        minutes: Number
      },
      status: Boolean
    }
  ],
});

// export model.
module.exports = mongoose.model('Recipe', recipeSchema);
