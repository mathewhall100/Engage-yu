const db = require("../models");


module.exports = {

    // Fetch details of all custom questions
    findAll: function(req, res) {
        console.log("Question_custom controller called to 'findAll'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
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
        // }else{
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
        
    },


    // Create a new custom question document using mongoose 'save'
    // To be sent req.body describing new document
    create: function(req, res) {
        console.log("Question_custom controller called to 'create'");
        console.log(req.body)
        //console.log(`Requester:  ${req.user}`);
        // if(req.user) {
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
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Remove a question from custom question list
    // To be sent req.params.id of resultto be deleted
    remove: function(req, res) {
        console.log("question_custom controller called to 'remove'");
        // if(req.user) {
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
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

};