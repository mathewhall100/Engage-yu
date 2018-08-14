const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const activeSchema = new Schema({
    patient_id: { type: String, required: [true, "No patient_id supplied"] },
    episode_id: { type: String, required: [true, "No episode_id supplied"] },
    requesting_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider"] },
    primary_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary provider"] },
    start_date: {type: Date, required: [true, "No start date supplied"] },
    start_time: {type: String, required: [true, "No end time supplied"] },
    end_date: {type: Date, required: [true, "No end date supplied"] },
    end_time: { type: String, required: [true, "No end time supplied"] },
    last_entry: Date
});

var Active = mongoose.model("Active", activeSchema);

module.exports = Active;