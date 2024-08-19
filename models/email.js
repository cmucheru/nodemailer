const nodemailer = require('nodemailer');

// Create a transporter using Hostinger SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'info@globebridgeconsulting.com',
        pass: 'PbRRH9fj@eKWCpt'
    }
});

const sendEmail = (mailOptions) => {
    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
