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
const nedb = require("@seald-io/nedb");
// initialize database
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

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
app.get("/", (request, response) => {
  // search that we are using to retrieve data from db
  // if we want everything in the database, we set query to be an empty obj
  let query = {};

  // sorting query to make the posts show up in reverse chronological order
  // -1 will be reverse (most recent on top)
  // 1 will be in order (oldest on top)
  let sortQuery = {
    timestamp: -1,
  };

  // database.find(query, (err, data)=>{
  //   // inside of the callback
  //   // rendering the index page with the data from the database
  //   response.render("index.ejs", {posts: data});
  // })

  // find(query) = get all the info from database
  // sort(sortQuery) = sort the info that was returned from database 
  // exec = callback function to render the info from the database
  database
    .find(query)
    .sort(sortQuery)
    .exec((err, data) => {
      // inside of the callback
      // rendering the index page with the data from the database
      response.render("index.ejs", { posts: data });
    });
});

// handle the /search route from the form
app.get("/search", (req, res) => {});

app.post("/upload", upload.single("theimage"), (req, res) => {
  console.log(req.body);

  let currDate = new Date();

  let data = {
    text: req.body.text,
    date: currDate.toLocaleString(),
    timestamp: currDate.getTime(),
  };

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

// what does the number signify?
// A: port! where we want to access on the ip address
// how do we access this on the web?
// include port in url: 127.0.0.1:6001
app.listen(6001, () => {
  console.log("server started on port 6001");
});
