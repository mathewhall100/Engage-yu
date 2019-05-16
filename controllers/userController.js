const db = require("../models/user")
const hp = require("../utils/helper");
const api = require("./dbApi")


module.exports = { 

    // fetch user id from 'sub'
    userLookup: async function(req, res) { 
        console.log("User controller called to 'userLookup' ", req.params.id);
        let userID = req.params.id.replace("%7C", "|")
        findObj = {
            find: {sub: userID}
        }
        try {
            const result = await api.findOne(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // find a user based on searchterm (e.g. their patient_info or provider ID)
    userFind: async function(req, res) { 
        console.log("User controller called to 'userFind' ", req.body);
        let findObj = req.body
        try {
            const result = await api.findOne(findObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    },

    // Add new user document
    // To be sent req.body with new user object {see model & validations}
    create: async function(req, res) {
        console.log("User controller called to 'create': ", req.body );
        const infoObj = req.body
        try {
            const result = await api.create(infoObj, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }  
    },

    // Delete user document
    // To be sent req.params.id of user to be deleted
    delete: async function(req, res) {
        console.log("User controller called to 'delete'", req.params.id );
        const id = req.params.id
        try {
            const result = await api.delete(id, db)
            hp.sendData(res, "success")(result)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        } 
    }
}