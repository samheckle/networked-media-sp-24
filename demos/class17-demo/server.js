// how do we know this is a npm project?
// A: node_module folder or package.json
// if node_modules is missing, we need to run npm install

// what command do we run to start an npm project?
// npm init

// what does the below chunk of code do?
// A: library imports and settings
const express = require("express"); // imports the express library
const multer = require("multer"); // multer library
const bodyParser = require("body-parser"); // body parser library

// database library import
const nedb = require("@seald-io/nedb")
// initialize database
let database = new nedb({
  filename: "database.txt", 
  autoload: true
})

// setting for the bodyParser library to correctly encode data
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// what is app?
// A: initialize express library as a variable to use
const app = express();

// what is this configuring?
// A: multer configuration to set the destination where images are stored when they are uploaded from the client site
const upload = multer({
  dest: "public/uploads",
});

// what do each of these statements do?
app.use(express.static("public")); // public folder as setting for assets
app.use(urlEncodedParser); // initialize body parser with app, allows us to use POST requests and send data to server

// initialize template engine
// use "views" folder
app.set("view engine", "ejs"); // what folder is required when we use this? make that folder

// what is this?
// GET request for the route of /text
// route is the location in the url after our ip address
app.get("/text", (request, response) => {
  // response.send("server working");

  // what steps do we need in order to use a template ejs file?
  // make a file called index.ejs and render it here
  response.render("index.ejs", {});
  // make sure to comment out the res.send() code above
});

// handle the /search route from the form
app.get("/search", (req, res) => {});

app.post("/upload", upload.single("theimage"), (req, res) => {
  console.log(req.body)

  let currDate = new Date()

  let data = {
    text: req.body.text,
    date: currDate.toLocaleString()
  }

  database.insert(data, (err, newData)=>{
    console.log(newData)
    res.redirect('/text')
  })
});

// what does the number signify?
// A: port! where we want to access on the ip address
// how do we access this on the web?
// include port in url: 127.0.0.1:6001
app.listen(6001, () => {
  console.log("server started on port 6001");
});
