const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email');

router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;
    const files = req.files;

    // Compose the email
    let mailOptions = {
        from: 'info@example.com',
        to: 'info@example.com',
        subject: 'Request to join Example inc',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        attachments: []
    };

    // Add attachments if available
    if (files['cv']) {
        mailOptions.attachments.push({
            filename: 'cv.pdf',
            content: files['cv'][0].buffer,
            contentType: 'application/pdf'
        });
    }

    if (files['coverLetter']) {
        mailOptions.attachments.push({
            filename: 'coverLetter.pdf',
            content: files['coverLetter'][0].buffer,
            contentType: 'application/pdf'
        });
    }

    // Send email
    try {
        await sendEmail(mailOptions);
        res.send('Thank you. Details sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send details.');
    }
});

module.exports = router;
