require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
})

const send = ({ email, name, subject, text, html, attachments }) => {
    const message = {
        from: email, 
        to: "mathew.hall100@gmail.com", // to be replaced by the 'to' prop 
        subject, 
        text,
        html,
        attachments,
        replyTo: email
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (error, info) => 
            error ? reject(error) : resolve(info)
        )
    })
        
}

module.exports = {
    send : send
}




        
 



