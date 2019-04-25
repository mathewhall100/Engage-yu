const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const episodeSchema = require("./schema/episode");

const patient_dataSchema = new Schema({

    patient_info_id: { 
        type: String, 
        unique: true, 
        required: [true, 'No patient_info_id'] 
    },

    patient_info_ref: {  
        type: Schema.Types.ObjectId, 
        ref: 'Patient_info', 
        required: [true, 'No patient_info ref'] 
    },

    episodes: [episodeSchema]

},
    
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

//mongoose error handling middleware function
handleError = (error, doc, next) => {
    console.log('Operation failed')
    console.log(`error code: ${error.code}`)
    console.log(`Error name: ${error}`)
    if (error.name === "ValidationError") {
         next(new Error(`New/updated document failed Mongoose validation.`));
     } else {
        next(new Error('An error occurred during saving due to a corrupted model/schema')) // returned to app as CONTROLLER ERROR:
     }
};
patient_dataSchema.post('save', handleError);
patient_dataSchema.post('findOneAndUpdate', handleError);


var Patient_data= mongoose.model("Patient_data", patient_dataSchema);

module.exports = Patient_data;
