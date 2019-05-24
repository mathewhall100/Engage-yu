const db = require("../models/question_custom");
const hp = require("../utils/helper")
const api = require("./dbApi")

module.exports = {

    // Fetch details of all custom questions
    findAll: async function(req, res) {
        console.log("Question_custom controller called to 'findAll'" );
        findObj={find: {}}
        try {
            const result = await api.find(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },


    // Create a new custom question document using mongoose 'save'
    // To be sent req.body describing new document
    create: async function(req, res) {
        console.log("Question_custom controller called to 'create' ", req.body);
        const newObj = req.body
        try {
            const result = await api.create(newObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Update a new custom question document 
    // To be sent req.body describing new document
    update: async function(req, res) {
        console.log("Question_custom controller called to 'update' ", req.params.id, " ", req.body);
        const idObj = { _id: req.params.id }
        const updObj = req.body
        try {
            const result = await api.updateVal({idObj, updObj}, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Remove a question from custom question list
    // To be sent req.params.id of resultto be deleted
    delete: async function(req, res) {
        console.log("question_custom controller called to 'delete': ", req.params.id);
        const id = req.params.id
        try {
            const result = await api.del_te(id, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    }

};