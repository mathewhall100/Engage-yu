const db = require("../models");


module.exports = { 

    // fetch user id from 'sub'
    userLookup: function(req, res) { 
        console.log("User controller called to 'userLookup' ", req.params.id);
        let userID = req.params.id.replace("%7C", "|")
        db.User
        .find( {sub: userID} )
        .then(user => {
            console.log("User controller (userlookup) returned user: ")
            console.log(">> ", user);
            res.send(user)
        })
        .catch(err => {
            console.log(`CONTROLLER ERROR: ${err}`);
            res.status(422).json(err);
        })
    },

    // Add new user document
    // To be sent req.body with new user object {see model & validations}
    // Returns json object of new user
    create: function(req, res) {
        console.log("User controller called to 'create'" );
        let user = new db.User(req.body)
        user.save()
        .then(result=> {
            console.log("RESULT: ", result);
            res.json(result)
        })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
        })  
    },
}