const db = require("../models");


module.exports = {

    // Fetch personal details of all patients in Patient_info collection
    // Include their provider (populate)
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAll: function(req, res) {
        console.log("Patient_info controller called to 'find all'");
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient_info
            .find( {}, {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1} )
            .sort( {"patient_details.lastname": 1} )
            .then(patientList => {
                console.log("RESULT:", patientList)
                res.json({
                    patientList: patientList,
                });
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
        
    },   


    // Fetch personal details of all patients of a particular physician
    // requires physician id as searchterm in req.body.searchId
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAllByProvider: function(req, res) {
        console.log("Patient_info controller called to 'find all by provider'");
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient_info
            .find( {primary_provider_id: req.params.id}, {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1} )
            .sort( {"patient_details.lastname": 1} )
            .then(patientList => {
                console.log("RESULT:", patientList)
                res.json({
                    patientList: patientList,
                });
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
        
    }, 

     // Fetch personal details of all patients of a particular care group
     //requires caregroup id as searchterm in req.body.searchId
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAllByGroup: function(req, res) {
        console.log("Patient_info controller called to 'find all by provider group'", req.body );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient_info
            .find( {provider_group_id: req.params.id}, {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1} )
            .sort( {"patient_details.lastname": 1} )
            .then(patientList => {
                console.log("RESULT:", patientList)
                res.json({
                    patientList: patientList,
                });
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
        
    }, 


    // Fetch patient by id 
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient data (all) + providers (via populate)
    findById: function(req, res) {
        console.log("Patient_info controller called to 'findById'");
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient_info
            .findById(req.params.id)
            .populate("enrolled_by", "name")
            .populate("primary_provider_ref", "name")
            .then(patient => {
                console.log("RESULT:", patient);
                res.json(patient)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Search patient_info documents
    // To be sent a searchterm (object) of patient
    // Return json of patient data (all) + provider details (via populate)
   findBySearchterm: function(req, res) {
        console.log("Patient_info controller called to 'findBySearchterm' ", req.body);
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
        
    },

    // Add new patient_info document
    // To be sent req.body with new patient object {see model & validations}
    // Returns json object of new doctor
    create: function(req, res) {
        console.log("Patient controller called to 'create'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Update patient email 
    // To be sent req.params.id of patient to be updated and req.body with new patient info
    updateEmail: function(req, res) {
        console.log("Patient_info controller called to 'update email'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){

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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Update patient phone number
    // To be sent req.params.id of patient to be updated and req.body with new patient info
    updatePhone: function(req, res) {
        console.log("Patient_info controller called to 'updatePhone'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){

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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    
    // Toggle patient status (doctor use only)
    // To be sent req.params.id of patient and req.body of status
    updateStatus: function(req, res) {
        console.log("Patient_info controller called to 'updateStatus'" );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Update patient name
    // To be sent req.params.id of patient and req.body of new patient info
    updateName: function(req, res) {
        console.log("Patient_info controller called to 'updateName" );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },


    // Update patient's primary provider
    // To be sent req.params.id of patient and req.body of new patient info
    updateProvider: function(req, res) {
        console.log("Patient_info controller called to 'updateProvider" );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            let opts = {runValidators: true};
            db.Patient_info
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {
                    "primary_provider_ref": req.body.primary_provider_ref,
                    "primary_provider_id": req.body.primary_provider_id,
                    "primary_provider_name": req.body.primary_provider_name
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },


    // Update patient's provider care group
    // To be sent req.params.id of patient and req.body of new patient info
    updateProviderGroup: function(req, res) {
        console.log("Patient_info controller called to 'updateProviderGroup" );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },



};

