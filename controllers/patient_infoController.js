const db = require("../models");

module.exports = {

    // Fetch personal details of all patients of a particular physician
    // requires physician id as searchterm in req.body.searchId
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAllByProvider: function(req, res) {
        console.log("Patient_info controller called to 'find all by provider'" + req.params.id);
        db.Patient_info
        .find( {"primary_provider.id" : req.params.id}, {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1, primary_provider: 1} )
        .sort( {"patient_details.lastname": 1} )
        .then(patients=> {
            console.log("RESULT:", patients)
            res.json(patients);
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`)
            res.status(422).json(err);
        })
    }, 

    // Fetch personal details of all patients of a particular care group
    //requires caregroup id as searchterm in req.body.searchId
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAllByGroup: function(req, res) {
        console.log("Patient_info controller called to 'find all by provider group'", req.body );
        db.Patient_info
        .find( {"provider_group.id": req.params.id}, {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1, primary_provider: 1 } )
        .sort( {"patient_details.lastname": 1} )
        .then(patients=> {
            console.log("RESULT:", patients)
            res.json(patients);
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    }, 


    // Fetch patient info by id 
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient data (all) + providers (via populate)
    findById: function(req, res) {
        console.log("Patient_info controller called to 'findById'");
        db.Patient_info
        .findById(req.params.id)
        .populate("enrolled_by.ref", "firstname lastname")
        .populate("primary_provider.ref", "firstname lastname")
        .then(patient => {
            console.log("RESULT:", patient);
            res.json(patient)
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR IN PATIENT INFO: ${err}`);
            res.status(422).json(err);
        })
    },

    // Fetch FULL patient record (info + data) by patient  id 
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient info + patient data
    findFullById: function(req, res) {
        console.log("Patient_info controller called to 'findFullById'");
        db.Patient_info
        .findById(req.params.id)
        .populate("patient_data_ref")
        .then(patient => {
            console.log("RESULT:", patient);
            res.json({patient})
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },

    // Search patient_info documents
    // To be sent a searchterm object: {field: searchterm}
    // Return json of patient data (all) + provider details (via populate)
   findBySearchterm: function(req, res) {
        console.log("Patient_info controller called to 'findBySearchterm' ", req.body);
        db.Patient_info
        .find(req.body,  {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1})
        .populate("enrolled_by.ref", "name")
        .populate("primary_provider.ref", "name")
        .then(patient => {
            console.log("RESULT:", patient);
            res.json(patient);
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        }) 
    },

    // Add new patient_info document
    // To be sent req.body with new patient object {see model & validations}
    // Returns json object of new doctor
    create: function(req, res) {
        console.log("Patient controller called to 'create'" );
        let patient = new db.Patient_info(req.body)
        patient.save()
        .then(result=> {
            console.log("RESULT: ", result);
            res.json(result)
        })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
        })  
    },

    // INsert data ref during patient enroll
    // To be sent req.params.id of patient to be updated and req.body with new patient_data ref id
    update: function(req, res) {
        console.log("Patient_info controller called to 'update'", req.params.id, " ", req.body );
        let opts = {runValidators: true};
        db.Patient_info
        .findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }, 
            opts
        )
        .then(result => {
            console.log("RESULT: ", result);
            res.json(result)
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },

    // Remove patient account
    // To be sent req.params.id of patient to be deleted
    delete: function(req, res) {
        console.log("Patient-infoController called to 'remove' " + req.params.id);
        db.Patient_info
        .findByIdAndRemove({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.json(result)
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },



};

