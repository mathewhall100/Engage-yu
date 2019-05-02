const router = require("express").Router();
const mailer = require("../../mailer/mailer.js")
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/mailer"
router
    .route("/send")
    .post((req, res) => {
        console.log("mailerRoute: ", req.body)
        const { email="", name="", subject="", text="", html="", attachments=[] } = req.body

        mailer.send({ email, name, subject, text, html, attachments })
            .then(res => {
                console.log("Message sent: ", res)
            })
            .catch(error => {
                console.log("Mailer error: ", error)
            })
    })


module.exports = router;