const db = require("../models");


module.exports = { 

    // Fetch all provider_groups
    findAll: function(req, res) {
        console.log("Provider_group controller called to 'findAll'");
        // if(req.user) {
            db.Provider_group
            .find({})
            .sort( {"name" : 1} )
            .then(provider_groupList =>  {
                console.log("provider_group controller returned", provider_groupList.length, " provider groups:")
                console.log(provider_groupList.map(group => {console.log(">> ", group.group_name) }) )
                //console.log(provider_groupList)
                res.json(provider_groupList)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },


    // Fetch provider_groups details by id
    // To be sent req.params.id with _id of provider_group to be fetched
    findById: function(req, res) {
        console.log("Provider_group controller called to 'findOne'" +req.params.id);
        // if(req.user) {
            db.Provider_group
            .findById(req.params.id)
            .populate("added_by_ref", "name.first name.last")
            .then(provider => {
                console.log(provider);
                res.json(provider)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Create a new document using mongoose 'save'
    // To be sent req.body describing new document
    create: function(req, res) {
        console.log("Provider_group controller called to 'create'");
        console.log(req.body)
        // if(req.user) {
            let providerGroup = new db.Provider_group(req.body)
            providerGroup.save()
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
   

    // Remove a provider_group
    // To be sent req.params.id of resultto be deleted
    remove: function(req, res) {
        console.log("provider_groupController called to 'remove' " + req.params.id);
        // if(req.user) {
            db.Provider_group
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

    // Update a providers details
    // To be sent req.params.id of provider to be updated & req.body object of provider's new details
    update: function(req, res) {
        console.log("Provider_group controller called to 'update' " + req.params.id);
        // if(req.user) {
        let opts = {runValidators: true};
            db.Provider_group
                .findOneAndUpdate(
                    { _id: req.params.id },
                    req.body, opts
                    )
                .then(result => {
                    console.log(result)
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