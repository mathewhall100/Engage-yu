const db = require("../models");


module.exports = { 

    // fetch user id from 'sub'
    userLookup: function(req, res) { 
        console.log("user controller called to 'userLookup' ", req.params.id);
        let userID = req.params.id.replace("%7C", "|")
        // if(req.user) {
            db.User
            .find( {sub: userID} )
            .then(user => {
                console.log(user);
                res.send(user)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    }
}