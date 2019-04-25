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


    // Fetch patient by id 
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient data (all) + providers (via populate)
    findById: function(req, res) {
        console.log("Patient_info controller called to 'findById'");
            db.Patient_info
            .findById(req.params.id)
            .populate("enrolled_by.ref", "firstname lastname")
            .populate("primary_provider_ref", "firstname lastname")
            .then(patient => {
                console.log("RESULT:", patient);
                res.json(patient)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR IN PATIENT INFO: ${err}`);
                res.status(422).json(err);
            })
    },

    // Fetch FULL patienrt record (info + data) by patient  id 
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
    // To be sent a searchterm (object) of patient
    // Return json of patient data (all) + provider details (via populate)
   findBySearchterm: function(req, res) {
        console.log("Patient_info controller called to 'findBySearchterm' ", req.body);
            db.Patient_info
            .find(req.body,  {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1})
            .populate("enrolled_by", "name")
            .populate("primary_provider_ref", "name")
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
    insertRef: function(req, res) {
        console.log("Patient_info controller called to 'insert Ref'" );
        let opts = {runValidators: true};
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { 
                    "patient_data_ref": req.body.patient_data_ref,
                    "patient_data_id": req.body.patient_data_id,
                }
                }, opts
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


    // Update patient email 
    // To be sent req.params.id of patient to be updated and req.body with new patient info
    updateEmail: function(req, res) {
        console.log("Patient_info controller called to 'update email'" );
        let opts = {runValidators: true};
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { "email": req.body.email }
                }, opts
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

    // Update patient phone number
    // To be sent req.params.id of patient to be updated and req.body with new patient info
    updatePhone: function(req, res) {
        console.log("Patient_info controller called to 'updatePhone'" );
        let opts = {runValidators: true};
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { "phone": req.body.phone }
                }, opts
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

    
    // Toggle patient status (doctor use only)
    // To be sent req.params.id of patient and req.body of status
    updateStatus: function(req, res) {
        console.log("Patient_info controller called to 'updateStatus'" );
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {"status": req.body.status} }
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

    // Update patient name
    // To be sent req.params.id of patient and req.body of new patient info
    updateName: function(req, res) {
        console.log("Patient_info controller called to 'updateName" );
            let opts = {runValidators: true};
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname,
                     } 
                }, opts
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


    // Update patient's primary provider
    // To be sent req.params.id of patient and req.body of new patient info
    updateProvider: function(req, res) {
        console.log("Patient_info controller called to 'updateProvider" );
        let opts = {runValidators: true};
        db.Patient_info
        .findOneAndUpdate(
            { _id: req.params.id },
            { $set: {
                "primary_provider" : req.body.primary_provider
            } 
            }, opts
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


    // Update patient's provider care group
    // To be sent req.params.id of patient and req.body of new patient info
    updateProviderGroup: function(req, res) {
        console.log("Patient_info controller called to 'updateProviderGroup" );
        let opts = {runValidators: true};
        db.Patient_info
        .findOneAndUpdate(
            { _id: req.params.id },
            { $set: {
                "provider_group_ref": req.body.provider_group_ref,
                "provider_group_id": req.body.provider_group_id,
                "provider_group_name": req.body.provider_group_name
                    } 
            }, opts
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

