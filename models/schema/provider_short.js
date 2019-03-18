const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provider_shortSchema = new Schema({

    ref: { type: Schema.Types.ObjectId, ref: "Provider", required: [true, "No primary provider Id supplied"] },
    id: {type: String, required: [true, "No primary provider id supplied"]},
    title: String,
    firstname: { type: String, required: [true, "No primary provider firstname supplied"] },
    lastname: { type: String, required: [true, "No primary provider lastname supplied"] },
    role: String
});

module.exports = provider_shortSchema;