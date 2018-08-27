const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const question_customSchema = new Schema({


    date_added: {type: Date, default: Date.now},
    added_by_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No added by ref supplied"] },
    added_by_id: {type: String, required: [true, "No added by id supplied"]},
    added_by_name: {type: String, required: [true, "No added by name supplied"]},
    question: {type: String, required: [true, "No question supplied"]},
    answers: [ {type: String, required: [true, "No answers supplied"]} ]

}); 


var Question_custom = mongoose.model("Question_custom", question_customSchema);

module.exports = Question_custom;
