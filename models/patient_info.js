const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const patient_infoSchema = new Schema({

    date_enrolled: { type: Date, default: Date.now },
    enrolled_by_ref: { type: Schema.Types.ObjectId, ref: 'Provider', required: [true, 'No primary physician'] },
    enrolled_by_id:  {type: String, required: [true, 'No primary physician']},
    enrolled_by_name:  {type: String, required: [true, 'No primary physician']},

    patient_data_ref: { type: Schema.Types.ObjectId, ref: 'Patient_data', required: [true, 'No patient data reference supplied']},
    patient_data_id: {type: String, required: [true, "No patient_data id"]},
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
    
    hospital_id: { type: String, unique: true, required: [true, "No hospital ID" ],  
        validate: {
            validator: function(val) {
                //should contain between 2 and 12 characters and only letters and numbers
                let re = /^\d*[a-zA-Z][a-zA-Z\d\s]{2,12}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid hospital id!`
        },   
    
    },

    firstname: { type: String, required: [true, "No patient first name"],
        validate: {
            validator: function(val) {
                //should be between 2 and 30 characters and contain only letters
                let re = /^[a-zA-Z]{2,30}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid name!`
        }
    }, 

    lastname: { type: String, required: [true, "No patient last name"],
        validate: {
            validator: function(val) {
                //should be between 2 and 30 characters and contain only letters
                let re = /^[a-zA-Z]{2,30}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid name!`
        }
    },

    dob:  { type: String, required: [true, "No patient date of birth"],
        validate: {
            validator: function(val) {
                // mm/dd/yyyy or mm-dd-yyyy formats only
                let re = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid date!`
        }
    },

    email: { type: String, unique: true, required: [true, "No patient email address"],
        validate: {
            validator: function(val) {
                //email formatting regex. Must contain letters and numbers, '@' and '.' 
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    phone: { type: String, required: [true, "No patient phone number"],
        validate: {
            validator: function(val) {
                //must be of xxx-xxx-xxxx format with numbers and '-' only
                let re = /\d{3}-\d{3}-\d{4}/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid phone number!`
        } 
    },

    primary_provider_ref: { type: Schema.Types.ObjectId, ref: 'Provider', required: [true, 'No primary physician'] },
    primary_provider_id: {type: String, required: [true, 'No primary physician']},
    primary_provider_name:  {type: String, required: [true, 'No primary physician']},

    provider_group_ref: { type: Schema.Types.ObjectId, ref: 'Provider_group', required: [true, 'No provider group ref supplied'] },
    provider_group_id:  {type: String, required: [true, 'No provider group id supplied']},
    provider_group_name:  {type: String, required: [true, 'No provider group name supplied']},

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