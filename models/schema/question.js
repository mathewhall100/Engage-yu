const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    question: { type: String, required: [true, "No question supplied"] },
    answers: [
        { type: String, required: [true, "No answers supplied"] }
    ],
    hints: [
        { type: String }
    ],
});


module.exports = questionSchema; 