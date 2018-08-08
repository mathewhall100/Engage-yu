const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({

    date_added: {type: Date, default: Date.now},
    name: { first: { type: String, required: true }, last: { type: String, required: true } },
    id_number: {type: String},
    office: { address1: {type: String, required: true }, address2: {type: String}, address3: {type: String}, address4: {type: String}, state: {type: String, required: true }, zip: {type: String, required: true } },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    custom_questions: [{
            type: Schema.Types.ObjectId,
            ref: "Question"
    }],

});

var Provider = mongoose.model("Physician", ProviderSchema);

module.exports = Provider;