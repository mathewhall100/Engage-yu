const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({

    record_number: { 
        type: Number, 
        required: [true, "No record number"] 
    },

    valid: { 
        type: Boolean, 
        default: false 
    },

    day: { 
        type: Number, 
        required: [true, "No record day"] 
    },

    time: { 
        type: String, 
        required: [true, "No record time"] 
    },

    scheduled_datetime:  {
        type: Date, 
        required: true
    },  

    actual_datetime: {
        type: Date
    },   
    
    late: {
        type: Boolean, 
        default: false
    },
    
    medication_adherance: { 
        type: String, 
        enum: ["yes", "no", "no meds", "unanswered", "not asked"] 
    }, 

    data: [{ 
        question_number: Number,
        question_answers: [{type: Boolean }]

        // other data
        // patient notes/message
        // audio message
        // voice recording
        // video 
        // wearable data // apple watch // great lakes neurotech
        // specific kinetic tests// finger tap etc
    }]
}, 

    { _id: false }

);


module.exports = recordSchema; 