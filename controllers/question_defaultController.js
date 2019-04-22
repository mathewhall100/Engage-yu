const db = require("../models");


module.exports = {

    // Fetch details of all default questions
    findAll: function(req, res) {
        console.log("Question_default controller called to 'findAll'" );
        db.Question_default
        .find({}) 
        .then(questionList => {
            console.log(questionList)
            res.send(questionList);
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },

};