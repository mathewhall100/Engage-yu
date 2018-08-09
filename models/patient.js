const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patient_detailsSchema = require("./schema/patient_details");
const next_appointmentSchema = require("./schema/next_appointment");
const episodeSchema = require("./schema/episode");

const patientSchema = new Schema({
        date_created: { type: Date, default: Date.now },
        enrolled_by: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No enrolling physician"] },
        status: { type: String, enum: ["active", "inactive"], required: true, default: "active" },
        patient_details: { type: patient_detailsSchema, required: true},  
        primary_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary physician"] },          
        next_appointment: {type: next_appointmentSchema, required: true},
        episode: episodeSchema,
    },
    
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

var Patient= mongoose.model("Patient", patientSchema);

module.exports = Patient;
