const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const activeSchema = new Schema({

    sub: { type: String, unique: true, required: [true, 'SUB absolutely required!'] },
    firstname: { type: String, required: [true, "No name supplied"] },
    lastname: { type: String, required: [true, "No name supplied"] },
    hospital_id: { type: String, required: [true, "No hospital id number supplied"] },
    episode_number: { type: Number, required: [true, "No episode number supplied"] },
    episode_id: { type: String, required: [true, "No episode id supplied"] },
    requesting_provider_firstname: { type: String, required: [true, "No requesting provider name supplied"] },
    requesting_provider_lastname: { type: String, required: [true, "No requesting provider name supplied"] },
    requesting_provider_id: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    primary_provider_firstname: { type: String, required: [true, "No primary provider name supplied"] },
    primary_provider_lastname: { type: String, required: [true, "No primary provider name supplied"] },
    primary_provider_id: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary provider Id supplied"] },
    start_date: {type: Date, required: [true, "No start date supplied"] },
    start_time: {type: String, required: [true, "No end time supplied"] },
    end_date: {type: Date, required: [true, "No end date supplied"] },
    end_time: { type: String, required: [true, "No end time supplied"] },
    last_entry: Date,
    num_entries: {type: Number, required: [true, 'No number of entries']}
    
    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
);

var Active = mongoose.model("Active", activeSchema);

module.exports = Active;

