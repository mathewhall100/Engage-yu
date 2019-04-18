const router = require("express").Router();
const axios = require("axios")
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()
require('dotenv').config();

// Matches with "/api/auth/pwdReset"
router
    .route("/auth/pwdreset")
    .post(checkJwt, (req, res) => {
        console.log("Axios call made to 'https://engageyu-dev.auth0.com/dbconnections/change_password' ", obj.email);
        return axios({
            url: `https://engageyu-dev.auth0.com/dbconnections/change_password`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: 
                { 
                    client_id: process.env.CLIENT_ID,
                    email: obj.email,
                    connection: 'Engage-Yu'
                }, 
            json: true 
        })
        .then (result => {
            console.log('res: ', result.data)
            res.json(result)
        })
        .catch (error => {
            console.log("Err: ", error)
            res.json(error)
        })
    })


// Matches with "/api/auth/gettoken"
router
    .route("/gettoken")
    .get(checkJwt, (req, res) => {
        console.log("authRoutes: getAPIAccessToken")
        return axios({
            url: `https://engageyu-dev.auth0.com/oauth/token`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: 
                { 
                    grant_type: "client_credentials",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    audience: 'https://engageyu-dev.auth0.com/api/v2/' //note different from audience used elsewhere
                }, 
            json: true 
        })
        .then (result => {
            console.log('res: ', result)
            res.json(result.data)
        })
        .catch (error => {
            console.log("Err: ", error)
            return error
        })
    })

// Matches with "/api/auth"
router
     .route("/pwdchange")
     .post(checkJwt, (req,res) => {
        console.log("authRoutes: passwordChange", req.body)
        const { userId, newPassword, accessToken } = req.body
        console.log("Axios call made to 'https://engageyu-dev.auth0.com/api/v2/users/userId' ", userId, " ", newPassword);
        console.log("Axios call made to 'https://engageyu-dev.auth0.com/api/v2/users/userId' ", accessToken);
        return axios({
            url: `https://engageyu-dev.auth0.com/api/v2/users/${userId}`,
            method: 'PATCH',
            headers: { 
                'content-type': 'application/json', 
                'Authorization': 'Bearer ' + accessToken
            },
            data: 
                { 
                    password: newPassword,
                    connection: 'Engage-Yu'
                }, 
            json: true 
        })
        .then (result => {
            console.log('res: ', res)
            res.json(result.data)
        })
        .catch (error => {
            console.log("Err: ", error)
            res.json(error)
        })
     })

     // Matches with "/api/auth"
router
    .route("/pwdtypeupdate")
    .post((req,res) => {
        console.log("authRoutes: passwordType", req.body)
        const { userId, accessToken } = req.body
        console.log("Axios call made to 'https://engageyu-dev.auth0.com/api/v2/users/userId' ", accessToken);
        return axios({
            url: `https://engageyu-dev.auth0.com/api/v2/users/${userId}`,
            method: 'PATCH',
            headers: { 
                'content-type': 'application/json', 
                'Authorization': 'Bearer ' + accessToken
            },
            data: 
                {"user_metadata" : {"password": "valid"}}, 
            json: true 
        })
        .then (result => {
            console.log('res: ', res)
            res.json(result.data)
        })
        .catch (error => {
            console.log("Err: ", error)
            res.json(error)
        })
    })

module.exports = router;