const db = require("../models/question_default");
const hp = require("../utils/helper")
const api = require("./dbApi")


module.exports = {

    // Fetch details of all default questions
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

};