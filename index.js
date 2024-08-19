const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ContactModel = require('./models/Contact')

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

try {
    mongoose.connect(URI, {});
    console.log('MongoDB is Connected')
} catch (error) {
    console.log('Error', error);
}

// API Creation 
app.get("/", (req, res) => {
    res.send("Express App is Running");
})

// API for Contact 
app.post('/contact', (req, res) => {
    ContactModel.create(req.body)
        .then(contacts => res.json(contacts))
        .catch(err => res.json(err))
})



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})