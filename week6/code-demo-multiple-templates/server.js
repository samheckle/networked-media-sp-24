
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')

const encodedParser = parser.urlencoded({extended: true})
const uploadProcessor = multer({dest: "public/upload"})

const app = express()
app.use(express.static('public'))
app.use(encodedParser)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    // using the template to pass in the data array as the messages property
    res.render("index.ejs", { messages: data})
})

app.get('/form/to/fake/twitter', (req, res) => {

    // using the template to pass in the data array as the messages property
    res.render("form.ejs", )
})

// array in which we are storing information on the server
// particular to this example, this holds all of the messages are sent on the server
let data = []

// route that handles the form POST request
app.post('/upload', uploadProcessor.single("theimage"), (req, res) => {

    // console.log(req.file)

    let now = new Date()

    // message object formats the data from the form
    // req = request
    // property of text = req.body.text = gets the information from the body of the form
    // property of date = uses local variable now to get the date of the submission
    let message = {
        text: req.body.text,
        date: now.toLocaleString()
    }
    if(req.file){
        message.imgSrc = "upload/" + req.file.filename
    }

    // pushing the object (message) to the array
    data.unshift(message)

    res.redirect('/')
})

app.listen(8000, ()=> {
    console.log('server has started on port 8000')
})