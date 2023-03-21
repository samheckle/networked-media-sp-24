
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

// a new route to take the form outside of the main page
app.get('/form/to/fake/twitter', (req, res) => {

    // this is to render the new file "form.ejs" which is a page that only holds the form
    res.render("form.ejs", )
})

// array in which we are storing information on the server
// particular to this example, this holds all of the messages are sent on the server
let data = []

// global variable to hold post numbers
let postId = 0;

// route that handles the form POST request
app.post('/upload', uploadProcessor.single("theimage"), (req, res) => {

    // console.log(req.file)

    let now = new Date()

    // message object formats the data from the form
    // req = request
    // property of text = req.body.text = gets the information from the body of the form
    // property of date = uses local variable now to get the date of the submission
    let message = {
        // added new property to maintain post number
        id: postId,
        text: req.body.text,
        date: now.toLocaleString()
    }

    // incrementing post number every time new post is created
    postId++;
    if(req.file){
        message.imgSrc = "upload/" + req.file.filename
    }

    // pushing the object (message) to the array
    data.unshift(message)

    res.redirect('/')
})

// adding new route to handle deleting posts
app.get('/delete', (req, res) => {

    // splice function takes in 2 parameters:
    // the index at which the item should be removed
    // how many items you want to remove (we only want to remove one post at a time so we leave this at 1)
    // data.splice(req.query.postId, 1)
    data.forEach( (message) => {
        if(message.id == req.query.postId){
            data.splice(data.indexOf(message), 1)
        }
    })

    // making sure the page refreshes after post is deleted
    res.redirect('/')
})

app.listen(8000, ()=> {
    console.log('server has started on port 8000')
})