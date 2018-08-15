const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const remindSchema =  new Schema({

    reminder: { type: String, enum: ["on", "off"], default: "on"},
    mins_before: { type: Number, min: 1, max: 30, default: 10 }

});

module.exports = remindSchema; 