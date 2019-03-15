const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report_toSchema = new Schema({

    provider_ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary provider Id supplied"] },
    provider_id: {type: String, required: [true, "No primary provider id supplied"]},
    provider_firstname: { type: String, required: [true, "No primary provider firstname supplied"] },
    provider_lastname: { type: String, required: [true, "No primary provider lastname supplied"] },
    
});

module.exports = report_toSchema; 