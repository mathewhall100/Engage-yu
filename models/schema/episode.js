const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeframeSchema = require("./timeframe");
const remindSchema = require("./remind");
const recordSchema = require("./record");

const episodeSchema = new Schema({

    episode_number: { type: Number, required: [true, "No episode number"]},
    start_date: { type: Date, required: [true, "No episode start date"] },
    num_days: { type: Number, required: [true, "No episode number of days"] },
    end_date: { type: Date, required: [true, "No episode end date"] }, 
    requesting_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting physician"] },  
    report_to: [{ type: Schema.Types.ObjectId, ref: "Provider" }],  
    num_questions: {type: Number, required: true},
    questions: [{ type: String, required: true }],
    timeframe: { type: timeframeSchema, required: true },  
    remind: { type: remindSchema, required: true },
    expected_num_records: { type: Number, required: [true, "No expected number records"] },
    record: [{ type: recordSchema, required: true }],
});

module.exports = episodeSchema; 