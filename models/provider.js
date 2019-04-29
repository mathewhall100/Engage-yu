const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const custom_question_listSchema = require("./schema/custom_question_list");
const provider_roleSchema = require("./schema/provider_role")
const provider_group_summarySchema = require("./schema/provider_group_summary")
const provider_summarySchema = require("./schema/provider_summary")


const providerSchema = new Schema({

    date_added: {
        type: Date, 
        default: Date.now
    },

    added_by : {
        type: {provider_summarySchema}, 
        required: [true, 'No provider added_by details supplied']
    },

    title: { 
        type: String, 
        enum: ["prof", "dr", "rn", "np", "dnp", "admin", "other", "none"],
        default: "none"
    },

    firstname:  { 
        type: String, 
        required: [true, 'No first name supplied'],
        validate: {
            validator: function(val) {
                //should be between 2 and 20 characters and contain only letters,numbers and ',-,.,, or space
                let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{2,20}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider name!`
       }
    }, 

    lastname: { 
        type: String, 
        required: [true, 'No last name supplied'],
        validate: {
            validator: function(val) {
                //should be between 2 and 20 characters and contain only letters,numbers and ',-,.,, or space
                let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{2,20}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid provider name!`
        }
    },

    office: { 
        name: {
            type: String, 
            required: [true, "No provider office name!" ],  
            validate: {
                validator: function(val) {
                    //should be between 5 and 50 characters and contain only letters,numbers and ',-,.,, or space
                    let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{5,50}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid provider name!`
            }
        },
        street: {
            type: String, 
            required: [true, "No provider office street address!" ], 
            validate: {
                validator: function(val) {
                    //should be between 5 and 50 characters and contain only letters,numbers and ',-,.,, or space
                    let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{5,50}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid provider name!`
            }
        }, 
        city: {
            type: String, 
            required: [true, "No provider office city address!" ],  
            validate: {
                validator: function(val) {
                    //should be between 2 and 20 characters and contain only letters,numbers and ',-,.,, or space
                    let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{2,20}$/
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid provider office address state!`
            }
        },
        state: {
            type: String, 
            enum: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'], 
            required: [true, "No provider office address state !" ]
        }, 
        zip: {
            type: String, 
            required: [true, "No provider office zip!" ],
            validate: {
                validator: function(val) {
                    //should be  5 numbers only
                    let re = /^[0-9]{5}$/i
                    return re.test(val);
                },
                message: props => `${props.value} is not a valid zip code!` 
            }
        }
    },

    email: { 
        type: String, 
        unique: true, 
        required: [true, 'No email address supplied'], 
        validate: {
            validator: function(val) {
                //email formatting regex. Must contain letters and numbers, '@' and '.' in appropriatye order
                let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid email address!`
        } 
    },

    phone_office: {
        type: String, 
        required: [true, 'No office phone supplied' ],
        validate: {
            validator: function(val) {
                //must be of 'xxx-xxx-xxxx', 'xxxxxxxxxx' or '(xxx) xxx xxxx' format with numbers, () and '-' only
                const re =  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    phone_cell: {
        type: String, 
        validate: {
            validator: function(val) {
                //must be of 'xxx-xxx-xxxx', 'xxxxxxxxxx' or '(xxx) xxx xxxx' format with numbers, () and '-' only
                const re =  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    phone_pager: {
        type: String, 
        validate: {
            validator: function(val) {
                //should be between 2 and 12 characters, numbers or -
                const re =  /^[a-zA-Z0-9\\-]{2,12}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid pager number!`
        }
    },

    provider_role : {
        type: {provider_roleSchema},
        required: [true, "no provider role supplied"]
    },
    
    provider_group: {
        type: {provider_group_summarySchema},
        required: [true, "no provider_group supplied"]
    },

    custom_question_lists: [custom_question_listSchema]

},

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }  

);


// mongoose error handling middleware function
handleError = (error, doc, next) => {
    console.log('Operation failed')
    console.log(`error code: ${error.code}`)
    console.log(`Error name: ${error.name}`)
    console.log(`Error: ${error}`)
   if (error.name === "MongoError" && error.code === 11000) {
        next(new Error('Duplicate key error'))  // returned to console as CONTROLLER ERROR:
    } else if (error.name === "ValidationError") {
         next(new Error(`New/updated document failed Mongoose validation.`));
    } else {
        next(new Error('An unspecified error occurred while saving the data')) 
    }
};
providerSchema.post('save', handleError);
providerSchema.post('findOneAndUpdate', handleError);

var Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;