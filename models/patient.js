const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const PatientSchema = new Schema({

        date_created: { type: Date, default: Date.now },
        enrolled_by: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
        status_active: { type: Boolean, default: true },
        
        patient_details: {
            number: { type: String, required: true },
            first_name: { type: String, required: true }, 
            last_name: { type: String, required: true },
            dob:  { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true }
        },  
        
        primary_provider: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },          
        
        next_appointment: {
            next_appt: Date,
            comments: String,
            provider: {
                type: Schema.Types.ObjectId,
                ref: "Provider"
            },
         },

        episode: [{
            number: { type: String, required: true},

            start_date: { type: Date, required: true},
            num_days: { type: Number, required: true},
            end_date: { type: Date, required: true}, 
            
            requesting_provider: {
                type: Schema.Types.ObjectId,
                ref: "Provider"
            },  

            report_to: [{
                type: Schema.Types.ObjectId,
                ref: "Provider"
            }],  

            num_questions: {type: Number, required: true},
            question: [{
                type: String, required: true
            }],

            times: {
                start_time: { type: String, required: true },
                end_time: { type: String, required: true },
                interval_mins: { type: Number, required: true },
            },

            expected_num_records: { type: Number, required: true},

            record: [{
                record_number: { type: Number, required: true},
                day: { type: Number, required: true },
                time: { type: String, required: true },

                scheduled_datetime: { 
                    datetime: {type: Date, required: true}, 
                    margin_mins: { type: Number, required: true, default: 15},
                },

                reminder: {
                    remind: { type: Boolean, required: true, default: true },
                    mins_before: { type: Number, required: true, default: 10 },
                },

                record_completed: { type: Boolean, required: true},
                medication_adherance: String,
                actual_datetime: { type: Date, default: Date.now },
                data: [{ 
                    type: Boolean
                }],
                patient_comments: String,
            }],

        }]              

    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

var Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;  