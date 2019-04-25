const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const provider_roleSchema = require("./provider_role")

const provider_group_summarySchema = new Schema({

    ref: { 
        type: 
        Schema.Types.ObjectId, 
        ref: 'Provider_group', 
        required: [true, 'No provider group ref supplied'] 
    },

    id:  {
        type: String, 
        required: [true, 'No provider group id supplied']
    },
    
    name:  {
        type: String, 
        required: [true, 'No provider group name supplied'],
        validate: {
            validator: function(val) {
                //should be between 5 and 20 characters and contain only letters,numbers and ',-,.,, or space
                let re = /^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{5,50}$/
                return re.test(val);
            },
            message: props => `${props.value} is not a valid name!`
        },
    },
});

module.exports = provider_group_summarySchema;