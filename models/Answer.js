const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    ans: String,
    isFinish: Boolean
});

const answerModel = mongoose.model('answers', answerSchema);

module.exports = answerModel;