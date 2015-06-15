// import modules.
var mongoose = require('mongoose');

// define schema.
var userSchema = new Schema({
  userId: '',  
  displayName: '', // doubles as display name
  basic: {
    email: '',
    password: ''
  }
});

// export model.
module.exports = mongoose.model('User', userSchema);
