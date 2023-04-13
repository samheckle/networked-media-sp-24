// libary imports
const express = require('express')
const nedb = require('nedb')
const bodyParser = require('body-parser')

// database initialization
var database = new nedb({ filename: 'database.txt', autoload: true })
// server initialization
var app = express()
// request body initialization
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// middleware
app.use(urlencodedParser)
app.use(express.static('public'))
// express template
app.set("view engine", "ejs")


app.listen(6002, function() {
    console.log('server started on port 6002')
})
