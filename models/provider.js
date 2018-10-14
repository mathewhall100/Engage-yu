const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const providerSchema = new Schema({

    date_added: {type: Date, default: Date.now},

    firstname:  { type: String, required: [true, 'No first name supplied'],
        validate: {
            validator: function(val) {
                //should be between 2 and 12 characters and contain only letters and numbers
                let re = /^(?!\d\s+$)[a-zA-Z\d\s]+$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid name!`
       }
    }, 

    lastname: { type: String, required: [true, 'No last name supplied'],
        validate: {
            validator: function(val) {
                //should be between 2 and 12 characters and contain only letters and numbers
                let re = /^(?!\d\s+$)[a-zA-Z\d\s]+$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid name!`
        }
    },

    provider_group_ref: { type: Schema.Types.ObjectId, ref: 'Provider_group', required: [true, 'No provider group ref supplied'] },
    provider_group_id:  {type: String, required: [true, 'No provider group id supplied']},
    provider_group_name:  {type: String, required: [true, 'No provider group name supplied']},

    role: { type: String, enum: ['Physician (specialist)', 'Physician (primary care)', 'Physician (hospitalist)', 'Nurse (specialist)', 'other'], required: [true, 'No provider role supplied] '] },
    role_other: {type: String},

    office: { 
        name: {type: String, required: true }, 
        street: {type: String},
        city: {type: String, required: true },
        state: {type: String, required: true }, 
        zip: {type: String, required: true }
     },

    email: { type: String, unique: true, required: [true, 'No email address supplied'] },

    phone: [{ 
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: {type: String, required: [true, 'No phone number supplied' ]},
            ext: Number,
        },{
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: String,
            ext: Number,
        },{
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: String,
            ext: Number,
        }
    ],

    custom_questions: [{ type: Schema.Types.ObjectId, ref: 'Question_custom' }]

    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }  

);


// mongoose error handling middleware function
handleError = (error, doc, next) => {
    console.log('Operation failed')
    console.log(`Error name: ${error.name}  + error code: ${error.code}`)
    if (error.name === 'ValidationError') {
        next(new Error(`New/updated document failed Mongoose validation.`));
    } else {
        next()
    }
};
providerSchema.post('save', handleError);
providerSchema.post('findOneAndUpdate', handleError);


var Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;