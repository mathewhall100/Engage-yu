const db = require("../models/patient_data");
const hp = require("../utils/helper")
const api = require("./dbApi")

module.exports = {

    // Get data records by provider Id (either requester or primary provider) and with episode status of pending/active or awaiting review
    fetchActive: async function(req, res) {
        console.log("patient_data controller called to 'active' ", req.params.id)
        id = req.params.id
        findObj = {
            find: {  $and : [
                    { "episodes.requesting_provider.id" : id },
                    { $or: [
                        { "episodes.status" : "pending" },
                        { "episodes.status" : "active" },
                        { "episodes.status" : "awaiting review" }
                    ]}
                ]},
            fields: {},
            sort: {lastname: 1},
            pop: "patient_info_ref"
            }
        try {
            const result = await api.find(findObj, db)
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
                        patientDataId: pt.patient_data_id,
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
            hp.sendData(res, "success")(resultObj)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Fetch single patient's patient_data record using its _id
    findById: async function(req, res) {
        console.log("Patient_data controller called to 'findById'", req.params.id);
        const id = req.params.id 
        const findObj = {}
        try {
            const result = await api.findById(id, findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Create a new patient_data episode 
    // To be sent req.params.id of patient and req.body of new episode info
    newEpisode: async function(req, res) {
        console.log("Patient_data controller called to 'newEpisode': ", req.params.id, " ", req.body );
        const id = req.params.id;
        const idObj = { _id: id };
        const updObj = { $push: {episodes: req.body} }
        try {
            const update = await api.updateVal({idObj, updObj}, db)
            const result = await api.findById(id, {}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Insert message into an episode
    // To be sent req.params.id of patient to be updated and req.body with episodeId and message string
    insertMsg: async function(req, res) {
        console.log("Patient_data controller called to 'insert msg': ", req.params.id, " : ", req.body);
        const { msg, newEpisodeId } = req.body
        const idObj = {_id: req.params.id}
        const updObj = { $push: {"episodes.$[elem].messages" : msg} }
        const filterObj =  { arrayFilters: [ { "elem._id": newEpisodeId} ] }
        try {
            const update = await api.update({idObj, updObj, filterObj}, db)
            hp.sendData(res, "success")(update)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Edit the status field of an episode
    // To be sent req.params.id of patient and req.body of episode id to chnage and new status
    updateStatus : async function(req, res) {
        console.log("Patient_data controller called to 'updateStatus'", req.params.id, " ", req.body);
        let statObj = {};
        let updObj = {};
        let msgObj = {};
        const { newStatus, updater, msg, episodeId } = req.body
        switch (newStatus) {
            case "cancelled":
                statObj = {"episodes.$[elem].cancelled" : updater}
                break; 
            case "actioned":
                statObj = {"episodes.$[elem].actioned" : updater}
                break;
            case "archived":
                statObj = {"episodes.$[elem].archived" : updater}
                break;
            default: statObj = null
        }
        const idObj = { _id: req.params.id }
        const filterObj = { arrayFilters: [ { "elem._id": episodeId} ] }
        if (msg) {
            msgObj = {"episodes.$[elem].messages" : msg}
            updObj = { $set: {"episodes.$[elem].status" : newStatus, ...statObj}, $push: msgObj }
        } else {
            updObj =  { $set: {"episodes.$[elem].status" : newStatus, ...statObj} }
        }
        try {
            const update = await api.update({idObj, updObj, filterObj}, db)
            hp.sendSuccess(res, "success")(update)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        } 
    },

    // Replaces a single record in records array of an episode
    // episode identified by -id "inner._id" and record by record_number "inner.record_number" (can be anything in record object) 
    // To be sent req.params.id of patient and req.body of episode contaiing episode Id & records field array
    updateRecords : async function(req, res) {
        console.log("Patient_data controller called to 'updateRecord'", req.params.id, " ", req.body);
        const { new_record, episode_id, record_number } = req.body
        const idObj = { _id: req.params.id }
        const updObj = { $set: {"episodes.$[outer].records.$[inner]" : new_record} }
        const filterObj = { arrayFilters: [ { "outer._id": episode_id}, {"inner.record_number": record_number} ] }
        try {
            const update = await api.update({idObj, updObj, filterObj}, db)
            hp.sendSuccess(res, "success")(update)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        } 
    }
    
};

