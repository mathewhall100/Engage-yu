const mongoose = require("mongoose")
const provider_summarySchema = require("./schema/provider_summary");

const Schema = mongoose.Schema;

const question_customSchema = new Schema({

    date_added: {
        type: Date, 
        default: Date.now
    },

    added_by : {
        type: {provider_summarySchema}, 
        required: [true, 'No question added_by details supplied']
    },

    question: {
        type: String, 
        required: [true, "No question supplied"]
    },

    answers: [{
        type: String, 
        required: [true, "No answers supplied"]
    }],
    
    // hints: [ {type: String, required: [true, "No hints supplied"]} ] -- to be coded
    
}); 


var Question_custom = mongoose.model("Question_custom", question_customSchema);

module.exports = Question_custom;
