const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeframeSchema = new Schema({
    start_time: { type: String, required: [true, "No timeframe start"] },
    end_time: { type: String, required: [true,  "No timeframe end"] },
    interval_mins: { type: Number, required: [true, "No timeframe interval"] },margin_mins: { type: Number, default: 15},
});

module.exports = timeframeSchema; 