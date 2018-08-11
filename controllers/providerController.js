const db = require("../models");

// Methods for Provider collection controller (using Provider model from provider.js)

module.exports = { 


    // Fetch all provider names and _ids (to populate listmenu)
    // Returns json list of providers names and _ids only (sorted alphabeltically by name
    findAll: function(req, res) {
        console.log("controller")
        //if(req.user){
            db.Provider
            .find({})
            .sort( {"name.last" : 1} )
            .then(providerList =>
                res.json(providerList))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
       // }else{
           // res.status(422).json('You do not have proper credential to perform this action.')
       // }
        
    },


    // Fetch provider details by id
    // To be sent req.params.id with _id of provider to be fetched
    // Returns json of provider details
    findById: function(req, res) {
        if(req.user){
            db.provider
            .findById(req.params.id)
            .then(provider => res.json(provider))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },


    // Add a new provider
    // To be sent req.body with object of provider data to be added
    // Returns json of new provider details
    create: function(req, res) {
        if(req.user){
            db.provider.collection
            .insert(req.body)
            .then(provider => res.json(provider))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },


    // Remove a provider
    // To be sent req.params.id of doctro to be deleted
    // Returns ?_id of deleted provider
    remove: function(req, res) {
        if(req.user){
            db.provider
            .findById({ _id: req.params.id })
            .then(provider => provider.remove())
            .then(provider => res.json(provider))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },

    // Update a providers details
    // To be sent req.params.id of provider to be updated & req.body object of provider's new details
    update: function(req, res) {
        if(req.user){
            db.provider
                .findOneAndUpdate(
                    { _id: req.params.id },
                req.body
                )
                .then(provider => res.json(provider))
                .catch(err => {
                    console.log('CONTROLLER ERROR: ${err}');
                    res.status(422).json(err);
                })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },

};