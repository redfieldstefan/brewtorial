// import modules.
var mongoose = require('mongoose');

// define schema.
var equipmentSchema = new mongoose.Schema({
  name: '',
  photo: '',
  description: ''
});

// export model.
module.exports = mongoose.model('Equipment', equipmentSchema);
