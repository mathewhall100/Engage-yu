const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeframeSchema = require("./timeframe");
const remindSchema = require("./remind");
const recordSchema = require("./record");

const episodeSchema = new Schema({

    episode_number: { 
        type: Number, 
        min: 1,
        max: 1000,
        required: [true, "No episode number"]
    },
    start_date: { type: Date, required: [true, "No episode start date"] },
    num_days: { 
        type: Number, 
        min: 1, 
        max: 365,
        required: [true, "No episode number of days"] 
    },
    end_date: { type: Date, required: [true, "No episode end date"] }, 
    requesting_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting physician"] },
    report_to: [{ type: Schema.Types.ObjectId, ref: "Provider" }],  
    num_questions: {
        type: Number, 
        min: 1,
        max: 25,
        required: true
    },
    questions: [{ 
        type: String,
        minlength: 2,
        maxlength: 40,
        required: true
     }],
    timeframe: { type: timeframeSchema, required: true },  
    remind: { type: remindSchema, required: true },
    expected_num_records: { 
        type: Number, 
        min: 2,
        required: [true, "No expected number records"] 
    },
    notes: String,
    record: [recordSchema],
});

module.exports = episodeSchema; 