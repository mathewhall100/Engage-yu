const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const custom_question_listSchema = new Schema({

    list_name: {type: String, required: [true, "No question supplied"]},
    list_questions: [{
        date_added: {type: Date, default: Date.now},
        question: {type: String, required: [true, "No question supplied"]},
        answers: [ {type: String, required: [true, "No answers supplied"]} ],
        hints: [ {type: String} ]
    }]
  
});

module.exports = custom_question_listSchema; 