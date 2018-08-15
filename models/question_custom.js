const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const question_customSchema = new Schema({


    date_added: {type: Date, default: Date.now},
    added_by: { type: Schema.Types.ObjectId, ref: "Provider" },
    question: {type: String, required: true},
    answers: [ {type: String, required: true} ]

}); 


var Question_custom = mongoose.model("Question_custom", question_customSchema);

module.exports = Question_custom;
