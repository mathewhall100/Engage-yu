const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    default: {
        question: {type: String, required: true},
    }, 

    custom: {
        date_added: {type: Date, default: Date.now},
        added_by: { 
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
        question: { type: String, required: true}
    }, 

});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;