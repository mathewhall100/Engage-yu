const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    sender_role: {type: String, enum: ["patient", "provider"]},
    sender_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No requesting provider Id supplied"] },
    sender_id: {type: String, required: [true, "No requesting provider id supplied"]},
    sender_firstname: { type: String, required: [true, "No requesting provider firstname supplied"] },
    sender_lastname: { type: String, required: [true, "No requesting provider lastname supplied"] },

    msg_date: { type: Date, default: new Date()},
    msg_title: {type: String, required: [true, "No question supplied"]},
    msg_body: {type: String, required: [true, "No question supplied"]},

    read: { type: Boolean },
    time_read: { type: Date, default: new Date()},
});

module.exports = messageSchema; 