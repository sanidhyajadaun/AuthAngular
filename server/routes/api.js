// As a good practice we'll make a separate file for handling routing of api

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CashSettlement = require('../models/cash-settlement');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// MongoDB connection strings
const eventsDbURI = "MongoURL";
// const storeDbURI = "MongoURL";

// Connect to MongoDB for the eventsdb database
mongoose.connect(eventsDbURI);

// Get the default connection for the eventsdb database
const eventsConnection = mongoose.connection;

// Event listener for successful connection to the eventsdb database
eventsConnection.on("connected", () => {
    console.log("Connected to eventsdb MongoDB");
});

// Event listener for connection error to the eventsdb database
eventsConnection.on("error", (err) => {
    console.log("Error connecting to eventsdb MongoDB:", err);
});


// defining a get request
router.get('/',(req,res)=>{
    res.send('From API route')
})


// Set up nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@mail',
        pass: 'app generated pass 16character'
    }
});

// Schedule a cron job to run at 8 PM every day
cron.schedule('55 15 * * *', async () => {
    try {
        // Query the database to find stores with cash amounts greater than 5000
        const stores = await CashSettlement.find({ cashAmount: { $gt: 5000 } });

        // If any stores are found, send an email to the company
        if (stores.length > 0) {
            let mailOptions = {
                from: 'your@mail.com',
                to: 'destination@gmail.com',
                subject: 'Stores with Cash Amount greater than 5000',
                text: `The following stores have cash amounts greater than 5000: ${stores.map(store => store.storeName).join(', ')}`
            };

            // Send the email
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } else {
            console.log('No stores found with cash amount greater than 5000');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
});


// POST request handler for user registration
router.post('/register', async (req, res) => {
    try {
        let userData = req.body;
        let user = new User(userData);
        let registeredUser = await user.save();
        res.status(200).send(registeredUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user");
    }
});


// POST request handler for cash settlement
router.post('/cashSettlement', async (req, res) => {
    try {
        // Extract required fields from the request body
        const { storeName, cashAmount } = req.body;

        // Create a new instance of the CashSettlement model
        const cashSettlement = new CashSettlement({
            storeName: storeName,
            cashAmount: cashAmount
        });

        // Save the cash settlement data to the database
        const savedCashSettlement = await cashSettlement.save();

        // Send a success response with the saved data
        res.status(200).send(savedCashSettlement);
    } catch (error) {
        console.log(error);
        // Send an error response if there's any issue saving the data
        res.status(500).send("Error saving cash settlement data");
    }
});


// POST request handler for login
router.post('/login', async (req, res) => {
    try {
        let userData = req.body;
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            res.status(401).send('Invalid Email');
        } else if (user.password !== userData.password) {
            res.status(401).send('Invalid Password');
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/events',(req,res)=>{
    let events = [
        {
            "id": "1",
            "name": "Auto expo",
            "desciption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto expo2",
            "desciption": "lorem ipsum2",
            "date": "2012-04-23T18:25:43.511Z2"
        },
        {
            "id": "3",
            "name": "Auto expo3",
            "desciption": "lorem ipsum3",
            "date": "2012-04-23T18:25:43.511Z3"
        },
        {
            "id": "4",
            "name": "Auto expo4",
            "desciption": "lorem ipsum4",
            "date": "2012-04-23T18:25:43.511Z4"
        }
    ]
    res.json(events)
});

router.get('/special',(req,res)=>{
    let events = [
        {
            "id": "1",
            "name": "Auto expo",
            "desciption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto expo2",
            "desciption": "lorem ipsum2",
            "date": "2012-04-23T18:25:43.511Z2"
        },
        {
            "id": "3",
            "name": "Auto expo3",
            "desciption": "lorem ipsum3",
            "date": "2012-04-23T18:25:43.511Z3"
        },
        {
            "id": "4",
            "name": "Auto expo4",
            "desciption": "lorem ipsum4",
            "date": "2012-04-23T18:25:43.511Z4"
        }
    ]
    res.json(events)
});

// exporting the api routes
module.exports = router;
