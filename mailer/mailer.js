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

const send = ({ email, name, text }) => {
    const message = {
        from: email, 
        to: "mathew.hall100@gmail.com",
        subject: "new email from engage-yu", 
        text,
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




        
 



