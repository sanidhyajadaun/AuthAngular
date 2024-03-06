// As a good practice we'll make a separate file for handling routing of api

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const CashSettlement = require('../models/cash-settlement');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const axios = require('axios');


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

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized Request')
    }
    req.userId = payload.subject
    next()
}

// Set up nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@mail',
        pass: 'app generated pass 16character'
    }
});

// Schedule a cron job to run at 5 PM every day for automatic logout
cron.schedule('0 17 * * *', async () => {
    try {
        // Send a POST request to initiate the automatic logout process
        await axios.post('http://localhost:3000/api/logout');
        console.log('Automatic logout successful');
    } catch (error) {
        console.error('Error during automatic logout:', error);
    }
});

// Schedule a cron job to run at 8 PM every day
cron.schedule('0 20 * * *', async () => {
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
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }

        let userData = req.body;
        let user = new User(userData);
        let registeredUser = await user.save();
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token});
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


// POST request handler for manual logout
router.post('/logout', (req, res) => {
    console.log('Manual logout requested');
    // Clear token and respond with success
    res.status(200).send({ message: 'Logout successful' });
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
            let payload = {subject : user._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token});
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
            "name": "Auto expo1",
            "desciption": "lorem ipsum",
            "date": "2012-04-24T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto expo2",
            "desciption": "lorem ipsum2",
            "date": "2012-06-24T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto expo3",
            "desciption": "lorem ipsum3",
            "date": "2012-08-24T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto expo4",
            "desciption": "lorem ipsum4",
            "date": "2012-10-24T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto expo5",
            "desciption": "lorem ipsum5",
            "date": "2012-18-23T20:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto expo6",
            "desciption": "lorem ipsum6",
            "date": "2012-20-23T20:25:43.511Z"
        }
    ]
    res.json(events)
});

router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {
            "id": "1",
            "name": "Auto expo1",
            "desciption": "lorem ipsum",
            "date": "2012-10-24T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto expo2",
            "desciption": "lorem ipsum2",
            "date": "2012-12-24T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto expo3",
            "desciption": "lorem ipsum3",
            "date": "2012-14-24T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto expo4",
            "desciption": "lorem ipsum4",
            "date": "2012-16-23T20:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto expo5",
            "desciption": "lorem ipsum5",
            "date": "2012-18-23T20:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto expo6",
            "desciption": "lorem ipsum6",
            "date": "2012-20-23T20:25:43.511Z"
        }
    ]
    res.json(events)
});

// exporting the api routes
module.exports = router;
