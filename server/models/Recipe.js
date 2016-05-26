// import modules.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema.
var recipeSchema = new mongoose.Schema({
  description: String,
  title: String,
  abv: String,
  ibu: String,
  icon: String,
  og: String,
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
  complete: Boolean,
});

// export model.
module.exports = mongoose.model('Recipe', recipeSchema);
