const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = require("./question");

const custom_question_listSchema = new Schema({

    date_created: {
        type: Date, 
        default: Date.now
    },
    
    list_name: {
        type: String, 
        required: [true, "No question supplied"]
    },

    list_questions: [
        questionSchema
    ], 

    // list_questions: [{
    //     question: {type: String, required: [true, "No question supplied"]},
    //     answers: [ {type: String, required: [true, "No answers supplied"]} ],
    //     hints: [ {type: String} ]
    // }], 
    
});

module.exports = custom_question_listSchema; 