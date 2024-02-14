// using the mongoose package
const mongoose = require('mongoose')

// get an instance of mongoose schema
const Schema = mongoose.Schema

// creating a new schema for the user data in mongodb
const userSchema = new Schema({
    email: String,
    password: String
})

// create a model from schema and export it
module.exports = mongoose.model('user',userSchema,'users')