const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const email = require('./routes/email');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
app.use('/send', upload.fields([{ name: 'cv' }, { name: 'coverLetter' }]), email);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
