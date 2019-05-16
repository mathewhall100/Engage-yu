const db = require("../models/provider_group");
const hp = require("../utils/helper")
const api = require("./dbApi")


module.exports = { 

    // Fetch all provider_groups
    findAll: async function(req, res) {
        console.log("Provider_group controller called to 'findAll' care groups");
        const findObj = {find: {}}
        try {
            const result = await api.find(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Fetch provider_groups details by id
    // To be sent req.params.id with _id of provider_group to be fetched
    findById: async function(req, res) {
        console.log("Provider_group controller called to 'findOne' " + req.params.id);
        const id = req.params.id
        const findObj = {}
        try {
            const result = await api.findById(id, findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Create a new document using mongoose 'save'
    // To be sent req.body describing new document
    create: async function(req, res) {
        console.log("Provider_group controller called to 'create' :", req.body);
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
        console.log("Provider_group controller called to 'update' " + req.params.id);
        const idObj = {_id: req.params.id};
        const updObj = req.body;
        try {
            const result = await api.updateVal({idObj, updObj}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Remove a provider_group
    // To be sent req.params.id of resultto be deleted
    delete: async function(req, res) {
        console.log("provider_groupController called to 'remove' " + req.params.id);
        const id = req.params.id
        try {
            const result = await api.del_te(id, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }

};