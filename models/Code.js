const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    key: String
});

const codeModel = mongoose.model('Code', codeSchema);

module.exports = codeModel;