const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const provider_groupSchema = new Schema({

    added_by_ref: { type: Schema.Types.ObjectId, ref: 'Provider', required: [true, 'No added by ref supplied'] },
    added_by_id:  {type: String, required: [true, 'No added by id supplied']},
    added_by_name:  {type: String, required: [true, 'No added by Name supplied']},
    date_added: {type: Date, default: new Date()},
    group_name: {type: String, required: [true, "No provider group name supplied"]}
    
    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
);

var Provider_group = mongoose.model("Provider_group", provider_groupSchema);

module.exports = Provider_group;