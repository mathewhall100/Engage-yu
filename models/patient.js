const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patient_detailsSchema = require("./schema/patient_details");
const episodeSchema = require("./schema/episode");

const patientSchema = new Schema({

        date_enrolled: { type: Date, default: Date.now },
        enrolled_by: { type: Schema.Types.ObjectId, ref: "Provider" },
        status: { type: String, enum: ["active", "inactive"], required: true, default: "active" },
        patient_details: { type: patient_detailsSchema, required: true},  
        primary_provider: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary physician"] },
        episode: [episodeSchema]

    },
    
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

// mongoose error handling middleware function
handleError = (error, doc, next) => {
    console.log('Operation failed')
    console.log(`Error name: ${error.name}  + error code: ${error.code}`)
    // if (error.name === "ValidationError") {
    //     next(new Error(`New/updated document failed Mongoose validation.`));
    // } else {
        next()
     //}
};
patientSchema.post('save', handleError);
patientSchema.post('findOneAndUpdate', handleError);


var Patient= mongoose.model("Patient", patientSchema);

module.exports = Patient;
