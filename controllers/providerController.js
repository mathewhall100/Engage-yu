const db = require("../models/provider")
const user = require("../models/user")
const hp = require("../utils/helper")
const auth0 = require("./auth0")
const api = require("./dbApi")


module.exports = { 

    // Fetch details of all providers of a particular care group
    findAllByCareGroup: async function(req, res) {
        console.log("Provider controller called to 'find all by provider group' ", req.params.id );
        findObj = {
            find: {"provider_group.id": req.params.id},
            sort: {lastname: 1}
        }
        try {
            const result = await api.find(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }, 


    // Fetch provider details by id
    findById: async function(req, res) {
        console.log("Provider controller called to 'findById' ", req.params.id);
        const id = req.params.id
        try {
            const result = await api.findById(id, {}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Create a new document using mongoose 'save'
    create: async function(req, res) {
        console.log("Provider controller called to 'create' ", req.body);
        const newObj = req.body
        try {
            const result = await api.create(newObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Update a providers details
    // To be sent req.params.id of provider to be updated & req.body object of provider's new details
    update: async function(req, res) {
        console.log("Provider controller called to 'update' ", req.params.id, " ", req.body);
        const idObj = { _id: req.params.id }
        const updObj = req.body
        try {
            const result = await api.updateVal({idObj, updObj}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Update patient Email address
    updateEmail: async function(req, res) {
        const providerId = req.params.id;
        const idObj = { _id: providerId }
        const updObj = req.body;
        const findObj = { find: {id: providerId} }
        console.log("Provider controller called to 'update'", providerId, " ", updObj );
        try {
            const ret = await Promise.all([
                auth0.getToken(),
                api.findOne(findObj, user),
                api.updateVal({idObj, updObj}, db)
            ])
            const accessToken = ret[0].data.access_token;
            const auth0UserId = ret[1].sub;
            const updateProvider = ret[2];
            const updateAuth0 = await auth0.updateProfile(accessToken, auth0UserId, updObj)
            // if no errors return success
            hp.sendSuccess(res, "success")({"Patient": updateProvider, "auth0": updateAuth0.status})
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

     // Update a providers details
    // To be sent req.params.id of provider to be updated & req.body object of provider's new details
    saveQuestionList: async function(req, res) {
        console.log("Provider controller called to 'update' ", req.params.id, " ", req.body);
        const idObj = { _id: req.params.id }
        const updObj = { $push: { "custom_question_lists": req.body } }
        try {
            const result = await api.updateVal({idObj, updObj}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Delete provider
    // To be sent patient_info._id of provider to be deleted as req.params.id
    delete: async function(req, res) {
        console.log("Provider controller called to 'remove' ", req.params.id);
        const providerId = req.params.id
        const findObj = { find: {id: providerId} }
        console.log("finduser: ", findObj)
        try { 
            let ret = await Promise.all([
                api.findOne(findObj, user),
                auth0.getToken()
            ])
            console.log("ret: ", ret[0]._id, " : ", ret[1].data.access_token)
            if (ret[0] && ret[1]) {
                const userId = ret[0]._id
                const auth0UserId = ret[0].sub;
                const accessToken = ret[1].data.access_token;
                ret = await Promise.all([
                    api.del_te(userId, user),
                    auth0.del_te(accessToken, auth0UserId)
                ])  
            }
            const result = await api.del_te(providerId, db)
            hp.sendSuccess(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

};