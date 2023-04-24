const express = require('express')
const nedb = require('nedb')
const bodyParser = require('body-parser')

var database = new nedb({ filename: 'database.txt', autoload: true })

var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser)
app.use(express.static('public'))
app.set("view engine", "ejs")

app.get('/', function(request, response) {
    response.render('movies.ejs')
})

app.get('/search', function(request, response) {
    
})


app.listen(6002, function() {
    console.log('server started on port 6002')
})
