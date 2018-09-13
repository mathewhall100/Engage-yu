const db = require("../models");


module.exports = {

 
    // Fetch single patient's data (for doctor use)
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient episodes
    findById: function(req, res) {
        console.log("Patient_data controller called to 'findById'");
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Patient_data
            .find({patient_info_id : req.params.id} , {"episodes": 1})
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

    // add a new record to an episode
    // To be sent req.params.id of patient and req.body of new record data
    addRecord: function(req, res) {
        console.log("Patient_data controller called to 'addRecord'", req.body );
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
            db.Patient_data
            .findById({
                _id: req.params.id}, {"episodes": 1}
            )
            .then(result => {
                let lastEpisode = result.episodes[result.episodes.length-1]
                let records = lastEpisode.record;
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


};

