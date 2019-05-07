const router = require("express").Router();
const mailer = require("../../mailer/mailer.js")
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/mailer"
router
    .route("/send")
    .post((req, res) => {
        console.log("mailerRoute: ", req.body)
        const { from="", name="", to="", subject="", text="", html="", attachments=[] } = req.body

        mailer.send({ from, name, to, subject, text, html, attachments })
            .then(result => {
                console.log("Message sent: ", result)
                res.json(result)
            })
            .catch(error => {
                console.log("Mailer error: ", error)
                res.json(error);
            })
    })


module.exports = router;