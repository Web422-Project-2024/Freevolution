const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  favorites: {
    type: [String],
    default: []
  }
});

module.exports = userSchema;