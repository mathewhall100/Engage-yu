const router = require("express").Router();
const mailer = require("../../mailer/mailer.js")
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/mailer"
router
    .route("/send")
    .post((checkJwt, req, res) => {
        console.log("mailerRoute: ", req.body)
        const { email = "", name = "", text = "" } = req.body

        mailer.send({ email, name, text })
            .then(res => {
                console.log("Message sent: ", res.data)
            })
            .catch(error => {
                console.log("Mailer error: ", error)
            })
    })


module.exports = router;