const db = require("../models");


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

    editRecord : function( req, res) {
        console.log("Patient_data controller called to editRecord : ", req.body);


        /* db.Patient_data.update(
            {
                "patient_info_id": "5b91d55d83a9cab314dc89c2"
            }, 
            {
                "_id": "5ba6e22d0e2b894417c9dd97",
                "patient_info_id": "5b91d55d83a9cab314dc89c2",
                "episodes": [
                    {
                        "episode_number": 1,
                        "requesting_provider_ref": "5b722e30a78fe511a9bf7dd8",
                        "requesting_provider_id": "5b722e30a78fe511a9bf7dd8",
                        "requesting_provider_lastname": "melanie",
                        "requesting_provider_firstname": "jkopff",
                        "start_date":"2018-09-23T00:45:33.468Z",
                        "end_date": "2018-09-23T00:45:33.468Z",
                        "num_days": 3,
                        "start_time": "1000",
                        "end_time": "1400",
                        "interval_mins": 35,
                        "margin_mins": 15,
                        "num_questions": 5,
                        "questions": [
                            "on",
                            "off",
                            "on, non-troubling dyskinesia",
                            "on, troubling dyskinesia",
                            "asleep"
                        ],
                        "expected_num_records": 15,
                        "remind_sataus": "on",
                        "report_to": [
                            "5b722e30a78fe511a9bf7dd8"
                        ],
                        "data" : {
                            "records" : {
                                "record_number " : 1,
                                "question " : 1 ,
                                "answers" : [ false, false, true, false, false],
                            }
                        }
                    }
                ]
            }
        ).then( result => {
            console.log(result);
            res.json(result);
        }).catch ( err => {
            console.log(err);
            res.json(err);
        }) */

        
        /* db.Patient_data.update(
            {
                "patient_info_id": "5b91d55d83a9cab314dc89c1",
            },
            {
                "$push": { "episodes.$[outer].records.$[inner].time": 1523 }
            },
            {
                "arrayFilters": [{ "outer.episode_number": 27.0 }, { "inner._id": "5ba06e3214dba31a98b895d0" }], new: true, upsert: true
            }
        ).then( data => {
            console.log(data);
            res.json(data);
        }).catch( err => {
            console.log(err);
            res.json(err);
        }) */
    },
    editRecord : function(req, res) {
        console.log("Patient_data controller called to 'editRecord'", req.body);
        console.log("id is  : ", req.params.id);
        console.log("record id is : ", req.params.record_id);
        console.log("episode is : ", req.params.episode);
        //console.log(`Requester:  ${req.user}`);
        // if(req.user){
        db.Patient_data
            .find({
                _id: req.params.id
            }, { "episodes": 1 }
            )
            .then(result => {

                
                let episodeSelected = result[0].episodes[parseInt(req.params.episode)]
                console.log("episode selected : ", episodeSelected);
                let records = episodeSelected.records;
                console.log("record found! , printing the first record.. ", records[0]);
                // edit the entry here...
                for(let i =0; i <= records.length-1; i++){
                    console.log("looping through the records..." + records[i]._id + " , is it identical to " + req.params.record_id)
                    if(records[i]._id == req.params.record_id){
                        console.log("found the record id, proceed to alter the data")
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
                console.log(`CONTROLLER ERROR: ${err}`);
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


};

