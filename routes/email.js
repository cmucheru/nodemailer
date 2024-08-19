const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email');

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
                filename: req.files['cv'][0].originalname,
                path: req.files['cv'][0].path,
                 contentDisposition: 'attachment; filename="cv.pdf"'
            },
            {
                filename: req.files['coverLetter'][0].originalname,
                path: req.files['coverLetter'][0].path,
                contentDisposition: 'attachment; filename="coverLetter.pdf"'
            }
        ]
    };

    // Send email
    try {
        await sendEmail(mailOptions);
        res.send('Thankyou. Details sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send details.');
    }
});

module.exports = router;
