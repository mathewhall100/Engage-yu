const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserRpoles schema stores the AuthO id (sub) together with the user role and info collectin id
// When autheticator returns a 'sub', this is used to pull out the user role and id from the user_role collection
// These are then stored in local storage as the 'current user' and used to identify the user information 
//      in the patient_info, provider_info and active collections. 
// patient data can be obtained from the patient_info collection, patient_data_id filed. 

const userSchema = new Schema({

    sub: { type: String, unique: true, required: [true, 'SUB (USER ID) absolutely required!'] },
    added_by: { type: Schema.Types.ObjectId, ref: 'Provider' },
    date_added: { type: Date, default: Date.now },
    role: {type: String, Enum: ['patient', 'provider', 'admin', 'support']},
    id: { type: String, unique: true, required: [true, 'user id required'] },
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
userSchema.post('save', handleError);
userSchema.post('findOneAndUpdate', handleError);


var User = mongoose.model('User', userSchema);

module.exports = User;