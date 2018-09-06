const db = require("../models");


module.exports = { 

    // Fetch all provider names and _ids (to populate listmenu)
    findAll: function(req, res) {
        console.log("Provider controller called to 'findAll'");
        // if(req.user) {
            db.Provider
            .find({})
            .sort( {"name.last" : 1} )
            .then(providerList =>  {
                console.log(providerList)
                res.json(providerList)
            })
            .catch(err => {
                console.log(`CONTROLLER ERROR: ${err}`);
                res.status(422).json(err);
            })
        // } else {
        //     res.status(422).json('You do not have proper credential to perform this action.')
        // }
    },

    // Fetch details of all providers of a particular care group
    //requires caregroup id as searchterm in req.body.searchId
    // Returns json list of provider names only (sorted alphabeltically by last_name)
    findAllByGroup: function(req, res) {
        console.log("Provider controller called to 'find all by provider group'", req.body );
        //console.log(`Requester:  ${req.user}`);
        //if(req.user){
            db.Provider
            .find( {
                provider_group_id: req.params.id}, 
                {firstname: 1, lastname: 1, _id: 1, provider_group_ref: 1, provider_group_id: 1, provider_group_name: 1}, )
            .sort( {"lastname": 1} )
            .then(providerList => {
                console.log("RESULT:", providerList)
                res.json({
                    providerList: providerList,
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


    // Fetch provider details by id
    // To be sent req.params.id with _id of provider to be fetched
    findById: function(req, res) {
        console.log("Provider controller called to 'findOne'" +req.params.id);
        // if(req.user) {
            db.Provider
            .findById(req.params.id)
            .populate("provider_group_ref", "group_name")
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
        console.log("Provider controller called to 'create'");
        console.log(req.body)
        // if(req.user) {
            let provider = new db.Provider(req.body)
            provider.save()
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
   

    // Remove a provider
    // To be sent req.params.id of resultto be deleted
    remove: function(req, res) {
        console.log("resultcontroller called to 'remove' " + req.params.id);
        // if(req.user) {
            db.Provider
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
        console.log("Provider controller called to 'update' " + req.params.id);
        // if(req.user) {
        let opts = {runValidators: true};
            db.Provider
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