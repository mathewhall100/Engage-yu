const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const provider_roleSchema = require("./provider_role")

const provider_summarySchema = new Schema({
    ref: { 
        type: Schema.Types.ObjectId, 
        ref: "Provider", 
        required: [true, "No primary provider Id supplied"] 
    },

    id: {
        type: String, 
        required: [true, "No primary provider id supplied"]
    },

    title: { 
        type: String, 
        required: [true, "No primary provider firstname supplied"] 
    },

    firstname: { 
        type: String, 
        required: [true, "No primary provider firstname supplied"] 
    },

    lastname: { 
        type: String, 
        required: [true, "No primary provider lastname supplied"] 
    },
    
    provider_roleSchema
});

module.exports = provider_summarySchema;