const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const next_appointmentSchema = new Schema({
    date: Date,
    comments: String,
    provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No appointment physician"] }
});

module.exports = next_appointmentSchema; 