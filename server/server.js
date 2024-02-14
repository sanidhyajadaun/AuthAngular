// Using the packages in our file
const express = require('express')
const bodyParser = require('body-parser')

// defining the constant port of our server
const PORT = 3000

// importing api routes from routes folder
const api = require('./routes/api')

// Creating instance of express
const app = express()

// specifying the body parser to handle json data
app.use(bodyParser.json())

// instructing server to use api
app.use('/api',api)

// To test get request
app.get('/',function(req,res){
    res.send('Hello from server')
})

// To listen or meet request on port
app.listen(PORT,function(){
    console.log('Server is running on localhost:'+PORT)
})

