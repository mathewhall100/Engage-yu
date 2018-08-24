const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const providerSchema = new Schema({

    date_added: {type: Date, default: Date.now},
    sub: { type: String, unique: true, required: [true, 'SUB absolutely required!'] },
    name: { 
        first:  { type: String, required: [true, 'No first name supplied'],
            validate: {
                validator: function(val) {
                    //should be between 2 and 12 characters and contain only letters and numbers
                    let re = /^(?!\d\s+$)[a-zA-Z\d\s]+$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid name!`
            }
        },
        last: { type: String, required: [true, 'No last name supplied'],
            validate: {
                validator: function(val) {
                    //should be between 2 and 12 characters and contain only letters and numbers
                    let re = /^(?!\d\s+$)[a-zA-Z\d\s]+$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid name!`
            }
        }
    }, 

    provider_group: [{ type: Schema.Types.ObjectId, ref: 'Provider_group' }],
    provider_id: { type: String, unique: true },
    role: {
        role: { type: String, enum: ['Physician (specialist)', 'Physician (primary care)', 'Physician (hospitalist)', 'Nurse (specialist)', 'other'], required: [true, 'No provider role supplied] '] },
        role_other: {type: String},
    },

    office: { 
        address1: {type: String, required: true }, 
        address2: {type: String},
        address3: {type: String}, 
        address4: {type: String}, 
        state: {type: String, required: true }, 
        zip: {type: String, required: true }
     },

    email: { type: String, unique: true, required: [true, 'No email address supplied'] },

    phone: { 
        phone1: {
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: {type: String, required: [true, 'No phone number supplied' ]},
            ext: Number,
        },
        phone2: {
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: String,
            ext: Number,
        },
        phone3: {
            phone: {type: String, enum: ['cell', 'office', 'other']},
            number: String,
            ext: Number,
        }
    },

    custom_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]

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