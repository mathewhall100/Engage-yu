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
        required: [true, "No primary provider id supplied"],
        index: true // set as secondary index
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

},

    { _id: false},
    // { autoIndex: false } --> set in in production see https://mongoosejs.com/docs/guide.html#indexes

);

module.exports = provider_summarySchema;