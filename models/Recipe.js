// import modules.
var mongoose = require('mongoose');

// define schema.
var recipeSchema = new mongoose.Schema({
  header: {
    abv: 0.0,
    author: ObjectId, 
    brewTime: 0, // seconds
    created: date,
    difficulty: 0,
    icon:, '' // url
    likes: 0,
    popularity: [], // users ids who completed brew
    style: '', // lager, ale, piss    
    title: ''
  },
  equipment: [ObjectIDs],
  // 4 quarts water <amount> <unit> <name>
  ingredients: [ '' ] // string of amount, name and unit
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
module.exports = mongoose.model('Recipe', recipeSchema);
