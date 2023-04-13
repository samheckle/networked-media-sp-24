// library imports
const express = require('express')
const nedb = require('nedb')
const bodyParser = require('body-parser')

// database initialization
var database = new nedb({ filename: 'database.txt', autoload: true })
// server initialization
var app = express()
// request body initialization & allow us to process json from body
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// middleware
app.use(bodyParser.json())
app.use(urlencodedParser)
app.use(express.static('public'))
// express template
app.set("view engine", "ejs")

let allTweets = [
    { text: "tweet1"},
    { text: "tweet2"},
    { text: "tweet3"},
]

app.get('/alltweets', (req, res)=>{
    // res.send(allTweets)
    database.find({}).sort({timestamp: -1}).exec( (err, data) => {
        // console.log("data is: " + data)
        res.send(data)
    })
})

app.post('/submittweet', (req, res) =>{
    let tweet = req.body.text
    // console.log('data that is in server', data)
    // res.send(allTweets)

    let currTime = new Date()

    let data = {
        timestamp: currTime.toLocaleString(),
        text: tweet
    }

    database.insert(data, (err, newData) => {
        console.log("data added: ", newData)
        res.redirect('/alltweets')
    })

})

app.listen(6002, function() {
    console.log('server started on port 6002')
})
