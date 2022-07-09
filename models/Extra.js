const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extraSchema = new Schema({
    num: Number
});

const extraModel = mongoose.model('extras', extraSchema);

module.exports = extraModel;