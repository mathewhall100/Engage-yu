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

const send = ({ from, name, to, subject, text, html, attachments }) => {
    const message = {
        from,
        name, 
        to,
        subject, 
        text,
        html,
        attachments,
        replyTo: from
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




        
 



