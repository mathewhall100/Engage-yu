const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const patient_detailsSchema = new Schema({

    hospital_id: { 
        type: String, 
        unique: true, 
        validate: {
            validator: function(hospnum) {
                let re = /^(?!\d\s+$)[a-zA-Z\d\s]+{2,12}$/
                return re.test(hospnum);
            },
            message: props => `${props.value} is not a valid hospital id!`
        },
        
        required: [true, "No hospital ID" ],  
    },
    
    firstname: { 
        type: String, 
        validate: {
            validator: function(name) {
                let re = /^[a-zA-Z]{2,30}$/
                return re.test(name);
            },
            message: props => `${props.value} is not a valid name!`
        },
        required: [true, "No patient first name"] 
    }, 

    lastname: { 
        type: String, 
        validate: {
            validator: function(name) {
                let re = /^[a-zA-Z]{2,30}$/
                return re.test(name);
            },
            message: props => `${props.value} is not a valid name!`
        },
        required: [true, "No patient last name"]
    },

    dob:  { 
        type: String, 
        validate: {
            // mm/dd/yyyy or mm-dd-yyyy
            validator: function(date) {
                let re = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
                return re.test(date);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, "No patient date of birth"] 
    },

    email: { 
        type: String, 
        unique: true,
        validate: {
            validator: function(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, "No patient email address"] 
    },

    phone: { 
        type: String, 
        validate: {
            validator: function(phone) {
                let re = /\d{3}-\d{3}-\d{4}/
                return re.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, "No patient phone number"] 
    }

});

module.exports = patient_detailsSchema; 
