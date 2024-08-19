const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Import cors
const email = require('./routes/email');

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
    origin: 'https://globebridgeconsulting.com', // Replace with the domain you want to allow
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Serve static files
app.use(express.static('public'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.use('/send', upload.fields([{ name: 'cv' }, { name: 'coverLetter' }]), email);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
