const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = require("./record");
const questionSchema = require("./question");
const messageSchema = require("./message");
const provider_summarySchema = require("./provider_summary");

const episodeSchema = new Schema({

    episode_number: { 
        type: Number, 
        min: 1, max: 1000, 
        required: [true, "No episode number"] 
    },

    date_requested: { 
        type: Date, 
        default: new Date()
    },
    
    requesting_provider: { 
        type: {provider_summarySchema}, 
        required: [true, 'No requesting_provider details supplied']
    },

    start_date: { 
        type: Date, 
        required: [true, "No episode start date"] 
    },

    end_date: { 
        type: Date, 
        required: [true, "No episode end date"] 
    }, 

    num_days: { 
        type: Number, 
        min: 1, max: 30, 
        required: [true, "No episode number of days"] 
    },

    start_time: { 
        type: String, 
        enum: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"], 
        required: [true, "No timeframe start"] 
    },

    end_time: { 
        type: String, 
        enum: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"], 
        required: [true,  "No timeframe end"] 
    },

    interval_mins: { 
        type: Number, 
        enum: [ 30, 60, 120, 240 ], 
        required: [true, "No timeframe interval"] 
    },

    margin_mins: { 
        type: Number, 
        min: 5, max: 60, 
        default: 15 
    },
     
    remind_status: { 
        type: String, 
        enum: ["on", "off"], 
        default: "on"
    },
    remind_mins_before: { 
        type: Number, 
        min: 1, max: 30, 
        default: 10 
    },

    questions: [
        questionSchema
    ],

    records: [
        recordSchema
    ], 

    status: {
        type: String, 
        enum: ["pending", "active", "cancelled", "awaiting review", "actioned", "archived" ], 
        default: "pending"
    },

    actioned: {
        date: {
            type: Date, 
            default: new Date(0)
        },
        by: { 
            type: {provider_summarySchema}, 
            required: [true, 'No requesting_provider details supplied']
        },
        message_id: {
            type: String
        }
    },

    archived: {
        date: {
            type: Date, 
            default: new Date(0)
        },
        by: { 
            type: {provider_summarySchema}, 
            required: [true, 'No requesting_provider details supplied']
        }
    },
    
    cancelled: {
        date: {
            type: Date, 
            default: new Date(0)
        },
        by: { 
            type: {provider_summarySchema}, 
            required: [true, 'No requesting_provider details supplied']
        },
        message_id: {
            type: String
        }
    },

    messages: [
        messageSchema
    ],

    report_to: [
        provider_summarySchema
    ], 

});

module.exports = episodeSchema; 