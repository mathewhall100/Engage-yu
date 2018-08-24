const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_roleSchema = new Schema({

    sub: { type: String, unique: true, required: [true, 'SUB absolutely required!'] },
    added_by: { type: Schema.Types.ObjectId, ref: 'Provider' },
    date_added: { type: Date, default: Date.now },
    role: {type: String, Enum: ['patient', 'provider', 'admin', 'support']},

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
user_roleSchema.post('save', handleError);
user_roleSchema.post('findOneAndUpdate', handleError);


var User_role = mongoose.model('User_role', user_roleSchema);

module.exports = User_role;