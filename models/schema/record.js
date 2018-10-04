const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({

    record_number: { type: Number, required: [true, "No record number"] },
    valid: { type: Boolean, default: false },
    day: { type: Number, required: [true, "No record day"] },
    time: { type: String, required: [true, "No record time"] },

    scheduled_datetime:  {type: Date, required: true},  
    actual_datetime: Date,
    
    medication_adherance: { type: String, enum: ["yes", "no", "no meds", "unanswered", "not asked"] }, 

    data: [{ 
        question_number: Number,
        question_answers: [{type: Boolean }]
    }],
    late: {type: Boolean, default: false},
    patient_comments: String

});


module.exports = recordSchema; 