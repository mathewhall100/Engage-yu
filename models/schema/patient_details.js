const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const patient_detailsSchema = new Schema({
    hospital_id: { type: String, unique: true, required: [true, "No hospital ID" ],  },
    firstname: { type: String, required: [true, "No patient first name"] }, 
    lastname: { type: String, required: [true, "No patient last name"] },
    dob:  { type: String, required: [true, "No patient date of birth"] },
    email: { type: String, unique: true, required: [true, "No patient email address"] },
    phone: { 
        type: String, 
        validate: {
            validator: function(val) {
                return /\d{3}-\d{3}-\d{4}/.test(val);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, "No patient phone number"] }
});

module.exports = patient_detailsSchema; 