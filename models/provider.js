const mongoose = require('mongoose')
const custom_question_listSchema = require("./schema/custom_question_list");
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
            message: props => `${props.value} is not a valid provider name!`
       }
    }, 

    lastname: { type: String, required: [true, 'No last name supplied'],
        validate: {
            validator: function(val) {
                //should be between 2 and 12 characters and contain only letters and numbers
                let re = /^(?!\d\s+$)[a-zA-Z\d\s]+$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider name!`
        }
    },

    provider_group_ref: { type: Schema.Types.ObjectId, ref: 'Provider_group', required: [true, 'No provider group ref supplied'] },
    provider_group_id:  {type: String, required: [true, 'No provider group id supplied']},
    provider_group_name:  {type: String, required: [true, 'No provider group name supplied']},

    role: { type: String, enum: ['Physician (specialist)', 'Physician (primary care)', 'Physician (hospitalist)', 'Nurse (specialist)', 'other'], required: [true, 'No provider role supplied] '] },
    role_other: {type: String},

    office: { 
        name: {type: String, required: [true, "No provider office name!" ],  
        validate: {
            validator: function(val) {
                //should be between 5 and 50 characters and contain only letters and numbers, ' and - or space
                let re = /^[a-zA-Z0-9'- ]{5,50}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider name!`
        }
     }, 

    street: {type: String, required: [true, "No provider office street address!" ], 
        validate: {
            validator: function(val) {
                //should be between 5 and 50 characters and contain only letters and numbers, ' and - or space
                let re = /^[a-zA-Z0-9'- ]{5,50}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider name!`
        }
    },
        
    city: {type: String, required: [true, "No provider office city address!" ],  
        validate: {
            validator: function(val) {
                //should be between 2 and 20 characters and contain only letters and numbers, ' and - or space
                let re = /^[a-zA-Z0-9'- ]{2,20}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider office address state!`
        }
    },

    state: {type: String, enum: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'], required: [true, "No provider office address state !" ]}, 

    zip: {type: String, required: [true, "No provider office zip!" ],
        validate: {
            validator: function(val) {
                //should be between 5 numbers long only
                let re = /^[0-9]{5}$/i
                return re.test(val);
            },
            message: props => `${props.value} is not a valid zip code!` 
        }
     },

    email: { type: String, unique: true, required: [true, 'No email address supplied'], 
        validate: {
            validator: function(val) {
                //email formatting regex. Must contain letters and numbers, '@' and '.' 
                let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid email address!`
        } 
    },

    phone: [{ 
        phone: {type: String, enum: ['cell', 'office', 'other']},
        number: {type: String, required: [true, 'No phone number supplied' ], 
            validate: {
                validator: function(val) {
                    //must be of xxx-xxx-xxxx or xxxxxxxxxx format with numbers and '-' only
                    const re =  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid phone number!`
            } 
        },
        ext: {type: String,  
            validate: {
                validator: function(val) {
                    //should be  1 - 5 numbers long only
                    let re = /^[0-9]{1, 5}$/i
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid extension!` 
            }
        }
    },
    {
        phone: {type: String, enum: ['cell', 'office', 'other']},
        number: {type: String,  
            validate: {
                validator: function(val) {
                    //must be of xxx-xxx-xxxx or xxxxxxxxxx format with numbers and '-' only
                    const re =  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid phone number!`
            } 
        },
        ext: {type: String,
            validate: {
                validator: function(val) {
                    //should be  1 - 5 numbers long only
                    let re = /^[0-9]{1, 5}$/i
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid extension!` 
            }
        }
    },
    {
        phone: {type: String, enum: ['cell', 'office', 'other']},
        number: {type: String, 
            validate: {
                validator: function(val) {
                    //must be of xxx-xxx-xxxx or xxxxxxxxxx format with numbers and '-' only
                    const re =  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid phone number!`
            } 
        },
        ext: {type: String,
            validate: {
                validator: function(val) {
                    //should be  1 - 5 numbers long only
                    let re = /^[0-9]{1, 5}$/i
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid extension!` 
            }
        }
    }],

    custom_question_lists: [custom_question_listSchema]

    },
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