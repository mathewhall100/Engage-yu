const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = require("./record");
const questionSchema = require("./question");
const messageSchema = require("./message");
const report_toSchema = require("./report_to");

const episodeSchema = new Schema({

    episode_number: { type: Number, min: 1, max: 1000, required: [true, "No episode number"] },

    date_requested: { type: Date, default: new Date()},
    requesting_provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    requesting_provider_id: {type: String, required: [true, "No requesting provider id supplied"]},
    requesting_provider_firstname: { type: String, required: [true, "No requesting provider firstname supplied"] },
    requesting_provider_lastname: { type: String, required: [true, "No requesting provider lastname supplied"] },
    
    primary_provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary provider Id supplied"] },
    primary_provider_id: {type: String, required: [true, "No primary provider id supplied"]},
    primary_provider_firstname: { type: String, required: [true, "No primary provider firstname supplied"] },
    primary_provider_lastname: { type: String, required: [true, "No primary provider lastname supplied"] },

    start_date: { type: Date, required: [true, "No episode start date"] },
    end_date: { type: Date, required: [true, "No episode end date"] }, 
    num_days: { type: Number, min: 1, max: 30, required: [true, "No episode number of days"] },
    start_time: { type: String, enum: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"], required: [true, "No timeframe start"] },
    end_time: { type: String, enum: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"], required: [true,  "No timeframe end"] },
    interval_mins: { type: Number, enum: [ 30, 60, 120, 240 ], required: [true, "No timeframe interval"] },
    margin_mins: { type: Number, min: 5, max: 60, default: 15 },
     
    num_questions: { type: Number, min: 1, max: 12, required: true },
    questions: [
        questionSchema
    ],

    expected_num_records: { type: Number, min: 2, required: [true, "No expected number records"] },
    messages: [
        messageSchema
    ],

    records: [
        recordSchema
    ], 
    
    remind_status: { type: String, enum: ["on", "off"], default: "on"},
    remind_mins_before: { type: Number, min: 1, max: 30, default: 10 },

    active_record_ref: { type: Schema.Types.ObjectId, ref: "Active", required: [true, "No active record reference supplied"]},
    active_record_id: { type: String, required: [true, "No active record id supplied"]},
    
    status: {type: String, enum: ["pending", "active", "cancelled", "awaiting review", "actioned", "archived" ], default: "pending"},
    actioned_by: String,
    archived_by: String,
    cancelled_by: String,

    report_to: [
        report_toSchema
    ], 

});

module.exports = episodeSchema; 