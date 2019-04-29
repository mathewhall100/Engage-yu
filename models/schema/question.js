const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    
    question_number: {
        type: Number
    },

    question: { 
        type: String, 
        required: [true, "No question supplied"] 
    },

    answers: [{ 
        type: String, 
        required: [true, "No answers supplied"] 
    }],

    hints: [{ 
        type: String
    }]
},

    { _id: false}
    
);


module.exports = questionSchema; 