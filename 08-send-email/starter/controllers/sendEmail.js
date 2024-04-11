const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'curt96@ethereal.email',
            pass: 'ApyJeJ4HUmg2JZzuxp'
        }
    });

    let info = await transporter.sendMail({
        from: 'Rahul Kumar <rahul@gmail.com>',
        to: 'rk617605@gmail.com',
        subject: 'Hello',
        html: '<h2>Sending email with nodejs</h2>'
    })

    res.json(info);
}

const sendEmail = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'rk617605@gmail.com', // Change to your recipient
        from: 'rahulkumarmay872@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    const info = await sgMail.send(msg);
    res.json(info)
}

module.exports = sendEmail;