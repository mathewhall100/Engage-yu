const axios = require("axios")
const hp = require("../utils/helper")
require('dotenv').config();
const domain = process.env.DOMAIN


// return auth0 management API access token
const getToken = () => {
    return axios({
        url: `https://${domain}/oauth/token`,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { 
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            audience: `https://${domain}/api/v2/` //note different from audience used elsewhere
        }, 
        json: true 
    })
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "auth0 error")
    )
}

// Updates user profile
const updateProfile = (accessToken, userId, updObj) => {
    return axios({
        url: `https://${domain}/api/v2/users/${userId}`,
        method: 'PATCH',
        headers: { 
            'content-type': 'application/json', 
            'Authorization': 'Bearer ' + accessToken
        },
        data: {...updObj, connection: 'Engage-Yu'},
        json: true 
    })
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "auth0 error")
    )
}

// Updates user metadata
const updateMetaData = (accessToken, userId, updObj) => {
    return axios({
        url: `https://${domain}/api/v2/users/${userId}`,
        method: 'PATCH',
        headers: { 
            'content-type': 'application/json', 
            'Authorization': 'Bearer ' + accessToken
        },
        data: {"user_metadata" : updObj}, 
        json: true 
    })
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "auth0 error")
    )
}

// Trigers send out of password reset email 
const pwdReset = (email) => {
    return axios({
        url: `https://${domain}/dbconnections/change_password`,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data:  { 
            client_id: process.env.CLIENT_ID,
            email,
            connection: 'Engage-Yu'
        }, 
        json: true 
    })
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "auth0 error")
    )
}

// Deletes user from auth0
const del_te = (accessToken, userId) => {
    return axios({
        url: `https://${domain}/api/v2/users/${userId}`,
        method: 'DELETE',
        headers: { 
            'content-type': 'application/json', 
            'Authorization': 'Bearer ' + accessToken
        },
        json: true
    })
    .then(
        hp.throwIf(result => !result, 400, 'not found', 'user not found'),
        hp.throwError(500, "auth0 error")
    )
}

module.exports = {
    getToken,
    updateProfile,
    updateMetaData,
    pwdReset,
    del_te
}