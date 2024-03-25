// how do we know this is a npm project?
// what command do we run to start an npm project?

// what does the below chunk of code do?
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// what is app?
const app = express();

// what is this configuring?
const upload = multer({
  dest: "public/uploads",
});

// what do each of these statements do?
app.use(express.static("public"));
app.use(urlencodedParser);
app.set("view engine", "ejs"); // what folder is required when we use this? make that folder

// what is this?
app.get("/text", (request, response) => {
  res.send("server working");

  // what steps do we need in order to use a template ejs file?
  // make a file called index.ejs and render it here 
  // make sure to comment out the res.send() code above
});

// what does the number signify?
// how do we access this on the web?
app.listen(6001, () => {
  console.log("server started on port 6001");
});
