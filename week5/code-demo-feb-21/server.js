// imports the express library
const express = require("express");

// creates an instance of express app -- we only need one of these
const app = express();

// telling the application to use the public folder as source for all the data
app.use(express.static('public'))

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
let messages = []
app.get("/submit", (req, res)=>{
    console.log(req.query.username)
    res.send("thank you for submitting, " + req.query.username + "<br /><a href=\"\/guestbook.html\">back to guestbook</a>")
    messages.push({
        username: req.query.username,
        message: req.query.message
    })
})

app.get('/messages', (req, res)=>{

    let allmessages = ''
    for(let i = 0;i<messages.length;i++){
        allmessages += messages[i].username + " says " + messages[i].message + "<br />"
    }
    res.send(allmessages)
})

// sets up a server on the port (8000) and sends a message to the terminal
// app.listen the last thing you do before setting up server
app.listen(8000, () => {
  console.log("server has started!");
});
