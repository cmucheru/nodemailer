const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email');
const fs = require('fs');

router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;

    // Compose the email
    let mailOptions = {
        from: 'info@globebridgeconsulting.com',
        to: 'info@globebridgeconsulting.com',
        subject: 'Request to Join GlobeBridge Consulting',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        attachments: [
            {
                filename: 'cv.pdf', // Static filename for CV
                path: req.files['cv'][0].path,
                contentDisposition: 'attachment; filename="cv.pdf"' // Custom filename in email
            },
            {
                filename: 'coverLetter.pdf', // Static filename for cover letter
                path: req.files['coverLetter'][0].path,
                contentDisposition: 'attachment; filename="coverLetter.pdf"' // Custom filename in email
            }
        ]
    };

    // Send email
    try {
        await sendEmail(mailOptions);

        // Clean up temporary files
        req.files['cv'].forEach(file => fs.unlinkSync(file.path));
        req.files['coverLetter'].forEach(file => fs.unlinkSync(file.path));

        res.send('Thank you. Details sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send details.');
    }
});

module.exports = router;
