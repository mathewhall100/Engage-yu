const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = require("./record");
const questionSchema = require("./question");

const episodeSchema = new Schema({

    episode_number: { type: Number, min: 1, max: 1000, required: [true, "No episode number"] },

    requesting_provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    requesting_provider_id: {type: String, required: [true, "No requesting provider id supplied"]},
    requesting_provider_firstname: { type: String, required: [true, "No requesting provider firstname supplied"] },
    requesting_provider_lastname: { type: String, required: [true, "No requesting provider lastname supplied"] },
    date_requested: { type: Date, default: new Date()},

    start_date: { type: Date, required: [true, "No episode start date"] },
    end_date: { type: Date, required: [true, "No episode end date"] }, 
    num_days: { type: Number, min: 1, max: 365, required: [true, "No episode number of days"] },
    start_time: { type: String, required: [true, "No timeframe start"] },
    end_time: { type: String, required: [true,  "No timeframe end"] },
    interval_mins: { type: Number, enum: [ 30, 60, 120, 240 ], required: [true, "No timeframe interval"] },
    margin_mins: { type: Number, min: 5, max: 60, default: 15 },
     
    num_questions: { type: Number, min: 1, max: 25, required: true },
    questions: [
        {questionSchema}
    ],

    expected_num_records: { type: Number, min: 2, required: [true, "No expected number records"] },
    notes: String,
    record: [
        recordSchema
    ], 
    
    remind_status: { type: String, enum: ["on", "off"], default: "on"},
    remind_mins_before: { type: Number, min: 1, max: 30, default: 10 },
    
    status: {type: String, enum: ["pending", "active", "cancelled", "awaiting review", "reviewed", "actioned", "archived", ], default: "pending"},

    report_to: [
        { type: Schema.Types.ObjectId, ref: "Provider" }
    ], 

});

module.exports = episodeSchema; 