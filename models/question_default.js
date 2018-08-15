const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const question_defaultSchema = new Schema({

        question: {type: String, required: true},
        answers: [ {type: String, required: true} ] 
}); 


var Question_default = mongoose.model("Question_default", question_defaultSchema);

module.exports = Question_default;
