const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({

    record_number: { type: Number, required: [true, "No record number"] },
    day: { type: Number, required: [true, "No record day"] },
    time: { type: String, required: [true, "No record time"] },
    scheduled_datetime:  {type: Date, required: true},  
    record_valid: { type: Boolean, default: false },
    medication_adherance: { type: String, enum: ["yes", "no", "no meds", "unanswered", "not asked"] }, 
    actual_datetime: Date,
    data: [{ type: Boolean }],
    patient_comments: String

});


module.exports = recordSchema; 