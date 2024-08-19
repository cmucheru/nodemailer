const nodemailer = require('nodemailer');

// Create a transporter using Hostinger SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'support@mycompany.com',
        pass: 'your-email-password'
    }
});

const sendEmail = (mailOptions) => {
    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
