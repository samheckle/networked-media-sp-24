// imports the express library
const express = require("express");

// creates an instance of express app -- we only need one of these
const app = express();

// telling the application to use the public folder as source for all the data
app.use(express.static('public'))

// setting the templating engine so express / the server knows what to use
app.set("view engine", "ejs")

// ROUTES
// location specific to whichever data we are directing

// this particular route is "/" and it will respond with some text
app.get('/', (request, response)=>{
    response.send("test server is working!")
})

// app.get('/', function(request, response){ })

// new route "/random"
app.get("/random", (request, response)=>{

    // variable that will change based on random number output
    let filename = ""

    // generating a random number
    let rand = Math.random()
    if(rand < .33){
        filename = "1.jpg"
    } else if (rand < .66){
        filename = "3.jpg"
    } else{
        filename = "4.jpg"
    }

    // sending the file to the client 
    response.sendFile(filename, {root:"public"})
})

// global array that exists outside of any methods or routes
let messages = []

app.get("/submit", (req, res)=>{
    console.log(req.query.username)
    res.send("thank you for submitting, " + req.query.username + "<br /><a href=\"\/guestbook.html\">back to guestbook</a>")
    
    // appending an entire object to the messages array
    // let person = {
    //     firstName: "John",
    //     lastName: "Jay"
    // }
    messages.push({
        username: req.query.username,
        message: req.query.message
    })
})

app.get('/allmessages', (req, res) => {
    let displayedText = ''
    for(let i = 0; i < messages.length; i++){
        displayedText += '<h1>' + messages[i].username + '</h1>' + 'says ' + messages[i].message + '<br />'
    }
    res.send(displayedText)
})

app.get('/template', (req, res) => {
    const data = {
        messages: [
            { visible: true, text: "first"},
            { visible: true, text: "second"},
            { visible: false, text: "third"},
            { visible: true, text: "fourth"},
        ]
    }
    res.render("template.ejs", data)
})

// sets up a server on the port (8000) and sends a message to the terminal
// app.listen the last thing you do before setting up server
app.listen(8000, () => {
  console.log("server has started!");
});
