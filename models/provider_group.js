const mongoose = require("mongoose")
const provider_summarySchema = require("./schema/provider_summary");


const Schema = mongoose.Schema;

const provider_groupSchema = new Schema({

    // added_by_ref: { type: Schema.Types.ObjectId, ref: 'Provider', required: [true, 'No added by ref supplied'] },
    // added_by_id:  {type: String, required: [true, 'No added by id supplied']},
    // added_by_name:  {type: String, required: [true, 'No added by Name supplied']},
    date_added: {type: Date, default: new Date()},
    
    added_by : {
        type: {provider_summarySchema}, 
        required: [true, 'No caregroup added_by details supplied']
    },

    group_name: {
        type: String, 
        unique: true,
        required: [true, "No provider group name supplied"],
        validate: {
            validator: function(val) {
                //should be between 5 and 50 characters and contain only letters and ', - or space
                let re = /^[a-zA-Z0-9\\'\\-\\ ]{5,50}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid group name!`
        }
    }
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
provider_groupSchema.post('save', handleError);
provider_groupSchema.post('findOneAndUpdate', handleError);

var Provider_group = mongoose.model("Provider_group", provider_groupSchema);

module.exports = Provider_group;