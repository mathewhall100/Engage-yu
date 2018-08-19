const db = require("../models");


module.exports = {

    // Fetch details of all default questions
    findAll: function(req, res) {
        console.log("Question_default controller called to 'findAll'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Question_default
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

};