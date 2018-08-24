const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patient_detailsSchema = require('./schema/patient_details');


const patient_infoSchema = new Schema({

    date_enrolled: { type: Date, default: Date.now },
    enrolled_by: { type: Schema.Types.ObjectId, ref: 'Provider' },
    patint_data_id: {type: String, required: [true, "no patiwent_data id"]},
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
    patient_details: { type: patient_detailsSchema, required: true},  
    primary_provider_id: { type: Schema.Types.ObjectId, ref: 'Provider', required: [true, 'No primary physician'] },
    primary_provider_name: String,
    provider_group_id: { type: Schema.Types.ObjectId, ref: 'Provider_group', required: [true, 'No care group'] },
    provider_group_name: String,

    },
    
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

// mongoose error handling middleware function
handleError = (error, doc, next) => {
    console.log('Operation failed')
    console.log(`Error name: ${error.name}  + error code: ${error.code}`)
    // if (error.name === 'ValidationError') {
    //     next(new Error(`New/updated document failed Mongoose validation.`));
    // } else {
        next()
     //}
};
patient_infoSchema.post('save', handleError);
patient_infoSchema.post('findOneAndUpdate', handleError);


var Patient_info = mongoose.model('Patient_info', patient_infoSchema);

module.exports = Patient_info;