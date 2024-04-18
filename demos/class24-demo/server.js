/// npm install express @seald-io/nedb body-parser

// library import statements
const express = require("express");
const nedb = require("@seald-io/nedb");
const bodyParser = require("body-parser");

// initialization variables
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const database = new nedb({
  filename: "database.txt",
  autoload: true,
});

// initialization of our app
//////////////////////////////////
app.use(bodyParser.json());
//////////////////////////////////
app.use(urlencodedParser);
app.use(express.static("public"));

// add route to handle when a tweet is added
app.post("/postTweet", (req, res) => {
  let post = req.body.text;

//   console.log(`data received ${post}`);

  let data = {
    timestamp: new Date().toLocaleString(),
    text: post,
  };

  database.insert(data, (err, newData) => {
    res.redirect("/allposts");
  });
});

app.get("/allposts", (req, res) => {
  database
    .find({})
    .sort({ timestamp: -1 })
    .exec((err, data) => {
        res.send(data)
    });
});

// run our app
const port = 5008;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
