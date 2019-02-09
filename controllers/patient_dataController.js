const db = require("../models");
const moment = require('moment');

module.exports = {

 
    // Fetch single patient's data (for doctor use)
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient episodes
    findById: function(req, res) {
        console.log("Patient_data controller called to 'findById'", req.params.id);
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            console.log("patient data findbyid controller id: ", req.params.id)
            db.Patient_data
            .find({ _id: req.params.id })
            .then(patient => {
                console.log("RESULT FOR PATIENT_DATA:", patient);
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

    // Add new patient_data document
    // To be sent req.body with new patient object {see model & validations}
    // Returns json object of new doctor
    create: function(req, res) {
        console.log("Patient_data controller called to 'create'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            let patient = new db.Patient_data(req.body)
            patient.save()
            .then(result=> {
                console.log("RESULT:", result);
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

     // INsert data ref during patient enroll
    // To be sent req.params.id of patient to be updated and req.body with new patient_data ref id
    insertRef: function(req, res) {
        console.log("Patient_data controller called to 'insert Ref': ", req.params.id, " : ", req.body);
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){

            db.Patient_data
            .findById({
                _id: req.params.id}, {"episodes": 1}
            )
            .then(result => {
                let lastEpisode = result.episodes[result.episodes.length-1]
                lastEpisode.active_record_ref = req.body.active_record_ref
                lastEpisode.active_record_id = req.body.active_record_id

                 db.Patient_data
                    .findOneAndUpdate(
                        { _id: req.params.id},
                        { $pop: {"episodes": 1} } 
                    )
                    .then(result => {

                        db.Patient_data
                        .findOneAndUpdate(
                            { _id: req.params.id },
                            { $push: {"episodes": lastEpisode} }
                        )
                         .then(result => {
                            // console.log("RESULT:", result);
                            res.json(result)
                         })
                    })
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    
    // Create a new patient_data episode 
    // To be sent req.params.id of patient and req.body of new episode info
    newEpisode: function(req, res) {
        console.log("Patient_data controller called to 'newEpisode" );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $push: {episodes: req.body} }
            )
            .then(result => {
                //console.log("RESULT:", result);
                //res.json(result)
                db.Patient_data
                     .findById(req.params.id)
                     .then(patient => {
                    console.log("RESULT:", patient);
                    res.json(patient.episodes[patient.episodes.length -1])
                     })
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },
    editActiveStatus : function(req, res) {
        console.log("Patient_data controller called to 'editActiveStatus");
        db.Patient_data
        .find({
            _id: req.params.id
        }, { "episodes" : 1 }
        ).then( result => {
            let episodeSelected = result[0].episodes[result[0].episodes.length-1];
            if(req.params.status != episodeSelected.status){
                episodeSelected.status = req.body.status;
            }
            episodeSelected.num_entries = episodeSelected.num_entries + 1;
            episodeSelected.last_entry = moment();
            db.Patient_data
                .findOneAndUpdate(
                { _id: req.params.id },
                { $pop: { "episodes": 1 } }
                )
                .then(result => {

                    db.Patient_data
                        .findOneAndUpdate(
                        { _id: req.params.id },
                        { $push: { "episodes": episodeSelected } }
                        )
                        .then(result => {
                            //console.log("RESULT:", result);
                            res.json(result)
                        })
                })
            }).catch(err => {
                console.log(`EDIT ACTIVE STATUS CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        
    },
    editRecord : function(req, res) {
        console.log("Patient_data controller called to 'editRecord'", req.body);
        console.log("id is  : ", req.params.id);
        console.log("record id is : ", req.params.record_id);
        console.log("episode is : ", req.params.episode);
        console.log("status is : ", req.params.new_status);
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
        db.Patient_data
            .find({
                _id: req.params.id
            }, { "episodes": 1 }
            )
            .then(result => {
                let episodeSelected = result[0].episodes[parseInt(req.params.episode)]
                let records = episodeSelected.records;
                // edit the entry here...
                for(let i =0; i <= records.length-1; i++){
                    if(records[i]._id == req.params.record_id){
                        records[i] = req.body;
                    }
                }
                episodeSelected.records = records;

                db.Patient_data
                    .findOneAndUpdate(
                    { _id: req.params.id },
                    { $pop: { "episodes": 1 } }
                    )
                    .then(result => {

                        db.Patient_data
                            .findOneAndUpdate(
                            { _id: req.params.id },
                            { $push: { "episodes": episodeSelected } }
                            )
                            .then(result => {
                                //console.log("RESULT:", result);
                                res.json(result)
                            })
                    })
            })
            .catch(err => {
                console.log(`EDIT RECORD CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
    },
    

    // add a new record to an episode
    // To be sent req.params.id of patient and req.body of new record data
    addRecord: function(req, res) {
        console.log("Patient_data controller called to 'addRecord'", req.body );
        console.log("id is  : " , req.params.id);
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient_data
            .find({
                _id: req.params.id}, {"episodes": 1}
            )
            .then(result => {
                console.log("result : ", result[0]);
                let lastEpisode = result[0].episodes[result[0].episodes.length-1]
                let records = lastEpisode.records;
                records.push(req.body);

                 db.Patient_data
                    .findOneAndUpdate(
                        { _id: req.params.id},
                        { $pop: {"episodes": 1} } 
                    )
                    .then(result => {
                        db.Patient_data
                        .findOneAndUpdate(
                            { _id: req.params.id },
                            { $push: {"episodes": lastEpisode} }
                        )
                         .then(result => {
                            console.log("RESULT:", result);
                            res.json(result)
                         })
                    })
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Remove patient data 
    // To be sent req.params.id of patient data collection to be deleted
    delete: function(req, res) {
        console.log("Patient-dataController called to 'remove' " + req.params.id);
        // if(req.user) {
            db.Patient_data
            .findByIdAndRemove({_id: req.params.id})
            .then(result => {
                console.log(result);
                res.json(result)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

};

