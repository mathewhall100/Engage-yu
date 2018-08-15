const db = require("../models");


module.exports = {

    // Fetch details of all active episodes
    findAll: function(req, res) {
        console.log("Active controller called to 'findAll'" );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Active
            .find({}) 
            .sort( {"lastname": 1} )
            .then(activeList => {
                console.log(activeList)
                res.json({
                    activeList: activeList,
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

    // Fetch active episode details by id
    // To be sent req.params.id with _id of actuive episode to be fetched
    findById: function(req, res) {
        console.log("Active controller called to 'findOne'" +req.params.id);
        //console.log(`Requester:  ${req.user}`);
        // if(req.user) {
            db.Active
            .findById(req.params.id)
            .populate("patient_id", ["patient_details.firstname", "patient_details.lastname"])
            .populate("requesting_provider_id", "name")
            .populate("primary_provider_id", "name")
            .then(activeList => {
                console.log(activeList);
                res.json(activeList)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Create a new active document using mongoose 'save'
    // To be sent req.body describing new document
    create: function(req, res) {
        console.log("Active controller called to 'create'");
        console.log(req.body)
        //console.log(`Requester:  ${req.user}`);
        // if(req.user) {
            let active = new db.Active(req.body)
            active.save()
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

    // Update active last entry
    // To be sent req.params.id of patient to be updated and req.body with new date info
    update: function(req, res) {
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Active
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: { "last_entry": req.body.last_entry }
                }
            )
            .then(result => {
                console.log(result);
                res.json(result)
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