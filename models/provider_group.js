const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const provider_groupSchema = new Schema({

    added_by: {type: String},
    date_added: {type: Date, default: new Date()},
    group_name: {type: String, required: [true, "No provider group name"]}
    
    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
);

var Provider_group = mongoose.model("Provider_group", provider_groupSchema);

module.exports = Provider_group;