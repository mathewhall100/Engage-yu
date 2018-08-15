const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeframeSchema = new Schema({

    start_time: { type: String, required: [true, "No timeframe start"] },
    end_time: { type: String, required: [true,  "No timeframe end"] },
    interval_mins: { type: Number, enum: [ 30, 60, 120, 240 ], required: [true, "No timeframe interval"] },
    margin_mins: { type: Number, min: 5, max: 60, default: 15 }

});

module.exports = timeframeSchema; 