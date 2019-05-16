const db = require("../models/patient_info");
const db_patient_data = require("../models/patient_data")
const db_user = require("../models/user");
const hp = require("../utils/helper")
const auth0 = require("./auth0")
const api = require("./dbApi");


module.exports = {

    // Fetch personal details of all patients of a particular physician
    findAllByProvider: async function(req, res) {
        console.log("Patient_info controller called to 'find all by provider'" + req.params.id);
        const findObj = {
            find: {"primary_provider.id" : req.params.id},
            fields:  {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1, primary_provider: 1},
            sort: {lastname: 1},
        }
        try { 
            const result = await api.find(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }, 
        
    // Fetch personal details of all patients of a particular care group
    findAllByCareGroup: async function(req, res) {
        console.log("Patient_info controller called to 'find all by provider group'", req.params.id );
        const findObj = {
            find: {"provider_group.id" : req.params.id},
            fields:  {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1, primary_provider: 1},
            sort: {lastname: 1},
        }
        try {
            const result = await api.find(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }, 

    // Fetch FULL patient record (info + data) by patient  id 
    findById: async function(req, res) {
        console.log("Patient_info controller called to 'findFullById' ", req.params.id);
        const id = req.params.id
        const findObj = {
            pop: "patient_data_ref"
        }
        try {
            const result = await api.findById(id, findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Search patient_info documents
   findOne: async function(req, res) {
        console.log("Patient_info controller called to 'search' ", req.body);
        const findObj = {
            find: req.body,
            fields:  {date_enrolled: 1, status: 1, firstname: 1, lastname: 1, dob: 1, hospital_id: 1, primary_provider: 1},
            sort: {lastname: 1},
            pop: "patient_data_ref"
        }
        try {
            const result = await api.findOne(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Add new patient_info and patient_data documents
    create: async function(req, res) {
        const newPtInfoObj = req.body
        console.log("Patient controller called to 'create' ", newPtInfoObj );
        try {
            const retNewPtInfo = await api.create(newPtInfoObj, db)
            const newPtDataObj = {
                patient_info_ref: retNewPtInfo._id,
                patient_info_id: retNewPtInfo._id
            }
            const retNewPtData = await api.create(newPtDataObj, db_patient_data)
            const newPtUpdObj = {
                $set: {
                    patient_data_ref: retNewPtData._id,
                    patient_data_id: retNewPtData._id
                }
            }
            const newPtIdObj = {_id: retNewPtInfo._id }
            const retNewPtInfoUpdate = await api.updateVal({idObj: newPtIdObj, updObj: newPtUpdObj}, db)
            // if no errors return success
            hp.sendSuccess(res, "success")({
                "newPtInfo": retNewPtInfoUpdate, 
                "newPtData": retNewPtData
            })
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }   
    },

    // Update patient details
    update: async function(req, res) {
        console.log("Patient_info controller called to 'update'", req.params.id, " ", req.body );
        const idObj = {_id: req.params.id};
        const updObj = req.body;
        try {
            result = await api.updateVal({idObj, updObj}, db)
            hp.sendSuccess(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Update patient Email address
    updateEmail: async function(req, res) {
        const patientInfoId = req.params.id;
        const idObj = {_id: patientInfoId}
        const updObj = req.body;
        const findObj = {find: {id: patientInfoId}}
        console.log("Patient_info controller called to 'update'", patientInfoId, " ", updObj );
        try {
            const ret = await Promise.all([
                auth0.getToken(),
                api.findOne(findObj, db_user),
                api.updateVal({idObj, updObj}, db)
            ])
            const accessToken = ret[0].data.access_token;
            const auth0UserId = ret[1].sub;
            const updatePatient = ret[2];
            const updateAuth0 = await auth0.updateProfile(accessToken, auth0UserId, updObj)
            // if no errors return success
            hp.sendSuccess(res, "success")({"Patient": updatePatient, "auth0": updateAuth0.status})
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Cleanup after failed create new user
    cleanUp: async function(req, res) {
        console.log("patient_info controller called to 'cleanup' :", req.body)
        const { infoId, dataId, userId, authId } = req.body;
        try {
            if (infoId) {
                // delete from patient_info
            }
            if (dataId) {
                // delete from patient_data
            }
            if (userId) {
                // delete from user
            }
            if (authId) {
                // get auth0 access token
                // delete from auth
            }
            // if no errors return success
            hp.sendSuccess(res, "success")({"Patient": updatePatient, "auth0": updateAuth0.status})
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Delete patient account
    delete: async function(req, res) {
        console.log("Patient-infoController called to 'remove' " + req.params.id);
        const patientInfoId = req.params.id;
        const findObj = { find: {id: patientInfoId} }
        try { 
            let ret = await Promise.all([
                api.findOne(findObj, db_user),
                auth0.getToken()
            ])
            const userId = ret[0]._id
            const auth0UserId = ret[0].sub;
            const accessToken = ret[1].data.access_token;
            ret = await Promise.all([
                api.del_te(userId, db_user),
                auth0.del_te(accessToken, auth0UserId)
            ])
            const result = await api.del_te(patientInfoId, db)
            hp.sendSuccess(res, "success")(result)
               } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }

};
