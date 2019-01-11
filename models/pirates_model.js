var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Pirates table here.
const piratesSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  isCaptured: { type: Boolean, unique: true },
});

const Pirates = mongoose.model('Pirates', piratesSchema);
module.exports = Pirates;