// As a good practice we'll make a separate file for handling routing of api

const express = require('express');
const router = express.Router();
const User = require('../models/user')

// setting up connection with mongodb

// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// MongoDB connection string
const db = "mongodb+srv://sanidhyajadaun:Sancloud7890@cluster0.nacb8ym.mongodb.net/eventsdb?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(db);

// Get the default connection
const connection = mongoose.connection;

// Event listener for successful connection
connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Event listener for connection error
connection.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
});

// defining a get request
router.get('/',(req,res)=>{
    res.send('From API route')
})

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
})



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
})

// exporting the api routes
module.exports = router