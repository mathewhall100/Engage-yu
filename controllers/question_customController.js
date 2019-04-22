const db = require("../models");


module.exports = {

    // Fetch details of all custom questions
    findAll: function(req, res) {
        console.log("Question_custom controller called to 'findAll'" );
        db.Question_custom
        .find({}) 
        .then(questionList => {
            console.log(questionList)
            res.json({
                questionList: questionList,
            });
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },


    // Create a new custom question document using mongoose 'save'
    // To be sent req.body describing new document
    create: function(req, res) {
        console.log("Question_custom controller called to 'create'");
        console.log(req.body)
        let question = new db.Question_custom(req.body)
        question.save()
        .then(result=> {
            console.log(result);
            res.json(result)
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },

    // Remove a question from custom question list
    // To be sent req.params.id of resultto be deleted
    remove: function(req, res) {
        console.log("question_custom controller called to 'remove'");
        db.Question_custom
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