const mongoose = require('mongoose');

//schema
const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});

module.exports = mongoose.model('users', UserSchema);
