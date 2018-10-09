const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const activeSchema = new Schema({

    patient_info_ref: { type: Schema.Types.ObjectId, ref: "Patient_info", required: [true, "No patient_info ref supplied."] },
    patient_info_id: {type: String, required: [true, "No patient-info_id supplied."]},
    firstname: { type: String, required: [true, "No patient firstname supplied"] },
    lastname: { type: String, required: [true, "No patient lastname supplied"] },
    hospital_id: { type: String, required: [true, "No patient hospital id number supplied"] },
    patient_data_ref: { type: Schema.Types.ObjectId, ref: "Patient_data", required: [true, "No patient_data ref supplied"] },
    patient_data_id:  {type: String, required: [true, "No patient-data_id supplied"]},
    episode_number: { type: Number, required: [true, "No episode number supplied"] },
    episode_id: { type: String, required: [true, "No episode id supplied"] },
    date_created: {type: Date, default: new Date()},

    requesting_provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    requesting_provider_id: {type: String, required: [true, "No requesting provider id supplied"]},
    requesting_provider_name: { type: String, required: [true, "No requesting provider firstname supplied"] },

    primary_provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    primary_provider_id: { type: String, required: [true, "No primary provider Id supplied"] },
    primary_provider_name: { type: String, required: [true, "No primary provider firstname supplied"] },
   
    provider_group_ref: { type: Schema.Types.ObjectId, ref: "Provider_group" },
    provider_group_id: String,
    provider_group_name: String,

    start_date: {type: Date, required: [true, "No start date supplied"]},
    start_time: {type: String, required: [true, "No end time supplied"]},
    end_date: {type: Date, required: [true, "No end date supplied"]},
    end_time: {type: String, required: [true, "No end time supplied"]},
    num_records: {type: Number, required: [true, "No number of records supplied"]},
    entries_per_day: {type: Number, required: [true, "No number of entries per day supplied"]},
    last_entry: Date,
    num_entries: {type: Number, required: [true, 'No number of entries']},

    status: {type: String, enum: ["pending", "active", "cancelled", "awaiting review", "reviewed", "actioned", "archived", ], default: "pending"},
    
    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
);

var Active = mongoose.model("Active", activeSchema);

module.exports = Active;

