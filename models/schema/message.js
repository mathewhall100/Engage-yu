const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    msg_id: {
        type: String, 
        enum: ["requested", "actioned", "cancelled"]
    },

    msg_date: { 
        type: Date, 
        default: new Date()
    },

    msg_title: {
        type: String, 
        required: [true, "No question supplied"]
    },

    msg_body: {
        type: String, 
        required: [true, "No question supplied"]
    },

    read: { 
        type: Boolean
    },

    time_read: { 
        type: Date, 
    } 
},

    { _id: false}
    
);

module.exports = messageSchema; 