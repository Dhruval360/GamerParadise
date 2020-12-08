// User Schema
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // Needed?
const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  wins: {type: Number, default: 0},
  date: {type: Date, default: Date.now}
});
module.exports = User = mongoose.model('User', UserSchema);