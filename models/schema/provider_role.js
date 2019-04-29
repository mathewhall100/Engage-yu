const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provider_roleSchema = new Schema({

    role: { 
        type: String, 
        enum: ['physician (specialist)', 'physician (primary care)', 'physician (hospitalist)', 'nurse (registered)', 'nurse practitioner', 'admin', 'other'], 
        required: [true, 'No provider role supplied] '] 
    }
}, 

    { _id: false}
    
);

module.exports = provider_roleSchema;