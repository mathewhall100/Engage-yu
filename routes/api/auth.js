const router = require("express").Router();
const hp = require("../../utils/helper")
const auth0 = require("../../controllers/auth0")
const checkToken = require("../../utils/jwt");
const checkJwt = checkToken.getCheckToken()
require('dotenv').config();

// Matches with "/api/auth/update"
router
     .route("/update")
     .post( async (req, res) => {
         console.log("authRoutes: update", req.body)
        const { userId, updObj} = req.body
        try {
            const accessToken = await auth0.getToken() // get a management API access token
            const resUpdate = await auth0.updateProfile(accessToken.data.access_token, userId, updObj) // update profile
            hp.sendSuccess(res, "success")(resUpdate.status)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
     })

// Matches with "/api/auth/updatemeta"
router
     .route("/updatemeta")
     .post( async (req, res) => {
        console.log("authRoutes: update", req.body)
        const { userId, updObj} = req.body
        try {
            const accessToken = await auth0.getToken() // get a management API access token
            const resUpdate = await auth0.updateMetaData(accessToken.data.access_token, userId, updObj) // update metadata
            hp.sendSuccess(res, "success")(resUpdate.status)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
     })

// Matches with "/api/auth/pwdReset"
router
    .route("/auth/pwdreset")
    .post( async (req, res) => {
        const { email } = req.body
        console.log("Axios call made to /dbconnections/change_password' ", email);
        try {
            const result = await auth0.pwdReset(email)
            hp.sendSuccess(res, "success")(result.status)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    })

// Matches with "/api/auth/delete"
router
    .route("/delete")
    .post( async (req, res) => {
        console.log("authRoutes: delete", req.body)
        const { userId } = req.body
        try {
            const accessToken = await getToken() // get a management API access token first
            const del_te = await auth0.del_te(accessToken.data.access_token, userId)
            hp.sendSuccess(res, "success")(del_te.status)
        } catch(error) {
            hp.sendError(res, "failed")(error)
        }
    })

module.exports = router;

