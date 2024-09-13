const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ContactModel = require('./models/Contact')

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

mongoose.connect(URI, {
}).then(() => {
    console.log('MongoDB is Connected');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// API Creation 
app.get("/", (req, res) => {
    res.send("Express App is Running");
})

app.post('/contact', async (req, res) => {
    try {
        const contact = new ContactModel(req.body);
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ error: 'Failed to save contact' });
    }
});



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})