// import modules.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema.
var recipeSchema = new mongoose.Schema({
  description: String,
  header: {
    abv: {
      type: Number,
      required: true
    },
    author: String,
    brewTime: String,
    created: Date,
    difficulty: Number,
    ibu: Number,
    icon: String,
    likes: Number,
    og: Number,
    popularity: Array,
    style: String,
    title: String
  },
  equipment: Array,
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
