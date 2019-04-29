const db = require("../models");
const moment = require('moment');

module.exports = {

    // Fetch single patient's data (for doctor use)
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient episodes
    findById: function(req, res) {
        console.log("Patient_data controller called to 'findById'", req.params.id);
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
    },

    // Get all those data records by provider Id (either requeter or primary provider) and with episode status of pending/active or awaiting review
    // Then get their matching patient_info records
    // To be sent req.parans.id of provider
    // Returns json object of list of patient_data documents
    fetchActive: function(req, res) {
        console.log("patient_data controller called to 'active' ", req.params.id)
        id = req.params.id
        db.Patient_data
            .find({ 
                $and : [
                    { "episodes.requesting_provider.id" : id },
                    { $or: [
                        { "episodes.status" : "pending" },
                        { "episodes.status" : "active" },
                        { "episodes.status" : "awaiting review" }
                    ]}
                ]
            })
            .populate("patient_info_ref") 
            .then(result => {
                console.log("Patient_data controller (active) returned ", result.length, "records:")
                result.map(res => {console.log(">> ", res.patient_info_ref.firstname, res.patient_info_ref.lastname, " + ", res.episodes.length, "episodes")} )
                //console.log("result: ", result);
                let resultObj = []
                if (result) {
                    result.map((patient, index) => {
                        let pt = patient.patient_info_ref
                        let ptObj = {
                            id: index, 
                            patientInfoId: pt._id,
                            name: `${pt.firstname} ${pt.lastname}`, 
                            number: pt.hospital_id,
                            primary: pt.primary_provider   
                        }
                        patient.episodes
                        .filter(ep => ep.status === "active" || ep.status === "pending" || ep.status === "awaiting review")
                        .map(ep => {
                            epObj = {
                                episodeId: ep._id,
                                requester: ep.requesting_provider,
                                //primary: ep.primary_provider,
                                status: ep.status,
                                start: ep.start_date, 
                                end: ep.end_date,
                                numDays: ep.num_days,
                                startTime: ep.start_time,
                                endTime: ep.end_time,
                                interval: ep.interval_mins,
                                entriesPerDay: ((parseInt(ep.end_time)-parseInt(ep.start_time))/(ep.interval_mins === 60 ? 100 : 50))+1,
                                timeframe: `${ep.start_time.slice(0,2)}:${ep.start_time.slice(-2)} - ${ep.end_time.slice(0,2)}:${ep.end_time.slice(-2)}`, 
                                records: ep.records
                            }
                            resultObj.push({...ptObj, ...epObj})
                        })
                        
                    })
                }
                res.json(resultObj)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
        })
    },

    // Add new patient_data document
    // To be sent req.body with new patient object {see model & validations}
    // Returns json object of new doctor
    create: function(req, res) {
        console.log("Patient_data controller called to 'create'" );
        let patient = new db.Patient_data(req.body)
        patient.save()
        .then(result => {
            console.log("RESULT:", result);
            res.json(result)
        })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
        })  

    },

    // Insert data ref during patient enroll
    // To be sent req.params.id of patient to be updated and req.body with new patient_data ref id
    insertRef: function(req, res) {
        console.log("Patient_data controller called to 'insert Ref': ", req.params.id, " : ", req.body);
        db.Patient_data
        .find({_id: req.params.id}, {"episodes": 1})
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
    },

    // Insert message into new episode
    // To be sent req.params.id of patient to be updated and req.body with message string
    insertMsg: function(req, res) {
        console.log("Patient_data controller called to 'insert Ref': ", req.params.id, " : ", req.body);
        db.Patient_data
        .findById({
            _id: req.params.id}, {"episodes": 1}
        )
        .then(result => {
            console.log("result : ", result);
            let lastEpisode = result.episodes[result.episodes.length-1]
            lastEpisode.messages.push(req.body);
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
    },

    
    // Create a new patient_data episode 
    // To be sent req.params.id of patient and req.body of new episode info
    newEpisode: function(req, res) {
        console.log("Patient_data controller called to 'newEpisode" );
        console.log(`Requester:  ${req.user}`);
        console.log("PatientData_id:", req.params.id)
        console.log(`data:  ${req.body}`);
        db.Patient_data
        .findOneAndUpdate(
            { _id: req.params.id },
            { $push: {episodes: req.body} }
        )
        .then(result => {
            console.log("RESULT:", result);
            res.json(result)
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
    },

    // Edit the status field of an episode
    // To be sent req.params.id of patient and req.body of episode id to chnage and new status
    updateStatus : function(req, res) {
        console.log("Patient_data controller called to 'updateStatus'");
        console.log("patient id is  : ", req.params.id);
        console.log("episodeI id is : ", req.body.episodeId);
        console.log("status is : ", req.body.newStatus);
        console.log("updater : ", req.body.updater);
        console.log("msg : ", req.body.msg);
        let updObj= {};
        let msgObj = {};
        switch (req.body.newStatus) {
            case "cancelled":
                updObj = {"episodes.$[elem].status" : req.body.newStatus, "episodes.$[elem].cancelled" : req.body.updater}
                break;
            case "actioned":
                updObj = {"episodes.$[elem].status" : req.body.newStatus, "episodes.$[elem].actioned" : req.body.updater}
                break;
            case "archived":
                updObj = {"episodes.$[elem].status" : req.body.newStatus, "episodes.$[elem].archived" : req.body.updater}
                break;
            default: updObj = null
        }
        if (req.body.msg) {
            msgObj = {"episodes.$[elem].messages" : req.body.msg}
            db.Patient_data
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: updObj, $push: msgObj },
                    { arrayFilters: [ { "elem._id": req.body.episodeId} ] }
                )
                .then(result => {
                    console.log("RESULT:", result);
                    res.json(result)
                })
            .catch(err => {
                console.log(`EDIT ACTIVE STATUS CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        } else {
            db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: updObj },
                { arrayFilters: [ { "elem._id": req.body.episodeId} ] }
            )
            .then(result => {
                console.log("RESULT:", result);
                res.json(result)
            })
        .catch(err => {
            console.log(`EDIT ACTIVE STATUS CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
        }
            
    },

     // Edit the data field of a record
    // To be sent req.params.id of patient and req.body of new episode info
    editRecord : function(req, res) {
        console.log("Patient_data controller called to 'editRecord'", req.body);
        console.log("id is  : ", req.params.id);
        console.log("record id is : ", req.body.record_id);
        console.log("episode is : ", req.body.episode);
        console.log("status is : ", req.body.new_status);
        db.Patient_data
        .find({_id: req.params.id}, { "episodes": 1 })
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
                            console.log("RESULT:", result);
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
        db.Patient_data
        .find({
            _id: req.params.id}, {"episodes": 1}
        )
        .then(result => {
            console.log("result : ", result[0]);
            let lastEpisode = result[0].episodes[result[0].episodes.length-1]
            lastEpisode.records.push(req.body);;
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
    },

    // Remove patient data 
    // To be sent req.params.id of patient data collection to be deleted
    delete: function(req, res) {
        console.log("Patient-dataController called to 'remove' " + req.params.id);
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
    },

};

