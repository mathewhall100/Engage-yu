const db = require("../models");


module.exports = {

    // Fetch personal details of all patients in Patient collection
    // Construct separate lists for all patients, by date enrolled < 1 week ago and appointment time < 1 week in future.
    // Include their provider (populate)
    // Returns json list of patients details only (sorted alphabeltically by last_name)
    findAll: function(req, res) {
        console.log("Patient controller called to 'find all'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient
            .find( {}, {date_enrolled: 1, patient_details: 1, status: 1} )
            .sort( {"details.lastname": 1} )
            .then(patientList => {
                console.log(patientList)
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

    // Fetch patient by id (for doctor use)
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient data (all) + provider (via populate)
    findByIdForProvider: function(req, res) {
        console.log("Patient controller called to 'findByIdForProvider'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient
            .findById(req.params.id)
            .populate("enrolled_by", "name")
            .then(patient => {
                console.log(patient);
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

    // Fetch patient details (for patient use)
    // To be sent req.params.id of patient
    // Return json of patient details, next appointment & episodes + provider details (via populate)
    findByIdForPatient: function(req, res) {
        console.log("Patient controller called to 'findByIdForPatient'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            console.log(req.params.id);
            db.Patient
            .findById(req.params.id, {patient_details: 1, next_appointment: 1, episode: 1})
            .populate("provider")
            .then(patient => {
                console.log(patient);
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

    // Add new patient document
    // To be sent req.body with new patient object {see model & validations}
    // Returns json object of new doctor
    create: function(req, res) {
        console.log("Patient controller called to 'create'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            let patient = new db.Patient(req.body)
            patient.save()
            .then(result=> {
                console.log(result);
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
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){

        let opts = {runValidators: true};
            db.Patient
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { "patient_details.email": req.body.email }
                }, opts
            )
            .then(result => {
                console.log(result);
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
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){

        let opts = {runValidators: true};
            db.Patient
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { "patient_details.phone": req.body.phone }
                }, opts
            )
            .then(result => {
                console.log(result);
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
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {"status": req.body.status} }
            )
            .then(result => {
                console.log(result);
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

    // Update patients name
    // To be sent req.params.id of patient and req.body of new patient info
    updateName: function(req, res) {
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            let opts = {runValidators: true};
            db.Patient
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {
                    "patient_details.firstname": req.body.firstname,
                    "patient_details.lastname": req.body.lastname,
                     } 
                }, opts
            )
            .then(result => {
                console.log(result);
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

    // Create a new episode 
    // To be sent req.params.id of patient and req.body of new episode info
    newEpisode: function(req, res) {
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient
            .findOneAndUpdate(
                { _id: req.params.id },
                { $push: {episode: req.body} }
            )
            .then(result => {
                console.log(result);
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

    // add a new record
    // To be sent req.params.id of patient and req.body of new record data
    addRecord: function(req, res) {
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient
            .findById({
                _id: req.params.id}, {"episode": 1}
            )
            .then(result => {
                console.log("RESULY:" + result)
                let lastEpisode = result.episode[result.episode.length-1]
                let records = lastEpisode.record;
                records.push(req.body);

                    db.Patient
                    .findOneAndUpdate(
                    { _id: req.params.id},
                    { $pop: {"episode": 1} } 
                )
                .then(result => 
                    db.Patient
                    .findOneAndUpdate(
                        { _id: req.params.id },
                        { $push: {"episode": lastEpisode} }
                    )
                )
            })
            .then(result => {
                console.log(result);
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

