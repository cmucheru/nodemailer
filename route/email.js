const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email');

router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;

    // Compose the email
    let mailOptions = {
        from: 'support@mycompany.com',
        to: 'mail@mycompany.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        attachments: [
            {
                filename: req.files['cv'][0].originalname,
                path: req.files['cv'][0].path
            },
            {
                filename: req.files['coverLetter'][0].originalname,
                path: req.files['coverLetter'][0].path
            }
        ]
    };

    // Send email
    try {
        await sendEmail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email.');
    }
});

module.exports = router;
