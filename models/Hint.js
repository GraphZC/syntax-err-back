const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hintSchema = new Schema({
    own: Number,
    hint: String,
    isUnlock: Boolean
});

const hintModel = mongoose.model('hints', hintSchema);

module.exports = hintModel;